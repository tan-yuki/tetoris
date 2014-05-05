(function() {
    'use strict';

    App.Tetorimino.I = App.TetoriminoModel.extend({
        getCode: function() {
            return 'I';
        },

        getStartCell: function() {
            return [
                {x:4, y:0},
                {x:4, y:1},
                {x:4, y:2},
                {x:4, y:3}
            ];
        },

        getStartCenterCell: function() {
            return {x:4, y:2};
        }
    });

})();
