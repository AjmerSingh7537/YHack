app.controller('homeController', ['$scope', function($scope) {
	$scope.inputsToShow = ['1'];
	$scope.techsToSearch = [];

	$scope.submit = function(index) {
		if(!_.isEmpty($scope.technology)) {
			$scope.techsToSearch.push($scope.technology);
			$scope.technology = '';
		}
	}
}]);