var arrayHelper = {
    addRow: function(arrSize, pos, count) {
        return pos + (count * arrSize);
    },


    onCross: function(arrSize, pos1, pos2) {
        return arrayHelper.onSameLine(arrSize, pos1, pos2) || arrayHelper.onSameColumn(arrSize, pos1, pos2);
    },


    onSameLine: function(arrSize, pos1, pos2) {
        if (Math.floor(pos1 / arrSize) == Math.floor(pos2 / arrSize)) {
            return true;
        }

        return false;
    },


    onSameColumn: function(arrSize, pos1, pos2) {
        if ((pos1 % arrSize) == (pos2 % arrSize)) {
            return true;
        }

        return false;
    },

    fisherYates: function (arr) {
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


var timerHelper = {
    interval: 1000,
    myTimeout: {},
    counter: 0,

    start: function($timeout) {
        timerHelper.myTimeout = $timeout(timerHelper.onTimeout($timeout), timerHelper.interval);
    },

    setInterval: function(interval) {
        timerHelper.interval = interval;
    },

    onTimeout: function($timeout){
        timerHelper.counter ++;
        timerHelper.myTimeout = $timeout(timerHelper.onTimeout($timeout), timerHelper.interval);
    },

    stop: function($timeout) {
        $timeout.cancel(timerHelper.myTimeout);
    }
}