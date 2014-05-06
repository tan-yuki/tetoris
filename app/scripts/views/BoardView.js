(function() {
    'use strict';

    App.BoardView = Backbone.View.extend({

        tagName: 'table',

        col: 0,

        row: 0,

        initialize: function(options) {
            this.col = options.col;
            this.row = options.row;
        },

        render: function() {
            var col = this.col,
                row = this.row;

            for (var i = 0; i < col; i++) {
                var $tr = $('<tr/>');

                var cellList = [];
                for (var j = 0; j < row; j++) {

                    var cell = new App.CellView({
                        x: j,
                        y: i
                    });
                    cellList.push(cell.$el);
                }
                $tr.append(cellList);
                this.$el.append($tr);
            }

            return this;
        }
    });
})();
