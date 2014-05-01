(function() {
    'use strict';

    App.Tetorimino.L = App.TetoriminoModel.extend({
        getCode: function() {
            return 'L';
        },

        getStartPosition: function() {
            return [
                {x:3, y:0},
                {x:3, y:1},
                {x:3, y:2},
                {x:4, y:2}
            ];
        }
    });

})();
