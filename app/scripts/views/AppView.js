(function() {
    'use strict';

    App.AppView = Backbone.View.extend({

        workspace: null,

        subspace: null,

        initialize: function(options) {
            var col = options.col;
            var row = options.row;

            var tetoriminoCollection = new App.TetoriminoCollection();
            var fixedCellCollection = new App.FixedCellCollection();

            App.service.tetoriminoManager = new App.TetoriminoManagerModel({
                col: col,
                row: row,
                tetoriminoCollection: tetoriminoCollection,
                fixedCellCollection: fixedCellCollection
            });

            this.workspace = new App.WorkSpaceView({
                board: new App.BoardView({
                    col: col,
                    row: row
                })
            });
            this.subspace  = new App.SubSpaceView(options.subspace || {});
        },

        render: function() {
            this.workspace.render();
            this.subspace.render();
        },

        start: function() {
            App.mediator.trigger('cell:watch');

            // start listen user operation
            var operator = new App.UserOperatorView();

            // start timer
            var timer = new App.TimerView();
        }
    });
})();
