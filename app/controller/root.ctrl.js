/*
	Created by: Priyanshu Srivastava (psrivast@adobe.com)
		Created on: 23 June, 2016
*/

(function() {
	var ng = angular.module("main_module",["service_module"]);

	ng.controller("RootController", function($scope) {
		$scope.first=  $scope.second = $scope.brand = "";
		$scope.userLt = localStorage.getItem('user');
		$scope.detailsInLS = ($scope.userLt == null)?false:true;
		// console.log($scope.userLt);
	});
	
	ng.controller("SecondBarController",function($scope, RootService){

		$scope.join = function(str1, str2, opr) {
			// console.log("controller Function called");	
			return RootService.join(str1, str2, opr);
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