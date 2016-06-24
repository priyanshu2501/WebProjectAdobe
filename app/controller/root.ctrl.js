/*
	Created by: Priyanshu Srivastava (psrivast@adobe.com)
		Created on: 23 June, 2016
*/

(function() {
	var ng = angular.module("main_module",[]);
	ng.controller("RootController", function($scope) {
		$scope.first=  $scope.second = $scope.brand = "";
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
	ng.directive("secondBar", function(){
		x={};
		x.restrict='EA';
		x.templateUrl='app/template/secondbar.html';
		x.scope = {
			brand:"="
		};
		return x;
	});
})();