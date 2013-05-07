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


    $scope.finished = function () {
        if ($scope.board.length < 9) {
            return false;
        }

        var result = true;

        for (var i = 0; i <= 7; i++) {
            if ($scope.board[i].value !=  i + 1) {
                result = false;
            }
        }

        return result;
    }


    $scope.randomize = function () {
        if (!$scope.initialized()) {
            $scope.init();
        }
        $scope.counter = 0;

        arrayHelper.fisherYates($scope.board);
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
            pieceEmpty(arrayHelper.addRow($scope.size, pos, -1)) ||
            pieceEmpty(arrayHelper.addRow($scope.size, pos, 1));
    }


    var pieceEmpty = function (pos) {
        return (pos >= 0 &&
            pos < $scope.boardMax() &&
            $scope.board[pos].value === 0);
    }


    $scope.initialized = function() {
        return ($scope.board.length == $scope.size * $scope.size);
    }

    $scope.onTimeout = function(){
        $scope.counter ++;
        myTimeout = $timeout($scope.onTimeout, 1000);
    }

    var myTimeout = $timeout($scope.onTimeout, 1000);

    $scope.stop = function() {
        $timeout.cancel(myTimeout);
    }
}