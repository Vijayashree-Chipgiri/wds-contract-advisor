'use strict';

var myApp = angular.module('myApp', [ 'ui.router','ngDialog' ]).config(
		function($stateProvider, $urlRouterProvider) {
			
			//Routing to default URL
			$urlRouterProvider.otherwise('login');

			$stateProvider.state('app', {
				url : '/home',
				templateUrl : './htmls/home.component.html',
				controller : 'RegressionController'
			}).state('login', {
				url : '/login',
				templateUrl : './htmls/login.component.html',
				controller : 'LoginController'
			});
		}).run(function() {

});

myApp.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
