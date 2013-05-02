function NumberCtrl($scope, $timeout) {
    $scope.size = 3;
    $scope.board = [];
    $scope.counter = 0;

    $scope.boardMax = function () {
        return $scope.size * $scope.size;
    }


    $scope.init = function () {
        $scope.board = [];

        for (var i = 0; i < $scope.boardMax(); i++) {
            $scope.board.push({ value: i });
        }
    }


    $scope.randomize = function () {
        if (!$scope.initialized()) {
            $scope.init();
        }
        fisherYates($scope.board);
    }


    $scope.pieceClick = function (pos) {
        if (pos < $scope.boardMax() && pieceMovable(pos)) {
            $scope.board[zeroPosition($scope.board)].value = $scope.board[pos].value;
            $scope.board[pos].value = 0;
        }
    }

    $scope.pieceEmpty = function (pos) {
        return $scope.board[pos].value == 0;
    }


    var zeroPosition = function (arr) {
        for(var pos = 0; pos < arr.length; pos++) {
            if (arr[pos].value === 0) {
                return pos;
            }
        }
    }


    var pieceMovable = function (pos) {
        return pieceEmpty(pos - 1) ||
            pieceEmpty(pos + 1) ||
            pieceEmpty(arrayHelpers.addRow($scope.size, pos, -1)) ||
            pieceEmpty(arrayHelpers.addRow($scope.size, pos, 1));
    }


    var pieceEmpty = function (pos) {
        return (pos >= 0 &&
            pos < $scope.boardMax() &&
            $scope.board[pos].value === 0);
    }


    $scope.initialized = function() {
        return ($scope.board.length == $scope.size * $scope.size);
    }


    var fisherYates = function (arr) {
        var i = arr.length;
        if ( i == 0 ) return false;
        while ( --i ) {
            var j = Math.floor( Math.random() * ( i + 1 ) );
            var tempi = arr[i];
            var tempj = arr[j];
            arr[i] = tempj;
            arr[j] = tempi;
        }
    }

}