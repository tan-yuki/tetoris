(function() {
    'use strict';

    App.Tetorimino.J = App.TetoriminoModel.extend({
        getCode: function() {
            return 'J';
        },

        getStartCell: function() {
            return [
                {x:4, y:0},
                {x:4, y:1},
                {x:4, y:2},
                {x:3, y:2}
            ];
        },

        getStartCenterCell: function() {
            return {x:4, y:2};
        }
    });

})();
