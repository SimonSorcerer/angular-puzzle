var arrayHelpers = {
    addRow: function(arrSize, pos, count) {
        return pos + (count * arrSize);
    },


    onCross: function(arrSize, pos1, pos2) {
        return arrayHelpers.onSameLine(arrSize, pos1, pos2) || arrayHelpers.onSameColumn(arrSize, pos1, pos2);
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
    }
}