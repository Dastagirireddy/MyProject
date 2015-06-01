angular.module('homeApp')
	.controller('LogoutController', function($scope, $location, $window, HomeFactories){

		console.log("I am in logout controller");
		$scope.logout = function(){

			HomeFactories.logout().then(function(data){

				if(data.status == 200){

					$window.localStorage.removeItem('token');
					$window.localStorage.removeItem('username');
					$location.path('index');
				}
				else{

					console.log("Logout request got error");
				}
			}, function(error){

				console.log("Error occured");
			});
		};
	})
	.controller('UserDetailsContrller', function($scope, $location, HomeFactories){

		console.log(" I am in user details contrller");
		function getUserDetails(){

			HomeFactories.getUserDetails().then(function(data){

				console.log(data);
				if(data.status == 200){

					$scope.username = data.username;
				}
				else{

					
				}
			}, function(error){

				console.log("Error occured");
			});
		}

		var socket = io.connect("http://localhost:3000");
		socket.on('onmessage', function(data){
			console.log(data);
		})
		socket.emit('message', "User is connected");
		getUserDetails();
	});