(function() {
    'use strict';

    var queue_length = 5;

    App.TetoriminoCollection = Backbone.Collection.extend({

        currentIndex: 0,

        model: App.TetoriminoModel,

        initialize: function(options) {
            var list = [];
            for (var i = 0; i < queue_length; i++) {
                list.push(this.createNewTetorimino());
            }

            this.add(list, {
                silent: true
            });
        },

        createNewTetorimino: function() {
            return App.TetoriminoModel.factory();
        },

        current: function() {
            return this.at(this.currentIndex);
        },

        dequeue: function() {
            this.unshift(this.createNewTetorimino());
            this.currentIndex++;

            this.trigger('dequeue');
        }

    });
})();
