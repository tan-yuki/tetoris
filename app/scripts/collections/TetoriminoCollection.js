(function() {
    'use strict';

    var queue_length = 5;

    App.TetoriminoCollection = Backbone.Collection.extend({

        model: App.TetoriminoModel,

        fixedPositionList: null,

        initialize: function(options) {
            var list = [];
            for (var i = 0; i < queue_length; i++) {
                list.push(this.createNewTetorimino());
            }

            this.add(list, {
                silent: true
            });

            this.fixedPositionList = [];
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

            this.fix(tetorimino);

            this.trigger('dequeue');

            return tetorimino;
        },

        fix: function(tetorimino) {
            this.addFixedPositions(tetorimino);
            this.trigger('fix', tetorimino);
        },

        addFixedPositions: function(tetorimino) {
            var positinos = tetorimino.getPositionList();
            for (var i = 0, len = positinos.length; i < len; i++) {
                var p = positinos[i];
                this.fixedPositionList.push(p);
            }
        },

        getFixedPositionList: function() {
            return this.fixedPositionList;
        }

    });
})();
