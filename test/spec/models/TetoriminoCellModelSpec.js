/* global describe, it */

(function () {
    'use strict';

    describe('TetoriminoCellModel', function () {
        describe('#moveTo', function () {
            it('should update the place of this cell', function () {
                var model = new App.TetoriminoCellModel({x: 0, y: 1});
                model.moveTo({x: 2, y: 3});

                expect(model.get('x')).to.be.equal(2);
                expect(model.get('y')).to.be.equal(4);
            });
        });

        describe('#moveTo', function () {

            it('should return true if this cell is placed in specified cordinate', function () {
                var model = new App.TetoriminoCellModel({x: 0, y: 1});

                expect(model.placedIn(0, 1)).to.be.true;
            });

            it('should return false if this cell is not placed in specified cordinate', function () {
                var model = new App.TetoriminoCellModel({x: 0, y: 1});

                expect(model.placedIn(0, 2)).to.be.false;
            });
        });
    });
})();

