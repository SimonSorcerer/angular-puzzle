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
            pieceTurn(arrayHelpers.addRow($scope.size, pos, -1), pos);
            pieceTurn(arrayHelpers.addRow($scope.size, pos, 1), pos);
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
        if (originalPos === undefined || arrayHelpers.onCross($scope.size, pos, originalPos)) {
            var max = $scope.boardMax();

            if (pos >= 0 && pos < max) {
                $scope.board[pos].value = 1 - $scope.board[pos].value;
            }
        }
    }

}