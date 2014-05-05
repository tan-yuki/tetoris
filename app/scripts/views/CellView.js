(function() {
    'use strict';

    App.CellView = Backbone.View.extend({
        tagName: 'td',

        fixed: false,

        x: 0,

        y: 0,

        code: null,

        initialize: function(options) {
            this.x = options.x;
            this.y = options.y;

            var manager = App.service.tetoriminoManager;
            this.tetoriminoCollection = manager.getTetoriminoCollection();
            this.fixedCellCollection = manager.getFixedCellCollection();

            this.listenTo(this.fixedCellCollection, 'add', this.fix);
            this.listenTo(this.fixedCellCollection, 'reset', this.refresh);
            this.listenTo(App.mediator, 'cell:watch', this.watchTetorimino);
            this.listenTo(this.tetoriminoCollection, 'dequeue', this.watchTetorimino);
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
                this.setCode(tetorimino.getCode());
                return true;
            }

            this.clearCode();
            return false;
        },

        setCode: function(code) {
            if (code) {
                this.code = code;
                this.$el.addClass(code);
                return;
            }
        },

        clearCode: function() {
            if (this.code) {
                this.$el.removeClass();
                this.code = null;
            }
        },

        render: function() {
            var model = this.tetoriminoCollection.current();
            this.setTetorimino(model);

            return this;
        },

        refresh: function() {
            // 自分自身のCellに色がつくかどうか判定し直す
            var p = this.fixedCellCollection.findCell(this.x, this.y);
            if (p) {
                this.setCode(p.code);
                this.fixed = true;
                return;
            }

            this.clearCode();
            this.fixed = false;

            // re-watch
            this.watchTetorimino();
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
