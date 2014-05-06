/* global describe, it */

(function () {
    'use strict';

    describe('CellModel', function () {
        describe('#validateCell', function () {
            it('should return error message if x is minus value', function () {
                expect(App.CellModel.validateCell(-1, 0)).to.be.a('string');
            });

            it('should return error message if y is minus value', function () {
                expect(App.CellModel.validateCell(0, -1)).to.be.a('string');
            });

            it('should return error message if x is more than max value', function () {
                var column = App.Config.col;
                expect(App.CellModel.validateCell(column, 0)).to.be.a('string');
            });

            it('should return error message if y is more than max value', function () {
                var row = App.Config.row;
                expect(App.CellModel.validateCell(0, row)).to.be.a('string');
            });

            it('should return empty value if this is valid cell', function () {
                expect(App.CellModel.validateCell(0, 0)).to.be.an('undefined');
            });
        });

        describe('#isSamePlace', function () {
            it('should return true if this cell is located in the same place', function () {
                var cell = {x: 1, y: 2};
                var model = new App.CellModel(cell);

                expect(model.isSamePlace(new App.CellModel(cell))).to.be.true();
            });

            it('should return false if this cell is not located in the same place', function () {
                var cell = {x: 1, y: 2};
                var model = new App.CellModel(cell);

                expect(model.isSamePlace(new App.CellModel({x:0, y:2}))).to.be.false();
            });
        });
    });
})();

