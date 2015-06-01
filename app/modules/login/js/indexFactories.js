angular.module('indexApp')
	.factory('AccountFactory', function($http, $q){

		var factory = {};
		factory.login = function(user){

			return $http.post('/login', user).then(function(response){

				if(typeof response.data === 'object'){

					console.log("Getting the data successfully");
					return response.data;
				}
				else{

					console.log("Getting the data failure");
					return $q.reject(response.data);
				}

			}, function(response){

				console.log("Some went wrong while sending request to the server");
				return $q.reject(response.data);
			});
		};
		factory.register = function(user){

			return $http.post('/register', user).then(function(response){

				if(typeof response.data === 'object'){

					console.log("Getting data successfully");
					return response.data;
				}
				else{

					console.log("Getting data failure");
					return $q.reject(response.data);
				}
			}, function(response){

				return $q.reject(response.data);
			});			
		};
		factory.recovery = function(user){

			return $http.post('/recovery', user).then(function(response){

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
		return factory;
	});