'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

  	$scope.gamertag = localStorage["gamertag"] || "";
  	$scope.friends = [];
  	$scope.online_friends = [];
  	$scope.loading = false;

  	$scope.fetchFriends = function() {
  		$scope.loading = true;
  		localStorage["gamertag"] = $scope.gamertag;
  		
  		$http.get('https://www.xboxleaders.com/api/2.0/friends.json?gamertag=' + encodeURIComponent($scope.gamertag)).
  			success(function(data) {
  				// reset the friend model
  				$scope.friends = [];
  				$scope.online_friends = [];

  				$scope.friends = data.data.friends;
  				
  				// find friends that are online
  				for (var i = data.data.friends.length - 1; i >= 0; i--) {
  					var friend = data.data.friends[i]
  					if(friend.online) {
  						$scope.online_friends.push(friend);
  					}
  				};
			}).
  			error(function(error) {
  				console.log(error)
  			}).
  			then(function() {
  				$scope.loading = false;
  			})
  		;
  	}

  	if (localStorage["gamertag"]) $scope.fetchFriends();




  }])
  