(function() {
    'use strict';

    var tetoriminoTypeList = [
        'I', 'J', 'L', 'O', 'S', 'T', 'Z'
    ];

    App.TetoriminoModel = Backbone.Model.extend({

        fixed: false,

        /**
         * @var App.TetoriminoCellCollection
         */
        positions: null,

        /**
         * @var App.TetoriminoCellModel
         */
        centerPosition: null,

        initialize: function() {
            this.positions = this.createStartPositions();
            this.centerPosition = this.createStartCenterPosition();
        },

        _action: function(vector) {
            if (this.fixed) {
                return true;
            }

            // 移動できるかをチェック
            var positions = this.positions;

            if (!positions.canMoveTo(vector)) {
                return false;
            }

            // 移動できる場合は実際に移動
            positions.moveTo(vector);

            // 中心の位置も変更
            this.centerPosition.moveTo({
                x: vector.x,
                y: vector.y
            });

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
            var positions = this.positions;
            var center = this.centerPosition;

            var newPositions = positions.map(_.bind(function(p) {
                // 中心を(0,0)と考えた座標系に
                // [ 0 , 1 ]
                // [-1 , 0 ]
                // の行列を掛ければいい

                // 中心を(0,0)へ移動
                var tmpX = p.get('x') - center.get('x');
                var tmpY = p.get('y') - center.get('y');

                // 回転行列を掛ける
                var newX = -tmpY;
                var newY = tmpX;

                // 中心を元の位置に戻す
                newX += center.get('x');
                newY += center.get('y');

                if (!App.service.tetoriminoManager.canMoveTo(newX, newY)) {
                    return false;
                }

                return this.createPosition({
                    x:newX,
                    y:newY
                });
            }, this));

            // 一つでもfalseの要素があった場合は失敗
            if (!_.every(newPositions)) {
                return false;
            }

            this.positions.reset(newPositions, {silent: true});
            this.trigger('change');

            return true;
        },

        createPosition: function(options) {
            return new App.TetoriminoCellModel({
                x: options.x,
                y: options.y,
                code: this.getCode()
            });
        },

        getCode: function() {
            throw new Error('Not implements getCode');
        },

        getStartCell: function() {
            throw new Error('Not implements getStartCell');
        },

        getStartCenterCell: function() {
            throw new Error('Not implements getStartCenterCell');
        },

        createStartPositions: function() {
            var code = this.getCode();
            var cells = _.map(this.getStartCell(), function(c) {
                c.code = code;
                return c;
            });
            return new App.TetoriminoCellCollection(cells);
        },

        createStartCenterPosition: function() {
            var code = this.getCode();
            var cell = this.getStartCenterCell();

            cell.code = code;

            return new App.TetoriminoCellModel(cell);
        },

        fix: function() {
            this.fixed = true;
            this.trigger('fix');
        },

        isFixed: function() {
            return this.fixed;
        },

        getPositions: function() {
            return this.positions;
        },

        placedIn: function(x, y) {
            return this.positions.exists(x, y);
        }

    }, {
        factory: function() {
            var index = _.random(0, tetoriminoTypeList.length - 1);
            return new App.Tetorimino[tetoriminoTypeList[index]]();
        }
    });

})();
