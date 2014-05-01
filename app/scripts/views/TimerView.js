(function() {
    'use strict';

    App.TimerView = Backbone.View.extend({
        interval: 500,

        initialize: function() {
            this.loopAction();
        },

        loopAction: function() {
            setTimeout(_.bind(function() {
                App.service.tetoriminoManager.down();
                this.loopAction();
            }, this), this.interval);
        }
    });

})();
