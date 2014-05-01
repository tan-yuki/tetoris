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

                if (App.service.tetoriminoManager.isGameOver()) {
                    alert('Game over!');
                    return;
                }
                this.loopAction();
            }, this), this.interval);
        }
    });

})();
