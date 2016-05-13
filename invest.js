var App = App || {
	init: function() {
		console.log('initializing');
		this.addListeners();
		this.calcChecking();
		this.monthsToRetirement();
		this.monthlySavingToRetire();
		this.getTotalValue();
		this.getRetirementGoal();
		this.valueToAchieveRetirement();		
	},
	addListeners: function() {
		// valueform
		var self = this;
		var $valueForm = $('.input__form--value');
		$valueForm.on('submit', function(e) {
			e.preventDefault();
			
		});

		// mtr
		var $mtr = $('.input__form--mtr');
		
		$mtr.on('submit', function(e) {
			e.preventDefault();
			var $pra = parseInt($(this).find('#pra').val());
			var $currAge = parseInt($(this).find('#currAge').val());
			var totalValue = parseInt($(this).find('.input__field').val());
			var rent = parseInt($(this).find('#rent').val());
			var	expenses = parseInt($(this).find('#expenses').val());
			// function calls

			self.monthsToRetirement($pra, $currAge);
			self.getTotalValue(totalValue);
			self.calcChecking(rent, expenses);
		});

		
		
	},
	calcChecking: function(rent, expenses) {
		var suggestedCheckingAmt;

		suggestedCheckingAmt = (1.5 * rent) + (1.5 * expenses);
		this.getRetirementGoal(expenses);
		return suggestedCheckingAmt;

	},
	monthlySavingToRetire: function(months) {
		// logic here
		// need mtr 
	}, 
	monthsToRetirement: function(pra, currAge) {
		// pra = projected retirement age 
		// take pra and currAge. difference is years to retirement
		// multiply ytr by 12 
		var ytr,
				mtr;
		ytr = pra - currAge;
		mtr = ytr * 12; 
		console.log('months to retirement is: ' + mtr);
		this.monthlySavingToRetire(mtr);

		return mtr;
	}, 
	getTotalValue: function(value) {
		this.totalValue = value;
		console.log('Total Value is: ' + this.totalValue);
		return this.totalValue;
	},
	getRetirementGoal: function(expenses) {
		// top down approach is 25 times annual expenses 
		var annualExpenses = expenses * 12;
		this.retirementGoal = annualExpenses * 25;
		console.log("Retirement Goal is approx: " + this.retirementGoal);

		return this.retirementGoal;

	}, 
	valueToAchieveRetirement: function(goal) {
		// this.vtar = goal - totalValue;
		this.vtar = this.getTotalValue() - this.getRetirementGoal();
	},
	monthlyAmountToRetire: function() {
		// this function divides your vtar divided by your months to retirement
		var amtToRetire = this.vtar / this.monthsToRetirement();
	}

};
$(App.init.bind(App));

