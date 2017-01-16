angular.module('cf')

.controller('CFController', function ($rootScope, $scope, $mdMedia, $location) {
	var ctrl = this;
	$rootScope.$mdMedia = $mdMedia;

	ctrl.navigate = function (page) {
		$rootScope.pageName = page;
		$location.url(page);
	}
})

.controller('MedicinesController', function (Enzymes, $mdBottomSheet) {
	var ctrl = this;
	ctrl.meals = [];

	Enzymes.onReady(function () {
		ctrl.meals = Enzymes.getAllMeals();
	});

	ctrl.editEnzyme = function (enzyme) {
		$mdBottomSheet.show({
			templateUrl: './html/enzymeForm.html',
			controller: 'EnzymeFormController as ctrl',
			locals: {
				enzyme: enzyme
			},
			clickOutsideToClose: true
		});
	}
})

.controller('EnzymeFormController', function (Enzymes, enzyme) {
	var ctrl = this;
	ctrl.enzyme = enzyme;

	ctrl.save = function () {
		Enzymes.onReady(function () {
			Enzymes.saveMeal(enzyme);
		});
	}
})

.controller('NutritionsController', function (Meals, $mdDialog) {
	var ctrl = this;
	ctrl.meals = [];

	Meals.onReady(function () {
		ctrl.meals = Meals.getAllMeals();
	});

	ctrl.addMeal = function (ev) {
		$mdDialog.show({
			controller: 'NutritionsFormController as ctrl',
			templateUrl: './html/nutritionForm.html',
			targetEvent: ev,
			clickOutsideToClose: true
		});
	}
})

.controller('NutritionsFormController', function (Meals, $mdDialog) {
	var ctrl = this;
	ctrl.meal = [];

	ctrl.save = function () {
		Meals.onReady(function () {
			Meals.saveMeal(ctrl.meal);
		});
		$mdDialog.hide()
	}

	ctrl.cancel = function () {
		$mdDialog.cancel()
	}
})