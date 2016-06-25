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
			$rootScope.optionValues = {'Chinese':false, 'Indian':false, 'Thai':false, 'Vegetarian':false}
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
			
		});


	ng.controller("SecondBarController",function($scope, $rootScope,RootService){

		$scope.join = function(str1, str2, opr) {
			// console.log("controller Function called");	
			return RootService.join(str1, str2, opr);
		};

		$scope.submitDetails = function(name, address) {
			localStorage.removeItem('user');
			localStorage.setItem('user', JSON.stringify({'name':name, 'address':address}));
			$rootScope.user = RootService.getDetails();
		};

	});

	ng.controller("RestaurantListController", function($scope, $rootScope,RootService) {
		$scope.filteredRestaurants = $scope.restaurants = [];
		RootService.getRestaurants().then(function(result){
			$scope.filteredRestaurants = $scope.restaurants = result.data;
		},function(){console.log("Error in getting Restaurant List");});
		$scope.range = function(n) {
      		return new Array(n);
    	};
    	$scope.filterRestaurants = function(option) {
    		$anySelected = false;
    		$rootScope.options.forEach(function(option) {
    			if($rootScope.optionValues[option])
    				$anySelected = true;
    		});
    		console.log('anySelected'+$anySelected);
    		console.log($scope.restaurants);
    		if(!$anySelected) {
    			$scope.filteredRestaurants = $scope.restaurants;
    		}
    		else {
    			$result = [];
    			$scope.restaurants.forEach(function(restaurant){
    				$selectable = false;
    				$rootScope.options.forEach(function(option) {
    					if($rootScope.optionValues[option] && restaurant.cuisine.toUpperCase() == option.toUpperCase()) {
    						$selectable = true;
    					}
    				});
    				if($selectable)
    					$result.push(restaurant);
    			});
    			$scope.filteredRestaurants = $result;
    		}
    	};
	});
	
	ng.controller("RestaurantController",function($scope,RootService) {
		$scope.price = 0;
		RootService.getRestaurant($scope.restaurantId).then(function(result){
				$scope.restaurant = result.data;
				$scope.menuChosen = {};
			});
		$scope.addItem = function(item) {
			if($scope.menuChosen[item.name])
				$scope.menuChosen[item.name] = $scope.menuChosen[item.name] + 1;
			else
				$scope.menuChosen[item.name] = 1;
			$scope.price = $scope.price + item.price;
			$scope.price = Math.round($scope.price*100)/100;
		}
		$scope.deleteItem = function(item) {
			$scope.menuChosen[item.name] = $scope.menuChosen[item.name] - 1;
			$scope.price = $scope.price - item.price;
			$scope.price = Math.round($scope.price*100)/100;
		}
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