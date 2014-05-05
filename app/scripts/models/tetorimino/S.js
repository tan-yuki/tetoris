(function() {
    'use strict';

    App.Tetorimino.S = App.TetoriminoModel.extend({
        getCode: function() {
            return 'S';
        },

        getStartCell: function() {
            return [
                {x:5, y:0},
                {x:4, y:0},
                {x:4, y:1},
                {x:3, y:1}
            ];
        },

        getStartCenterCell: function() {
            return {x:4, y:1};
        }
    });

})();
