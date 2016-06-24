/*
	Created by: Priyanshu Srivastava (psrivast@adobe.com)
		Created on: 23 June, 2016
*/

(function() {
	var ng = angular.module("main_module",["service_module", "ngRoute", "ngCookies"]);

	ng.controller("RootController", function($scope, $rootScope, $window, RootService) {
			$rootScope.user = {
				'name':'Customer', 'address':'Home'
			};
			$rootScope.options = [
				'Chinese', 'Indian', 'Thai', 'Vegetarian'
			];
			$scope.first=  $scope.second = $scope.brand = "";
			$scope.userLt = localStorage.getItem('user');
			$rootScope.detailsInLS = ($scope.userLt == null)?false:true;
			$window.onload = function() {	
				if(!$rootScope.detailsInLS) {
					$("#changeDetailsBtn").click();
				}
			};
			if($rootScope.detailsInLS) {
					$rootScope.user = RootService.getDetails();
			}
			
			console.log($rootScope.detailsInLS);
		});


	ng.controller("SecondBarController",function($scope, $rootScope,RootService){

		$scope.join = function(str1, str2, opr) {
			// console.log("controller Function called");	
			return RootService.join(str1, str2, opr);
		};

		$scope.submitDetails = function(name, address) {
			console.log("ajbf");
			localStorage.removeItem('user');
			localStorage.setItem('user', JSON.stringify({'name':name, 'address':address}));
			$rootScope.user = RootService.getDetails();
		};

	});
	


	
	
	ng.directive("topBar", function(){
		x={};
		x.restrict='EA';
		x.templateUrl='app/template/topbar.html';

		x.scope = {
			first:"=",
			second:"=",
			brand:"="
		};
		return x;
	});
	
	ng.directive("secondBar", function(RootService){
		x={};
		x.restrict='EA';
		x.templateUrl='app/template/secondbar.html';
		x.scope = {
			brand:"="
		};
		return x;
	});
	
})();