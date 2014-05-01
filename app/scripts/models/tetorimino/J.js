(function() {
    'use strict';

    App.Tetorimino.J = App.TetoriminoModel.extend({
        getCode: function() {
            return 'J';
        },

        getStartPosition: function() {
            return [
                this.createPosition({x:4, y:0}),
                this.createPosition({x:4, y:1}),
                this.createPosition({x:4, y:2}),
                this.createPosition({x:3, y:2})
            ];
        },

        getStartCenterPosition: function() {
            return {x:4, y:2};
        }
    });

})();
