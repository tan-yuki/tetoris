(function() {
    'use strict';

    App.TetoriminoCellCollection = Backbone.Collection.extend({

        model: App.TetoriminoCellModel,

        moveTo: function(vector) {
            this.each(function(p) {
                p.moveTo({
                    x: vector.x,
                    y: vector.y
                });
            });
        },

        placedIn: function(x, y) {
            return this.some(function(p) {
                return p.placedIn(x, y);
            });
        },

        canMoveTo: function(vector) {
            return this.every(function(p) {
                return p.canMoveTo(vector);
            });
        }
    });

})();


