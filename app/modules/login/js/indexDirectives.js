angular.module('indexApp')
	.directive('inputDirective', function(){
		return {

			restrict: 'AEC',
			replace: true,
			scope: {
				model: '=model',
			},
			link: function(scope, element, attributes){
					scope.inputs = {};
					scope.inputs.label = attributes.label;
					scope.inputs.id = attributes.id;
					scope.inputs.placeholder = attributes.placeholder;
					scope.inputs.type = attributes.type;					
			},									
			template:'<div class="form-group">'+
                    '<label for="{{inputs.id}}">{{inputs.label}}</label>'+ 
                    '<input class="form-control cts-input" id="{{inputs.id}}" type="{{inputs.type}}" name="{{inputs.id}}" placeholder="{{inputs.placeholder}}" data-mymodel={{inputs.model}}  data-ng-model="model" required />'+
                  	'</div>'
		};
	})
	.directive('dangerAlert', function(){

		return {

			restrict: 'AEC',
			link: function(scope, element, attributes){

				scope.alertMessage = attributes.message;
				scope.class = attributes.class;
			},
			template: '<div class="alert {{ class }}" role="alert">'+
                          '<p>{{ alertMessage }} <span class="glyphicon glyphicon-remove pull-right ada-cursor" aria-hidden="true" data-ng-click="closeDangerAlert()"></span></p>'+
                      '</div>'
		}
	})
	.directive('myInput', function(){

		console.log("I am myInput directive");
		return {

			restrict: 'A',
			replace: true,
			link: function(scope, element, attributes){

				attributes.$set('data-ng-model', attributes.mymodel);
				console.log(attributes.mymodel);
			}
		}
	})
	.directive('removeDangerAlert', function(){

		return {
			
			restrict: 'A',
			link: function(scope, element, attributes){

				element.on('click', function(){

					console.log("Close icon clicked");
					console.log(scope.isAlertDanger);
					scope.isAlertDanger = false;
				});
			}
		}
		console.log("I am in login me");
	});
