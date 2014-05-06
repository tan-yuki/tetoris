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
            var manager = App.service.tetoriminoManager;

            // listの先頭のmodelをlistから取り除く
            var tetorimino = this.shift();

            // listの最後にmodelを追加
            this.add(this.createNewTetorimino());

            // 取り除いたmodelのCellをfixさせる
            manager.addFixedPositions(tetorimino.getPositions());

            // `dequeue`イベントを発火させる
            this.trigger('dequeue');

            return tetorimino;
        },

        next: function() {
            return this.at(1);
        }

    });
})();
