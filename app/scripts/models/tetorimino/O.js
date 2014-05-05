(function() {
    'use strict';

    App.Tetorimino.O = App.TetoriminoModel.extend({
        getCode: function() {
            return 'O';
        },

        getStartCell: function() {
            return [
                {x:3, y:0},
                {x:3, y:1},
                {x:4, y:0},
                {x:4, y:1}
            ];
        },

        getStartCenterCell: function() {
            return {x:4, y:0};
        },

        rotate: function() {
            return true;
        }
    });

})();
