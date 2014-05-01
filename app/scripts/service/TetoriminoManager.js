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

        fix: function() {
            this.tetoriminoCollection.dequeue();
        },

        getFixedPositionList: function() {
            return this.tetoriminoCollection.getFixedPositionList();
        },

        canMoveTo: function(vector, startingPoint) {
            var newX = startingPoint.x + vector.x;
            var newY = startingPoint.y + vector.y;

            if (newX < 0 || newX > this.row - 1) {
                return false;
            }

            if (newY < 0 || newY > this.col - 1) {
                return false;
            }

            var fixedList = this.getFixedPositionList();
            if (!fixedList) {
                return true;
            }

            for (var i = 0, len = fixedList.length; i < len; i++) {
                var fixed = fixedList[i];

                if (newX === fixed.x && newY === fixed.y) {
                    return false;
                }
            }

            return true;
        }

    });
})();
