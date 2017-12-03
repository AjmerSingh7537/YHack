app.controller('homeController', ['$scope', '$http', function($scope, $http) {
	$scope.techsToSearch = [];
	$scope.googleSearchesRatio = -1;
	$scope.socialNetworkSearches = -1;
	$scope.patentSearches = -1;

	$scope.addTech = function(index) {
		if(!_.isEmpty($scope.technology)) {
			$scope.techsToSearch.push($scope.technology);
			$scope.technology = '';
		}
	}
	// Get google trends results
	$scope.getGoogleTrend = function() {
		console.log("Calculating ...");
		$http({
			method: "POST",
			url: "/getResults",
			data: {
				technologies: $scope.techsToSearch
			}
		}).then(onSuccess, onFailure);

		function onSuccess(result) {
			$scope.googleSearchesRatio = result.data;
			$scope.attemptCalculate();
		}

		function onFailure() {
			console.log("failed");
		}
	}

	// Get social network trends results
	$scope.getSocialNetworkTrend = function() {
		console.log("Calculating ...");
		$http({
			method: "POST",
			url: "/getSocialNetworkResults",
			data: {
				technologies: $scope.techsToSearch
			}
		}).then(onSuccess, onFailure);

		function onSuccess(result) {
			$scope.socialNetworkSearches = result.data;
			$scope.attemptCalculate();
		}

		function onFailure() {
			console.log("failed");
		}
	}


	// Get Patents trends results
	$scope.getPatentsTrend = function() {
		console.log("Calculating ...");
		$http({
			method: "POST",
			url: "/getPatentsResults",
			data: {
				technologies: $scope.techsToSearch
			}
		}).then(onSuccess, onFailure);

		function onSuccess(result) {
			$scope.patentSearches = result.data;
			$scope.attemptCalculate();
		}

		function onFailure() {
			console.log("failed");
		}
	}

	// Executes all trends fetching functions
	$scope.submit = function() {
		$scope.getGoogleTrend();
		$scope.getSocialNetworkTrend();
		$scope.getPatentsTrend();
	}

	// is called after every function of submit, 
	$scope.attemptCalculate = function() {
		if($scope.googleSearchesRatio.avg < 0 || $scope.socialNetworkSearches.total < 0 || $scope.patentSearches < 0) {
			return;
		}

		$http({
		method: "POST",
		url: "/computeFunction",
		data: {
			googleTrends: $scope.googleSearchesRatio.avg,
			socialNetworks: $scope.socialNetworkSearches.total,
			googlePatents: $scope.patentSearches
		}
		}).then(onSuccess, onFailure);

		function onSuccess(result) {
			console.log(result.data);
		}

		function onFailure() {
			console.log("failed");
		}
	}
}]);
