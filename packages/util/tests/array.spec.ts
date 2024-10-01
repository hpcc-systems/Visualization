import { describe, it, expect } from "vitest";

import { compare, compare2, find } from "@hpcc-js/util";

describe("Array", function () {
    it("find", function () {
        const testArr = [1, 2, 3, 4, 5, 66, 777, 8888, 9, 0];
        expect(find(testArr, row => row === 11)).to.be.undefined;
        expect(find(testArr, row => row === 66)).to.equal(66);
        expect(find(testArr, row => row === 0)).to.equal(0);
        expect(find(testArr, row => row === 1)).to.equal(1);
        const testArr2 = [{ id: 42, text: "meaning" }, { id: 43, text: "no meaning" }];
        expect(find(testArr2, row => row.id === 40)).to.be.undefined;
        expect(find(testArr2, row => row.id === 42)).to.equal(testArr2[0]);
        expect(find(testArr2, row => row.id === 43)).to.equal(testArr2[1]);
        expect(find([], row => row === 44)).to.be.undefined;
    });
    it("compare", function () {
        const baseArr = [1, 2, 3, 4, 5, 66, 777, 8888, 9, 0];
        let newArr: number[] = [];
        let diff = compare(baseArr, newArr);
        expect(diff.enter.length).to.equal(0);
        expect(diff.update.length).to.equal(0);
        expect(diff.exit.length).to.equal(baseArr.length);

        newArr = [3, 777];
        diff = compare(baseArr, newArr);
        expect(diff.enter.length).to.equal(0);
        expect(diff.update.length).to.equal(2);
        expect(diff.update).to.deep.equal([3, 777]);
        expect(diff.exit.length).to.equal(baseArr.length - 2);
        expect(diff.exit).to.deep.equal([1, 2, 4, 5, 66, 8888, 9, 0]);

        newArr = [3, 666, 8888];
        diff = compare(baseArr, newArr);
        expect(diff.enter.length).to.equal(1);
        expect(diff.enter).to.deep.equal([666]);
        expect(diff.update.length).to.equal(2);
        expect(diff.update).to.deep.equal([3, 8888]);
        expect(diff.exit.length).to.equal(baseArr.length - 2);
        expect(diff.exit).to.deep.equal([1, 2, 4, 5, 66, 777, 9, 0]);
    });
    it("compare2", function () {
        const baseArr = [{ id: 1, text: "one" }, { id: 2, text: "two" }, { id: 3, text: "three" }, { id: 4, text: "four" }, { id: 5, text: "five" }];
        let newArr: Array<{ id: number, text: string }> = [];
        let diff = compare(baseArr, newArr);
        expect(diff.enter.length).to.equal(0);
        expect(diff.update.length).to.equal(0);
        expect(diff.exit.length).to.equal(baseArr.length);

        diff = compare2(baseArr, newArr, row => row.id);
        expect(diff.enter.length).to.equal(0);
        expect(diff.update.length).to.equal(0);
        expect(diff.exit.length).to.equal(baseArr.length);

        newArr = [baseArr[2]];
        diff = compare(baseArr, newArr);
        expect(diff.enter.length).to.equal(0);
        expect(diff.update.length).to.equal(1);
        expect(diff.exit.length).to.equal(baseArr.length - 1);

        diff = compare2(baseArr, newArr, row => row.id);
        expect(diff.enter.length).to.equal(0);
        expect(diff.update.length).to.equal(1);
        expect(diff.exit.length).to.equal(baseArr.length - 1);

        newArr = [baseArr[2], baseArr[4], { id: 6, text: "six" }];
        diff = compare(baseArr, newArr);
        expect(diff.enter.length).to.equal(1);
        expect(diff.update.length).to.equal(2);
        expect(diff.exit.length).to.equal(baseArr.length - 2);

        diff = compare2(baseArr, newArr, row => row.id);
        expect(diff.enter.length).to.equal(1);
        expect(diff.update.length).to.equal(2);
        expect(diff.exit.length).to.equal(baseArr.length - 2);

        newArr = [baseArr[2], baseArr[4], { id: 1, text: "one" }];
        diff = compare(baseArr, newArr);
        expect(diff.enter.length).to.equal(1);
        expect(diff.update.length).to.equal(2);
        expect(diff.exit.length).to.equal(baseArr.length - 2);

        diff = compare2(baseArr, newArr, row => row.id);
        expect(diff.enter.length).to.equal(0);
        expect(diff.update.length).to.equal(3);
        expect(diff.exit.length).to.equal(baseArr.length - 3);

        newArr = [{ id: 3, text: "trez" }, baseArr[4], { id: 1, text: "uno" }];
        diff = compare(baseArr, newArr);
        expect(diff.enter.length).to.equal(2);
        expect(diff.update.length).to.equal(1);
        expect(diff.exit.length).to.equal(baseArr.length - 1);

        diff = compare2(baseArr, newArr, row => row.id);
        expect(diff.enter.length).to.equal(0);
        expect(diff.update.length).to.equal(3);
        expect(diff.exit.length).to.equal(baseArr.length - 3);
    });
});
