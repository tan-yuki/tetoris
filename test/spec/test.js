/* global describe, it */

(function () {
    'use strict';

    describe('CellModel', function () {
        describe('#validateCell', function () {
            it('should return false if x is minus value', function () {
                expect(App.CellModel.validateCell(-1, 0)).to.be.false;
            });
        });
    });
})();
