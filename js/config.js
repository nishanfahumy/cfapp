angular.module('cf').config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: './html/home.html'
		})
		.when('/news', {
			templateUrl: './html/news.html'
		})
		.when('/treatment', {
			templateUrl: './html/treatment.html'
		})
		.when('/medication', {
			templateUrl: './html/medication.html',
			controller: 'MedicinesController as ctrl'
		})
		.when('/nutrition', {
			templateUrl: './html/nutrition.html',
			controller: 'NutritionsController as ctrl'
		})
		.otherwise('/');
})