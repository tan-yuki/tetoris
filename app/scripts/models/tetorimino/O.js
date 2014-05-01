(function() {
    'use strict';

    App.Tetorimino.O = App.TetoriminoModel.extend({
        getCode: function() {
            return 'O';
        },

        getStartPosition: function() {
            return [
                this.createPosition({x:3, y:0}),
                this.createPosition({x:3, y:1}),
                this.createPosition({x:4, y:0}),
                this.createPosition({x:4, y:1})
            ];
        },

        getStartCenterPosition: function() {
            return {x:4, y:0};
        },

        rotate: function() {
            return true;
        }
    });

})();
