(function() {
    'use strict';

    App.NextHoldView = Backbone.View.extend({
        el: '#subspace .next-tetorimino',

        /**
         * @var App.TetoriminoCollection
         */
        collection: null,

        initialize: function() {
            this.listenTo(this.collection, 'dequeue', this.render);
        },

        render: function() {
            var model = this.collection.next();

            var positions = model.createStartPositions();

            var view = new App.NextHoldTetoriminoView({
                positions: positions,
            });
            this.$el.html(view.render().$el);

            return this;
        }

    });
})();
