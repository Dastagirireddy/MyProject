angular.module('indexApp')
	.controller('ModalController', function($scope, $window) {
			
		console.log("I am in Modal copntroller");
		$scope.isModalOpen = false;
		$scope.isLoginOpen = false;
		$scope.isSignupOpen = false;
		$scope.isAccount = false;
		$scope.isAccountRecovery = false;
		$scope.modalToggle = function() {

			$scope.isModalOpen = true;
			$scope.isLoginOpen = true;
			$scope.isAccount = true;
		};

		$scope.closeModal = function(){

			$window.location.href = '/';
		};
		$scope.isLoginActive = function(){

			return $scope.isLoginOpen;
		};
		$scope.isSignupActive = function(){

			return $scope.isSignupOpen;
		};
		$scope.openLoginModal = function(){

			$scope.isLoginOpen = true;
			$scope.isSignupOpen = false;
		};

		$scope.openSignupModal = function(){

			$scope.isLoginOpen = false;
			$scope.isSignupOpen = true;
		};
		$scope.openAccountModal = function(){

			$scope.isAccount = true;
			$scope.isAccountRecovery = false;
		};
		$scope.openAccountRecovery = function(){

			$scope.isAccount = false;
			$scope.isAccountRecovery = true;
		};
		// var socket = io.connect("http://localhost:3000");
		// socket.on('onmessage', function(data){
		// 	console.log(data);
		// });
		// socket.emit('message', 'dastagirireddy');
	})
	.controller('LoginController', function($scope, AccountFactory, $window, $rootScope){

		$scope.user = {
			email: '',
			password: ''
		};

		$scope.isAlertDanger = false;

		$scope.closeDangerAlert = function(){

			$scope.isAlertDanger = false;
		};

		$scope.login = function(){

			console.log($scope.user);
			AccountFactory.login($scope.user).then(function(data){

				if(data.status == 200){

					console.log("successfully authenticated");
					$window.localStorage.token = data.token;
					$window.localStorage.username = data.token;	
					$rootScope.username = $window.localStorage.username;
					$window.location.href = "#/home";
				}
				else {

					console.log(data);
					$scope.isAlertDanger = true;
				}
				$scope.user = '';
			}, function(error){

				console.log("error occured");
			});
		};
		console.log("I am in login controller");
	})
	.controller('RegiserController', function($scope, AccountFactory){

		$scope.user = {
			username: '',
			email: '',
			password: '',
			web: '',
			phone: ''
		};
		$scope.isAlertDanger = false;
		$scope.isAlertSuccess = false;
		$scope.closeDangerAlert = function(){

			$scope.isAlertDanger = false;
			$scope.isAlertSuccess = false;
		};		
		console.log("I am RegiserController");
		$scope.register = function(){

			console.log($scope.user);
			AccountFactory.register($scope.user).then(function(data){

				if(data.status == 200){

					console.log("Registration successfully");
					$scope.isAlertSuccess = true;
				}
				else{

					$scope.isAlertDanger = true;
				}
			}, function(error){

				console.log("Registration failure");
			});
			$scope.user = '';
		};
	})
	.controller('AccountRecoveryController', function($scope, AccountFactory){

		$scope.user = {
			email: '',
			oldPassword: '',
			newPassword: '',
			confirmPassword: ''
		};
		$scope.isAlertDanger = false;
		$scope.isAlertSuccess - false;
		$scope.closeDangerAlert = function(){

			$scope.isAlertDanger = false;
			$scope.isAlertSuccess = false;
		};			
		$scope.recovery = function(){

			var user = {};
			user.email = $scope.user.email;
			user.newPassword = $scope.user.newPassword;
			user.oldPassword = $scope.user.oldPassword;
			AccountFactory.recovery(user).then(function(data){

				if(data.status == 200){

					$scope.user = '';
					$scope.isAlertSuccess = true;
				}
				else{

					$scope.isAlertDanger = true;
				}
			});
		};
	});