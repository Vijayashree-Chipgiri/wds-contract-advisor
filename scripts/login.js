/**
 * 
 */

(function() {
  var app = angular.module('myApp', ['ui.router']);
  
  app.run(function($rootScope, $location, $state, LoginService) {
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
          console.log('Changed state to: ' + toState);
      });
    
      if(!LoginService.isAuthenticated()) {
        $state.transitionTo('login');
      }
  });
  
  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : 'login.html',
        controller : 'LoginController'
      })
      .state('home', {
        url : '/home',
        templateUrl : 'home.html',
        controller : 'HomeController'
      })
     .state('botuihome', {
        url : '/botuihome',
        templateUrl : 'index.html',
        controller : 'BotUIController'
      });
  }]);

  app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "Login";
    
    $scope.formSubmit = function() {
    	
        localStorage.setItem("userName",$scope.username);
    	
    	//window.location.href =  window.location.protocol + "//" + window.location.host + "/afpva-client/home.html";
    	
    	window.location.href =  window.location.protocol + "//" + window.location.host + "/home.html";

      /*if(LoginService.login($scope.username, $scope.password)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('botuihome');
      } else {
        $scope.error = "Incorrect username/password !";
      }*/   
    };
    
  });
  
  app.controller('BotUIController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "Login";
    
  });
  
  app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
	    $rootScope.title = "Login";
	    
	  });
  
  
  app.factory('LoginService', function() {
    var admin = 'admin';
    var pass = 'pass';
    var isAuthenticated = false;
    
    return {
      login : function(username, password) {
        isAuthenticated = username === admin && password === pass;
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
      }
    };
    
  });
  
})(); 