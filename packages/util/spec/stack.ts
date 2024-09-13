import { expect } from "chai";
import { Stack } from "@hpcc-js/util";

describe("Stack", function () {
    it("basic", function () {
        const stack = new Stack<string>();
        expect(stack).exist;
        expect(stack.depth()).to.equal(0);
        expect(stack.top()).to.be.undefined;
        stack.push("Hello");
        expect(stack.top()).to.equal("Hello");
        expect(stack.depth()).to.equal(1);
        stack.push("and");
        expect(stack.top()).to.equal("and");
        expect(stack.depth()).to.equal(2);
        stack.push("welcome!");
        expect(stack.top()).to.equal("welcome!");
        expect(stack.depth()).to.equal(3);
        expect(stack.pop()).to.equal("welcome!");
        expect(stack.depth()).to.equal(2);
        expect(stack.pop()).to.equal("and");
        expect(stack.depth()).to.equal(1);
        expect(stack.pop()).to.equal("Hello");
        expect(stack.depth()).to.equal(0);
        expect(stack.pop()).to.be.undefined;
        expect(stack.depth()).to.equal(0);
    });
});
