(function() {
    'use strict';

    var config = App.Config,
        ROW    = config.row,
        COLUMN = config.col;

    App.FixedCellCollection = App.CellCollection.extend({

        _createCollectionMoveTo: function(vector) {
            var positions = this.map(function(p) {
                return new App.TetoriminoCellModel({
                    x: p.get('x') + vector.x,
                    y: p.get('y') + vector.y
                });
            });

            return new App.FixedCellCollection(positions, {silent: true});
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

            // padding deleted line
            var deleteLine = function(positions, y) {
                return _.map(positions, function(p) {
                    if (p.get('y') < y) {
                        // increment
                        p.set('y', p.get('y') + 1);
                    }

                    return p;
                });
            };

            for (var i = 0, len = lineList.length; i < len; i++) {
                var line = lineList[i];
                positions = deleteLine(positions, line);

            }

            this.reset(positions);
        },

        destroyFilledLine: function() {

            var lines = [];

            var countFilledCell = _.bind(function(y) {
                // y 行の fixed のCellの長さを取得
                return this.filter(function(p) {
                    return p.get('y') === y;
                }).length;
            }, this);

            for (var i = 0; i < COLUMN; i++) {

                var filledCount = countFilledCell(i);

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


