/**
	*	@author:priy2501@gmail.com
	*	@version:1.0
	*	Service code to interact with REST endpoints
**/

(function(){
	angular.module("service_module",[]);
	angular.module("service_module").service("RootService", function($http, $q) {
		this.join = function(str1, str2, opr){
			// console.log("Service Function called");	
			return str1+opr+str2;
		};

	});
})();
