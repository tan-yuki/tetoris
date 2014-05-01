(function() {
    'use strict';

    App.Tetorimino.J = App.TetoriminoModel.extend({
        getCode: function() {
            return 'J';
        },

        getStartPosition: function() {
            return [
                {x:4, y:0},
                {x:4, y:1},
                {x:4, y:2},
                {x:3, y:2}
            ];
        }
    });

})();
