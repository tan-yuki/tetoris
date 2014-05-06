(function() {
    'use strict';

    App.TetoriminoCellCollection = App.CellCollection.extend({

        moveTo: function(vector) {
            this.each(function(p) {
                p.moveTo({
                    x: vector.x,
                    y: vector.y
                });
            });
        },

        canMoveTo: function(vector) {
            return this.every(function(p) {
                return p.canMoveTo(vector);
            });
        }
    });

})();


