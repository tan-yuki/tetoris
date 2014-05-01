(function() {
    'use strict';

    App.UserOperatorView = Backbone.View.extend({

        pressing: false,

        el: document.body,

        events: {
            keydown: 'keydown',
            keyup:   'keyup',
        },

        keydown: function(e) {
            this.pressing = true;

            var code = e.keyCode || e.which;
            if (code == 37) { // left key
                App.service.tetoriminoManager.left();
            } else if (code == 39) { // right key
                App.service.tetoriminoManager.right();
            } else if (code == 40) { // down key
                App.service.tetoriminoManager.down();
            }
        },

        keyup: function(e) {
            this.pressing = false;
        }
    });

})();
