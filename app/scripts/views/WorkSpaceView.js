(function() {
    'use strict';

    App.WorkSpaceView = Backbone.View.extend({
        el: '#workspace',

        board: null,

        initialize: function(options) {
            this.board = options.board;
        },

        render: function() {
            this.$el.append(this.board.render().$el);
            return this;
        }
    });
})();
