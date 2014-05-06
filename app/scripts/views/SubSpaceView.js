(function() {
    'use strict';

    App.SubSpaceView = Backbone.View.extend({
        el: '#subspace',

        render: function() {
            var view = new App.NextHoldView({
                collection: App.service.tetoriminoManager.getTetoriminoCollection()
            });
            view.render();
            return this;
        }

    });
})();
