(function() {
    'use strict';

    App.NextHoldTetoriminoView = Backbone.View.extend({
        tagName: 'table',

        /**
         * @var App.TetoriminoCellCollection
         */
        positions: null,

        initialize: function(options) {
            this.positions = options.positions;
        },

        render: function() {
            var positions = this.positions;

            var maxX = positions.maxX();
            var minX = positions.minX();
            var maxY = positions.maxY();
            var minY = positions.minY();

            var xRange = maxX - minX;
            var yRange = maxY - minY;

            var tr_list = [];
            for (var i = 0; i <= yRange; i++) {
                var td_list = [];
                var $tr = $('<tr/>');
                for (var j = 0; j <= xRange; j++) {
                    var $td = $('<td/>');

                    var p = positions.findCell(j + minX, i + minY);
                    if (p) {
                        $td.addClass(p.getCode());
                    }

                    td_list.push($td);
                }
                $tr.append(td_list);
                tr_list.push($tr);
            }

            this.$el.append(tr_list);
            return this;
        }

    });
})();
