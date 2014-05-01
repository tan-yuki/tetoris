(function() {
    'use strict';

    App.BoardView = Backbone.View.extend({

        tagName: 'table',

        col: 0,

        row: 0,

        tetoriminoCollection: null,

        cellCollection: null,

        initialize: function(options) {
            this.col = options.col;
            this.row = options.row;
            this.tetoriminoCollection = options.tetoriminoCollection;
        },

        render: function() {
            var col = this.col,
                row = this.row;

            for (var i = 0; i < col; i++) {
                var $tr = $('<tr/>');

                var cell_list = [];
                for (var j = 0; j < row; j++) {

                    var cell = new App.CellView({
                        x: j,
                        y: i,
                        tetoriminoCollection: this.tetoriminoCollection
                    });
                    cell_list.push(cell.$el);
                }
                $tr.append(cell_list);
                this.$el.append($tr);
            }

            return this;
        }
    });
})();
