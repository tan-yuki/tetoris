(function() {
    'use strict';

    App.TetoriminoCellModel = App.CellModel.extend({
        defaults: {
            x: 0,
            y: 0,
            code: null
        },

        moveTo: function(vector) {
            this.set({
                x: this.get('x') + vector.x,
                y: this.get('y') + vector.y
            });

            return this;
        },

        placedIn: function(x, y) {
            return this.get('x') === x && this.get('y') === y;
        },

        getCode: function() {
            return this.get('code');
        },

        positionSlideTo: function(vector) {
            return {
                x: this.get('x') + vector.x,
                y: this.get('y') + vector.y
            };
        },

        canMoveTo: function(vector) {
            var newPosition = this.positionSlideTo(vector);

            return App.service.tetoriminoManager.canMoveTo(newPosition.x, newPosition.y);
        }
    });

})();


