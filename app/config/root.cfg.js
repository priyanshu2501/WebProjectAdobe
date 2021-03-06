/**

Main Configuration File for Routing and handling cookies 

**/

(function() {
	// angular.module("main_module",["ngRoute", "ngCookies"]);
	angular.module("main_module").config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when("/",{
			templateUrl: 'app/page/restaurants.html',
			controller:function($scope,$rootScope) {
				// console.log("jkbfjkbn");
				$rootScope.greet = "Deliver To:  ";
				$rootScope.opr = " , ";
			}
		})
		.when("/customer", {
			templateUrl:'app/page/login.html',
			controller:function($scope,$rootScope) {
				// console.log("jkbfjkbn");

				$rootScope.greet = "Hi  ";
				$rootScope.opr = " @ ";
			}
		})
		.when("/menu/:resId", {
			templateUrl:'app/page/restaurant.html',
			controller:function($scope,$rootScope,$routeParams) {
				// console.log("jkbfjkbn");
				$scope.restaurantId = $routeParams.resId;
				$rootScope.greet = "Deliver To:  ";
				$rootScope.opr = " , ";
			}
		})
		.when("/checkout",{
			templateUrl:'app/page/checkout.html',
			controller:function($scope,$rootScope) {
				// console.log("jkbfjkbn");

				$rootScope.greet = "Deliver To:  ";
				$rootScope.opr = " , ";
			}
		})
		.otherwise({
			templateUrl:'app/page/restaurants.html',
			controller:function($scope,$rootScope) {
				// console.log("jkbfjkbn");

				$rootScope.greet = "Deliver To:  ";
				$rootScope.opr = " , ";
			}
		})
	}).run(check); // runs everytime when the url is changed
	function check($cookieStore,$rootScope,$location){
		//called once when the router is registered
		
		$rootScope.$on("$locationChangeStart", 	function() {
			console.log("HereHere");
			if(localStorage.getItem("user")) {
				//Do Nothing
			}
			else {	
				$location.path("/customer");
			}
		});

	}
})();