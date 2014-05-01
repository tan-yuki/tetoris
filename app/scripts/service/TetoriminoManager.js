(function() {
    'use strict';

    App.TetoriminoManagerModel = Backbone.Model.extend({

        col: 0,

        row: 0,

        /**
         * @type App.TetoriminoCollection
         */
        tetoriminoCollection: null,

        initialize: function(options) {

            this.col = options.col;
            this.row = options.row;

            // Initialize collection
            this.tetoriminoCollection = options.tetoriminoCollection;
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
        },

        getFixedPositionList: function() {
            return this.tetoriminoCollection.getFixedPositionList();
        },

        canMoveTo: function(x, y) {
            if (x < 0 || x > this.row - 1) {
                return false;
            }

            if (y < 0 || y > this.col - 1) {
                return false;
            }

            var fixedList = this.getFixedPositionList();
            if (!fixedList) {
                return true;
            }

            for (var i = 0, len = fixedList.length; i < len; i++) {
                var fixed = fixedList[i];

                if (x === fixed.x && y === fixed.y) {
                    return false;
                }
            }

            return true;
        }

    });
})();
