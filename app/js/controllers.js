'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

  	$scope.gamertag = localStorage["gamertag"] || "";
  	$scope.friends = [];
  	$scope.loading = false;

  	$scope.fetchFriends = function() {
  		$scope.loading = true;
  		localStorage["gamertag"] = $scope.gamertag;
  		
  		$http.get('https://www.xboxleaders.com/api/2.0/friends.json?gamertag=' + encodeURIComponent($scope.gamertag)).
  			success(function(data) {
  				console.log(data)
  				$scope.loading = false;
  				$scope.friends = data.data.friends;
  			}).
  			error(function(error) {
  				$scope.loading = false;
  				console.log(error)
  			})
  		;
  	}

  	if (localStorage["gamertag"]) $scope.fetchFriends();




  }])
  