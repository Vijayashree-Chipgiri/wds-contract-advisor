myApp.controller('LoginController', function($rootScope, $scope, $q, $http, $state) {
	$rootScope.$broadcast("show_loader", false);
	$scope.isError = false;
	
    /**
     * Function for validaing user
     */
    $scope.loginUser = function() {
    	
    	
    	if($scope.username && $scope.password ) {
    		
    		sessionStorage['loggedInUser'] = $scope.username;
    		$scope.isError = false;
            localStorage.setItem("userName",$scope.username);
        	
        	//window.location.href =  window.location.protocol + "//" + window.location.host + "/afpva-client/home.html";
        	
        	window.location.href =  window.location.protocol + "//" + window.location.host + "/home.html";    	
    	}else{
    		
    		$scope.isError = true;

    	}
		
    	$rootScope.$broadcast("show_loader", false);

    	
 /*       var header = {
            headers: {
                'Content-Type': 'application/json',
                'charset': 'UTF-8'
            }
        };
        // REST Call
        $http.post('./rest/login', JSON.stringify({
                "username": $scope.username,
                "password": $scope.password
            }), header)
            .success(function(data) {
            	if (data.validLogin == "true") {
            		sessionStorage['loggedInUser'] = $scope.username;
            		$scope.isError = false;
            		$state.go('app');
            	} else if (data.validLogin == "false") {
            		$scope.isError = true;
            	}
            	$rootScope.$broadcast("show_loader", false);
            }).error(function(error) {
                $rootScope.$broadcast("show_loader", false);
            });*/
    };
    
    angular.element(document).ready(function() {
    		  function setHeight() {
    		    windowHeight = $(window).height();
    		    $('.mainLogin').css({ 'height': 'calc(' + windowHeight + 'px - 265px)' });
    		  };
    		  setHeight();
    		  
    		  $(window).resize(function() {
    		    setHeight();
    		  });
    });
});