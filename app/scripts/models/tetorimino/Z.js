(function() {
    'use strict';

    App.Tetorimino.Z = App.TetoriminoModel.extend({
        getCode: function() {
            return 'Z';
        },

        getStartPosition: function() {
            return [
                this.createPosition({x:3, y:0}),
                this.createPosition({x:4, y:0}),
                this.createPosition({x:4, y:1}),
                this.createPosition({x:5, y:1})
            ];
        },

        getStartCenterPosition: function() {
            return {x:4, y:1};
        }

    });

})();
