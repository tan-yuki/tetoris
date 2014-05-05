(function() {
    'use strict';

    App.Tetorimino.Z = App.TetoriminoModel.extend({
        getCode: function() {
            return 'Z';
        },

        getStartCell: function() {
            return [
                {x:3, y:0},
                {x:4, y:0},
                {x:4, y:1},
                {x:5, y:1}
            ];
        },

        getStartCenterCell: function() {
            return {x:4, y:1};
        }

    });

})();
