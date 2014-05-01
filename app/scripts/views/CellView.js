(function() {
    'use strict';

    App.CellView = Backbone.View.extend({
        tagName: 'td',

        fixed: false,

        x: 0,

        y: 0,

        initialize: function(options) {
            this.x = options.x;
            this.y = options.y;

            this.tetoriminoCollection = options.tetoriminoCollection;

            this.listenTo(App.mediator, 'cell:watch', this.watchTetorimino);
            this.listenTo(this.tetoriminoCollection, 'dequeue', this.watchTetorimino);
            this.listenTo(this.tetoriminoCollection, 'fix', this.fix);
        },

        fix: function(tetorimino) {
            if (this.setTetorimino(tetorimino)) {
                this.fixed = true;
            }
        },

        setTetorimino: function(tetorimino) {
            if (this.fixed) {
                return false;
            }

            if (tetorimino.placedIn(this.x, this.y)) {
                this.$el.addClass(tetorimino.getCode());
                return true;
            }

            this.$el.removeClass();
            return false;
        },

        render: function() {
            var model = this.tetoriminoCollection.current();
            this.setTetorimino(model);

            return this;
        },

        watchTetorimino: function() {
            if (this.fixed) {
                return;
            }

            var tetorimino = this.tetoriminoCollection.current();
            this.listenTo(tetorimino, 'change', this.render);
        }

    });
})();
