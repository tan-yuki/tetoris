(function() {
    'use strict';

    App.CellView = Backbone.View.extend({
        tagName: 'td',

        x: 0,

        y: 0,

        initialize: function(options) {
            this.x = options.x;
            this.y = options.y;

            this.tetoriminoCollection = options.tetoriminoCollection;

            this.listenTo(App.mediator, 'cell:watch', this.watchTetorimino);
            this.listenTo(this.tetoriminoCollection, 'dequeue', this.watchTetorimino);
        },

        render: function() {
            var model = this.tetoriminoCollection.current();
            if (model.placedIn(this.x, this.y)) {
                this.$el.addClass(model.getCode());
            } else {
                this.$el.removeClass();
            }

            return this;
        },

        watchTetorimino: function() {
            var tetorimino = this.tetoriminoCollection.current();

            this.listenTo(tetorimino, 'change', this.render);
        }

    });
})();
