angular.module('homeApp')
	.factory('HomeFactories', function($http, $q){

		var factory = {};
		factory.getUserDetails = function(){

			return $http.get('/getUserDetails').then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});
		};
		factory.logout = function(){

			return $http.get('/logout').then(function(response){

				if(typeof response.data === 'object'){

					return response.data;
				}
				else{

					 return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			})
		};		
		return factory;
	});