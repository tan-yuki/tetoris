(function() {
    'use strict';

    var tetoriminoTypeList = [
        'I', 'J', 'L', 'O', 'S', 'T', 'Z'
    ];

    App.TetoriminoModel = Backbone.Model.extend({

        fixed: false,

        positions: null,

        centerPosition: null,

        initialize: function() {
            this.positions = this.getStartPosition();
            this.centerPosition = this.getStartCenterPosition();
        },

        _action: function(vector) {
            if (this.fixed) {
                return true;
            }

            var positions = this.getPositionList();
            for (var i = 0, len = positions.length; i < len; i++) {
                var p = positions[i];

                var newX = p.x + vector.x;
                var newY = p.y + vector.y;

                if (!App.service.tetoriminoManager.canMoveTo(newX, newY)) {
                    return false;
                }
            }

            for (var i = 0, len = positions.length; i < len; i++) {
                var p = positions[i];
                p.x += vector.x;
                p.y += vector.y;
            }

            this.centerPosition.x += vector.x;
            this.centerPosition.y += vector.y;

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

        rotate: function() {
            var positions = this.getPositionList();
            var center = this.centerPosition;

            var newPositions = [];
            for (var i = 0, len = positions.length; i < len; i++) {
                var p = positions[i];

                // 中心を(0,0)と考えた座標系に
                // [ 0 , 1 ]
                // [-1 , 0 ]
                // の行列を掛ければいい

                // 中心を(0,0)へ移動
                var tmpX = p.x - center.x;
                var tmpY = p.y - center.y;

                // 回転行列を掛ける
                var newX = -tmpY;
                var newY = tmpX;

                // 中心を元の位置に戻す
                newX += center.x;
                newY += center.y;

                if (!App.service.tetoriminoManager.canMoveTo(newX, newY)) {
                    return false;
                }

                newPositions[i] = this.createPosition({
                    x:newX,
                    y:newY
                });
            }

            this.positions = newPositions;
            this.trigger('change');

            return true;
        },

        createPosition: function(options) {
            return {
                x: options.x,
                y: options.y
            };
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

        getStartCenterPosition: function() {
            throw new Error('Not implements getStartCenterPosition');
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
