(function() {
    'use strict';

    App.Tetorimino.I = App.TetoriminoModel.extend({
        getCode: function() {
            return 'I';
        },

        getStartPosition: function() {
            return [
                this.createPosition({x:4, y:0}),
                this.createPosition({x:4, y:1}),
                this.createPosition({x:4, y:2}),
                this.createPosition({x:4, y:3})
            ];
        },

        getStartCenterPosition: function() {
            return {x:4, y:2};
        }
    });

})();
