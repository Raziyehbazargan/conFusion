'use strict';

//angular.module('confusionApp', [])  --> for using dependencies injection,services and factories we need to change module and remove[]
angular.module('confusionApp')

		//Now we do dependency injection to introduce the menuFactory service into MenuController:
        .controller('MenuController', ['$scope','menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
			$scope.showMenu = false;
			$scope.message = "Loading...";
			
			//we moved the dishes array from here to dervice.js file, and here we use that using service name(menuFactory)
      		//$scope.dishes= menuFactory.getDishes();
			
			//using $http, we need a empty javascript object
			$scope.dishes = {};
			menuFactory.getDishes()
			.then(
				function(response){
						$scope.dishes = response.data;
						$scope.showMenu = true;
				},
				function(response){
						$scope.message = "Error: +" + response.status + " " + response.statusText;
				}
			);
			
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])
		
		//if we using ng-route we need to inject $routeParams but with ui-routing we use $stateParams
        .controller('DishDetailController', ['$scope','$stateParams','menuFactory', function($scope,$stateParams, menuFactory) {
			$scope.showDish = false;
			$scope.message="Laoding...";
			//we removed the dish array from here to and moved to service.js file and get dish using service(menuFactory)
			//var dish= 				menuFactory.getDish(parseInt($stateParams.id,10));
			// $scope.dish = dish;
			//using $http service
			$scope.dish ={};
			menuFactory.getDish(parseInt($stateParams.id,10))
			.then(
				function(response){
					$scope.dish = response.data;
					$scope.showDish = true;
				},
				function(response){
					$scope.message = "Error: " + response.status + " " + response.statusText;
				}
			);
                        
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            $scope.newComment = {
				rating:'5',
				comment:'',
				author:'',
				date:''
			};
            $scope.submitComment = function () {
                
                //Step 2: This is how you record the date
                //"The date property of your JavaScript object holding the comment" = new Date().toISOString();
                $scope.newComment.date = new Date().toISOString();
				
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.newComment);
                
                //Step 4: reset your form to pristine
				$scope.commentForm.$setPristine();
				//Step 5: reset your JavaScript object that holds your comment
				$scope.newComment = {
					rating:'5',
					comment:'',
					author:'',
					date:''
				};
			};
               
        }])

	        // implement the IndexController and About Controller here
      // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope','menuFactory','corporateFactory', function($scope,menuFactory,corporateFactory){
			
            //$scope.dish = menuFactory.getDish(3);
			//using $http to get a specific dish
			$scope.dish ={};
			menuFactory.getDish(0)
			.then(
				function(response){
					$scope.dish = response.data;
				}
			);
			
            $scope.promotion = menuFactory.getPromotion(0);
            $scope.leader = corporateFactory.getLeader(1);
            
        }])
        
        .controller('AboutController',['$scope','corporateFactory',function ($scope, corporateFactory){
            $scope.leaders = corporateFactory.getLeaders();
                
        }])

;