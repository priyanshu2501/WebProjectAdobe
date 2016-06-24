/**

Main Configuration File for Routing and handling cookies 

**/

(function() {
	angular.module("main_module",["ngRoute", "ngCookies","customer_module","service_module","custom_directive"]);
	angular.module("main_module").config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when("/",{
			templateUrl: 'app/page/restaurants.html'
		})
		.when("/customer", {
			templateUrl:'app/page/login.html'
		})
		.when("/menu/:resName", {
			templateUrl:'app/page/restaurant.html',
		})
		.when("/checkout",{
			templateUrl:'app/page/checkout.html',
		})
		.otherwise({
			templateUrl:'app/page/restaurants.html'
		})
	}).run(check); // runs everytime when the url is changed
	function check($cookieStore,$rootScope,$location){
		//called once when the router is registered
		$rootScope.$on("$locationChangeStart", function() {
			if($localStorage.getItem("user")) {
				$location.path("/");
			}
			else {	
				$location.path("/customer");
			}
		});

	}
})();