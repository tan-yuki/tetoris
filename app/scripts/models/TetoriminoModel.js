(function() {
    'use strict';

    var tetoriminoTypeList = [
        'I', 'J', 'L', 'O', 'S', 'T', 'Z'
    ];

    App.TetoriminoModel = Backbone.Model.extend({

        fixed: false,

        positions: null,

        initialize: function() {
            this.positions = this.getStartPosition();
        },

        _action: function(vector) {
            if (this.fixed) {
                return true;
            }

            var positions = this.getPositionList();
            for (var i = 0, len = positions.length; i < len; i++) {
                var p = positions[i];
                if (!App.service.tetoriminoManager.canMoveTo(vector, p)) {
                    return false;
                }
            }

            for (var i = 0, len = positions.length; i < len; i++) {
                var p = positions[i];
                p.x += vector.x;
                p.y += vector.y;
            }

            this.trigger('change');
            return true;
        },

        down: function() {
            return this._action({x: 0, y: 1});
        },

        right: function() {
            return this._action({x: 1, y: 0});
        },

        left: function() {
            return this._action({x: -1, y: 0});
        },

        getCode: function() {
            throw new Error('Not implements getCode');
        },

        getPositionList: function() {
            return this.positions;
        },

        getStartPosition: function() {
            throw new Error('Not implements getStartPosition');
        },

        fix: function() {
            this.fixed = true;
            this.trigger('fix');
        },

        isFixed: function() {
            return this.fixed;
        },

        placedIn: function(x, y) {
            var positions = this.getPositionList();
            for (var i = 0, len = positions.length; i < len; i++) {
                var p = positions[i];
                if (p.x === x && p.y === y) {
                    return true;
                }
            }

            return false;
        }

    }, {
        factory: function() {
            var index = _.random(0, tetoriminoTypeList.length - 1);
            return new App.Tetorimino[tetoriminoTypeList[index]]();
        }
    });

})();
