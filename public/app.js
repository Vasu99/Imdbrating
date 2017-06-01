var app = angular.module('myApp',['ngRoute']);

//configuring the routes
app.config(function($routeProvider,$locationProvider){
	$locationProvider.html5Mode(false).hashPrefix('');
	$routeProvider

	.when('/',{
		templateUrl:'/form.html',
		controller:'mainController'
	})
	.when('/process/:idname',{
		templateUrl:'viewsc.ejs',
		controller:'MyController'
	})
	.when('/result/:scrapelink/:no',{
		templateUrl:'/result.ejs',
		controller:'ResultController'
	});
});

//Controller for moviename form
app.controller('MyController',['$scope','$http','$routeParams','$location',function($scope,$http,$routeParams,$location){
	
    $scope.idname = $routeParams.idname;
    //Get sraperesult
    $http.get('http://localhost:8089/processget/'+$scope.idname).then(function(data){
          console.log(data.data);
            $scope.movies = data.data;
       });
    //Get rating
    $scope.callapi = function(linkvalue){
        res = linkvalue.substring(7,16);
        no = linkvalue.charAt(32);
        $location.path( "/result/"+res+"/"+no);
      }
      
}]);
 

//Controller to show list of movies
app.controller('mainController',['$scope','$http','$location',function($scope,$http,$location){   
    $scope.name="Hi";
    $scope.submit = function(){
        console.log("main controller "+$scope.muvname);
     $location.path( "/process/"+$scope.muvname );
    };
    
}]);

//Controller to show rating of the movie
app.controller('ResultController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
    $scope.scrapelink = $routeParams.scrapelink;
    $scope.scrapeno = $routeParams.scrapeno;
    console.log("result controller");
   
    $http.get('http://localhost:8089/getrating/'+$scope.scrapelink+"/"+ $scope.scrapeno).then(function(data){
          console.log(data);
            $scope.rating = data.data.rating;
        $scope.poster = data.data.poster;
          },function(data){
        console.log("Error occured"+data);
    });
    
}]);
    

