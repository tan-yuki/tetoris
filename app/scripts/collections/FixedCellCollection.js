(function() {
    'use strict';

    var config = App.Config,
        ROW    = config.row,
        COLUMN = config.col;

    App.FixedCellCollection = Backbone.Collection.extend({

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

        _createCollectionMoveTo: function(vector) {
            var positions = this.map(function(p) {
                return new App.TetoriminoCellModel({
                    x: p.get('x') + vector.x,
                    y: y.get('y') + vector.y
                });
            });

            return new App.FixedCellCollection(positions, {silent: true});
        },

        canMoveTo: function(vector) {
            return this._createCollectionMoveTo(vector).every(function(p) {
                if (!p.isValid()) {
                    return false;
                }

                return !position.isSamePlace(p);
            });
        },

        destroyLine: function(y) {

            var lineList = [];

            if (_.isArray(y)) {
                lineList = y;
            } else {
                lineList.push(y);
            }

            // delete this `y` line
            var positions = this.filter(function(p) {
                return !_.contains(lineList, p.get('y'));
            });

            // padding this line
            for (var i = 0, len = lineList.length; i < len; i++) {
                var line = lineList[i];

                positions = _.map(positions, function(p) {
                    if (p.get('y') < line) {
                        // increment
                        p.set('y', p.get('y') + 1);
                    }

                    return p;
                });
            }

            this.reset(positions);
        },

        destroyFilledLine: function() {

            var lines = [];

            for (var i = 0; i < COLUMN; i++) {

                // i 行の fixed のCellの長さを取得
                var filledCount = this.filter(function(p) {
                    return p.get('y') === i;
                }).length;

                if (filledCount === ROW) {
                    lines.push(i);
                }
            }

            if (lines.length) {
                this.destroyLine(lines);
            }
        },

        reachTopLine: function() {
            return !!this.where({y:0}).length;
        }
    });

})();


