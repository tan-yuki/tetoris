(function() {
    'use strict';

    App.CellCollection = Backbone.Collection.extend({

        model: App.TetoriminoCellModel,

        exists: function(x, y) {
            return this.some(function(p) {
                return p.placedIn(x, y);
            });
        },

        findCell: function(x, y) {
            return this.find(function(p) {
                return p.placedIn(x, y);
            });
        },

        minX: function() {
            return this.min(function(p) {
                return p.get('x');
            }).get('x');
        },

        minY: function() {
            return this.min(function(p) {
                return p.get('y');
            }).get('y');
        },

        maxX: function() {
            return this.max(function(p) {
                return p.get('x');
            }).get('x');
        },

        maxY: function() {
            return this.max(function(p) {
                return p.get('y');
            }).get('y');
        },
    });

})();
