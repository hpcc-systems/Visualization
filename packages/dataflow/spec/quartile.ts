import { expect } from "chai";
import { quartile, scalar } from "@hpcc-js/dataflow";

describe("quartile", () => {

    it("scalarActivity", () => {
        const calcQuartile = scalar(quartile());
        expect(calcQuartile([6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49])).to.deep.equal([6, 15, 40, 43, 49]);
        expect(calcQuartile([7, 15, 36, 39, 40, 41])).to.deep.equal([7, 15, 37.5, 40, 41]);
        expect(calcQuartile([1, 22, 133])).to.deep.equal([1, 1, 22, 133, 133]);
        expect(calcQuartile([2, 144, 33])).to.deep.equal([2, 2, 33, 144, 144]);
    });
});

