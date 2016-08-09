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
		
			
			//using $resource we need just to write:in return data in an empty array
			menuFactory.getDishes().query(
				function(response){
					$scope.dishes = response;
					$scope.showMenu = true;
				},
				function(response){
					$scope.message = "Error: "+ response.status + " " + response.statusText;
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

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope,feedbackFactory) {
			
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
					//to POST  feedback  back to the server
					feedbackFactory.getfeedbacks().updtae({id:$scope.feedback.id},$scope.feedback);
					
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])
		
		//if we using ng-route we need to inject $routeParams but with ui-routing we use $stateParams
        .controller('DishDetailController', ['$scope','$stateParams','menuFactory', function($scope,$stateParams, menuFactory) {
			$scope.dish={};
			$scope.showDish = false;
			$scope.message="Laoding...";
			//we removed the dish array from here to and moved to service.js file and get dish using service(menuFactory)
			
			//using $resource--> 
			$scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
			.$promise.then(
				function(response){
					$scope.dish = response;
					$scope.showMenu = true;
				},
				function(response){
					$scope.message = "Error: "+ response.status + " " + response.statusText;
				}	
			);                        
        }])

        .controller('DishCommentController', ['$scope','menuFactory', function($scope,menuFactory) {
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
				
				//to push updated dish object back to the server
				menuFactory.getDishes().updtae({id:$scope.dish.id},$scope.dish);
                
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
        .controller('IndexController', ['$scope','menuFactory','corporateFactory', function($scope,menuFactory,corporateFactory){
		
			$scope.message = "Loading...";
			$scope.showDish = false;
			$scope.showPromotion = false;
			$scope.showLeader = false;

			//using $resource
			$scope.dish = menuFactory.getDishes().get({id:0})
			   .$promise.then(
					function(response){
						$scope.dish = response;
						$scope.showDish = true;
					},
					function(response){
						$scope.message = "Error: "+ response.status + " " + response.statusText;
					}
			);
			
            $scope.promotion = menuFactory.getPromotion().get({id:0})
				.$promise.then(
					function(response){
						$scope.promotion = response;
						$scope.showPromotion = true;
					},
					function(response){
						$scope.message = "Error: "+ response.status + " " + response.statusText;
					}
			);
			
            $scope.leaders = corporateFactory.getLeaders().get({id:3})
				.$promise.then(
					function(response){
						$scope.leader = response;
						$scope.showLeader = false;
					},
					function(response){
						$scope.message = "Error: "+ response.status + " " + response.statusText;
					}
			 );
            
        }])
        
        .controller('AboutController',['$scope','corporateFactory',function ($scope, corporateFactory){
               $scope.leader = corporateFactory.getLeaders().query(
					function(response){
						$scope.leader = response;
						$scope.showLeader = false;
					},
					function(response){
						$scope.message = "Error: "+ response.status + " " + response.statusText;
					}
			 );
                
        }])

;