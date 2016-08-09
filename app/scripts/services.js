'use strict';

angular.module('confusionApp')

		//.constant -->  using $http service - this is where the json-server running so will be accessing server
		.constant("baseURL","http://localhost:3000/")

        .service('menuFactory',['$resource','baseURL',function($resource, baseURL) {
                this.getDishes = function(){			
					return $resource(baseURL + "dishes/:id",null,{'update':{method:'PUT'}});  
                };
    
                // implement a function named getPromotion
                 this.getPromotion = function(index){
                    return $resource(baseURL + "promotions/:id",null,{'update':{method:'PUT'}});
                };                 
        }])

        .factory('corporateFactory',['$resource','baseURL', function($resource,baseURL) {
    
            var corpfac = {};
     
             // Implement two functions, one named getLeaders,
            corpfac.getLeaders = function(){
                return $resource(baseURL + "leadership/:id",null,{'update':{method:'PUT'}});
            };

            // Remember this is a factory not a service
            return corpfac; 
        }])

		.factory('feedbackFactory',['$resource','baseURL', function($resource,baseURL) {
    
            var feedbackfac = {};
     
             // Implement two functions, one named getLeaders,
            feedbackfac.getfeedbacks = function(){
                return $resource(baseURL + "feedback/",null,{'POST':{method:'POST'}});
            };

            // Remember this is a factory not a service
            return feedbackfac; 
        }])
;


