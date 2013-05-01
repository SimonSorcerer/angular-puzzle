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
             pieceEmpty(addRow(pos, -1)) ||
             pieceEmpty(addRow(pos, 1));
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

    var addRow = function(pos, count) {
        return pos + (count * $scope.size);
    }
}


function PuzzleCtrl($scope, $timeout) {
    $scope.size = 3;
    $scope.board = [];
    $scope.counter = 0;

    $scope.boardMax = function () {
        return $scope.size * $scope.size;
    }

    $scope.setSize = function (val) {
        $scope.size = val;
    }

    $scope.randomize = function () {
        $scope.board = [];
        var val = 0;

        for (var i = 0; i < $scope.boardMax(); i++) {
            val = Math.floor(Math.random() * 2);
            $scope.board.push({ value: val });
        }
    }

    $scope.onTimeout = function(){
        $scope.counter ++;
        myTimeout = $timeout($scope.onTimeout, 1000);
    }

    var myTimeout = $timeout($scope.onTimeout, 1000);

    $scope.stop = function() {
        $timeout.cancel(myTimeout);
    }

    $scope.pieceClick = function (pos) {
        if (!$scope.finished()) {
            pieceTurn(pos);
            pieceTurn(pos - 1, pos);
            pieceTurn(pos + 1, pos);
            pieceTurn(addRow(pos, -1), pos);
            pieceTurn(addRow(pos, 1), pos);
        }
    }

    $scope.finished = function () {
        return !$scope.board.some(function (element) {
            return element.value == 0;
        });
    }

    $scope.addSize = function (count) {
        $scope.size += count;

        if ($scope.size < 2) {
            $scope.size = 2;
        }
        else if ($scope.size > 5) {
            $scope.size = 5;
        }
        else {
            $scope.randomize();
        }
    }

    var pieceTurn = function (pos, originalPos) {
        if (originalPos === undefined || onCross(pos, originalPos)) {
            var max = $scope.boardMax();

            if (pos >= 0 && pos < max) {
                $scope.board[pos].value = 1 - $scope.board[pos].value;
            }
        }
    }

    var onCross = function(pos1, pos2) {
        return onSameLine(pos1, pos2) || onSameColumn(pos1, pos2);
    }

    var onSameLine = function(pos1, pos2) {
        if (Math.floor(pos1 / $scope.size) == Math.floor(pos2 / $scope.size)) {
            return true;
        }

        return false;
    }

    var onSameColumn = function(pos1, pos2) {
        if ((pos1 % $scope.size) == (pos2 % $scope.size)) {
            return true;
        }

        return false;
    }

    var addRow = function(pos, count) {
        return pos + (count * $scope.size);
    }
}