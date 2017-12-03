app.controller('homeController', ['$scope', '$http', function($scope, $http) {
	$scope.techsToSearch = [];
	$scope.googleSearchesRatio = -1;
	$scope.socialNetworkSearches = -1;
	$scope.patentSearches = -1;
	$scope.calculations = 0;

	$scope.timeFrame = null;
    $scope.timeFrames =  $scope.timeFrames || [
			    { id: 1, name: 'One Week' },
			    { id: 2, name: 'One Month' },
			    { id: 3, name: 'Six Months' },
			    { id: 4, name: 'One Year' }
			];

	// chart variables
	$scope.labels = [];
	$scope.data = [];

	$scope.addTech = function(index) {
		if(!_.isEmpty($scope.technology)) {
			$scope.techsToSearch.push($scope.technology);
			$scope.technology = '';
		}
	}

	$scope.deleteTech = function(index) {
		if (index < $scope.techsToSearch.length) {
			$scope.techsToSearch.splice(index, 1);
		}
	}
	// Get google trends results
	$scope.getGoogleTrend = function() {
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
			googleTrends: $scope.googleSearchesRatio,
			socialNetworks: $scope.socialNetworkSearches,
			googlePatents: $scope.patentSearches
		}
		}).then(onSuccess, onFailure);

		function onSuccess(result) {
			$scope.calculations = result.data;
			console.log($scope.calculations);
			$scope.prepareChart();
		}

		function onFailure() {
			console.log("failed");
		}
	}

	$scope.prepareChart = function() {
		let lb = [];
		let dt = [];
		for(var index in $scope.calculations) {
			lb.push($scope.calculations[index].word);
			dt.push($scope.calculations[index].trendCalculation);
		}
		$scope.labels = lb;
		$scope.data = dt;
		$scope.options = {
		    scales: {
		        yAxes: [{
		            ticks: {
		                min: 0,
		                max: 100,
		                padding: 30
		            }
		        }]
		    }
		}
	}

}]);
