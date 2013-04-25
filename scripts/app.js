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
            val = Math.floor((Math.random() * 2));
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