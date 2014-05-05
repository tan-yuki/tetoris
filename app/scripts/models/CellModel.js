(function() {
    'use strict';

    var config = App.Config,
        COLUMN = config.col,
        ROW    = config.row;

    App.CellModel = Backbone.Model.extend({

        defaults: {
            x: 0,
            y: 0
        },

        validate: function(attrs, options) {
            var x = attrs.x;
            var y = attrs.y;

            return App.CellModel.validateCell(x, y);
        },

        isSamePlace: function(c) {
            return this.get('x') === c.get('x') &&
                   this.get('y') === c.get('y');
        }

    }, {
        validateCell: function(x, y) {
            if (x < 0 || x > ROW - 1) {
                return 'Invalid x position: ' + x + ' on ' +
                       '(x, y) = ' + '(' + x + ', ' + y + ')';
            }

            if (y < 0 || y > COLUMN - 1) {
                return 'Invalid y position: ' + y + ' on ' +
                       '(x, y) = ' + '(' + x + ', ' + y + ')';
            }
        }
    });

})();
