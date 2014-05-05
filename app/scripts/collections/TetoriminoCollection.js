(function() {
    'use strict';

    var queue_length = 5;

    App.TetoriminoCollection = Backbone.Collection.extend({

        model: App.TetoriminoModel,

        /**
         * Fixed cells
         * 
         * @var App.FixedTetoriminoCellCollection
         */
        fixedCellCollection: null,

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
            return this.at(0);
        },

        dequeue: function() {
            var tetorimino = this.shift();
            this.add(this.createNewTetorimino());

            if (tetorimino) {
                this.fix(tetorimino);
                this.trigger('dequeue');
            }

            return tetorimino;
        },

        fix: function(tetorimino) {
            var manager = App.service.tetoriminoManager;
            manager.addFixedPositions(tetorimino.getPositions());

            this.trigger('fix', tetorimino);
        }

    });
})();
