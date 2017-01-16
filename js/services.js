angular.module('cf')

.service('Enzymes', function ($filter, $http) {
	var enzymes = undefined;
	var queued = [];

	$http.get('./data/enzymes.json').then(function (data) {
		if (angular.isDefined(data)) {
			enzymes = data.data;
			callQueue();
		}
	})

	var callQueue = function () {
		angular.forEach(queued, function (fn) {
			fn();
		})
	}

	return {
		onReady: function (callback) {
			if (typeof enzymes === "undefined") {
				queued.push(callback);
			} else {
				callback();
			}
		},

		getMealEnzymes: function (meal) {
			return $filter('filter')(enzymes, {meal: meal}, true)[0];
		},

		getAllMeals: function () {
			return enzymes;
		},

		saveMeal: function (enzyme) {
			enzymes[enzymes.indexOf(this.getMealEnzymes(enzyme.meal))] = enzyme;
		}
	}
})

.service('Meals', function ($http) {
	var meals = undefined;
	var queued = [];

	$http.get('./data/meals.json').then(function (data) {
		if (angular.isDefined(data)) {
			meals = data.data;
			callQueue();
		}
	})

	var callQueue = function () {
		angular.forEach(queued, function (fn) {
			fn();
		})
	}

	return {
		onReady: function (callback) {
			if (typeof meals === "undefined") {
				queued.push(callback);
			} else {
				callback();
			}
		},

		getAllMeals: function () {
			return meals;
		},

		getMeal: function (type) {
			return meals[type] ? meals[type] : false;
		},

		getBreakfast: function () {
			return this.getMeal('Breakfast');
		},

		getLunch: function () {
			return this.getMeal('Lunch');
		},

		getDinner: function () {
			return this.getMeal('Dinner');
		},

		saveMeal: function (meal) {
			mealType = this.getMeal(meal.type);
			mealType.push(meal.name);
		}
	}
})