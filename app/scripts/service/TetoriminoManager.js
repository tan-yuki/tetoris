(function() {
    'use strict';

    App.TetoriminoManagerModel = Backbone.Model.extend({

        /**
         * @type App.TetoriminoCollection
         */
        tetoriminoCollection: null,

        /**
         * @type App.FixedCellCollection
         */
        fixedCellCollection: null,

        initialize: function(options) {

            // Initialize collection
            this.tetoriminoCollection = options.tetoriminoCollection;
            this.fixedCellCollection  = options.fixedCellCollection;
        },

        current: function() {
            return this.tetoriminoCollection.current();
        },

        down: function() {
            if (!this.current().down()) {
                this.fix();
            }
        },

        right: function() {
            this.current().right();
        },

        left: function() {
            this.current().left();
        },

        rotate: function() {
            this.current().rotate();
        },

        fix: function() {
            this.tetoriminoCollection.dequeue();

            this.fixedCellCollection.destroyFilledLine();
        },

        isGameOver: function() {
            return this.fixedCellCollection.reachTopLine();
        },

        addFixedPositions: function(positions) {
            this.fixedCellCollection.add(positions.models);
        },

        canMoveTo: function(x, y) {
            var errormsg = App.CellModel.validateCell(x, y);
            if (errormsg) {
                return false;
            }

            return !this.isFixed(x, y);
        },

        isFixed: function(x, y) {
            return this.fixedCellCollection.exists(x, y);
        },

        getTetoriminoCollection: function() {
            return this.tetoriminoCollection;
        },

        getFixedCellCollection: function() {
            return this.fixedCellCollection;
        }

    });
})();
