(function() {
    'use strict';

    App.Tetorimino.O = App.TetoriminoModel.extend({
        getCode: function() {
            return 'O';
        },

        getStartPosition: function() {
            return [
                {x:3, y:0},
                {x:3, y:1},
                {x:4, y:0},
                {x:4, y:1}
            ];
        }
    });

})();
