(function() {
    'use strict';

    App.mediator = _.extend({}, Backbone.Events);

    var col = App.Config.col;
    var row = App.Config.row;


    var app  = new App.AppView({
        col: col,
        row: row
    });

    app.render();

    $(function() {
        app.start();
    });

})();
