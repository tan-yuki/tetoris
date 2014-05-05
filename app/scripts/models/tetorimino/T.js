(function() {
    'use strict';

    App.Tetorimino.T = App.TetoriminoModel.extend({
        getCode: function() {
            return 'T';
        },

        getStartCell: function() {
            return [
                {x:5, y:0},
                {x:4, y:0},
                {x:4, y:1},
                {x:3, y:0}
            ];
        },

        getStartCenterCell: function() {
            return {x:4, y:0};
        }
    });

})();
