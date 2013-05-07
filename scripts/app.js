angular.module('puzzle', []).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/tiles', {templateUrl: 'tiles.html',   controller: PuzzleCtrl}).
            when('/numbers', {templateUrl: 'numbers.html', controller: NumberCtrl}).
            otherwise({redirectTo: '/tiles'});
    }]);