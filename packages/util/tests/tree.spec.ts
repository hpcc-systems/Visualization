import { describe, it, expect } from "vitest";

import { Tree } from "../src/index.ts";

describe("Tree", () => {

    it("addChild / parent / children", () => {
        const root = {};
        const a = {};
        const b = {};
        const tree = new Tree<object>(root);

        tree.addChild(root, a);
        tree.addChild(a, b);

        expect(tree.root()).to.equal(root);
        expect(tree.parent(root)).to.equal(undefined);
        expect(tree.parent(a)).to.equal(root);
        expect(tree.parent(b)).to.equal(a);
        expect(tree.children(root)).to.deep.equal([a]);
        expect(tree.children(a)).to.deep.equal([b]);
        expect(tree.children(b)).to.deep.equal([]);
        expect(tree.size()).to.equal(3);
    });

    it("throws on missing parent", () => {
        const root = {};
        const orphanParent = {};
        const child = {};
        const tree = new Tree<object>(root);
        expect(() => tree.addChild(orphanParent, child)).to.throw("Node does not exist");
    });

    it("throws on duplicate child", () => {
        const root = {};
        const a = {};
        const tree = new Tree<object>(root);
        tree.addChild(root, a);
        expect(() => tree.addChild(root, a)).to.throw("Child already exists");
    });

    it("reparenting is opt-in", () => {
        const root = {};
        const a = {};
        const b = {};
        const tree = new Tree<object>(root);

        tree.addChild(root, a);
        tree.addChild(root, b);
        tree.addChild(a, ({}));

        expect(() => tree.addChild(b, a)).to.throw("Child already has a parent");

        tree.addChild(b, a, { reparent: true });
        expect(tree.parent(a)).to.equal(b);
        expect(tree.children(root)).to.deep.equal([b]);
        expect(tree.children(b)).to.deep.equal([a]);
    });

    it("prevents cycles", () => {
        const root = {};
        const a = {};
        const b = {};
        const tree = new Tree<object>(root);

        tree.addChild(root, a);
        tree.addChild(a, b);

        expect(() => tree.addChild(b, a)).to.throw("Cycle detected");
    });

    it("remove subtree (default)", () => {
        const root = {};
        const a = {};
        const b = {};
        const c = {};
        const tree = new Tree<object>(root);

        tree.addChild(root, a);
        tree.addChild(a, b);
        tree.addChild(a, c);

        tree.remove(a);
        expect(tree.size()).to.equal(1);
        expect(tree.children(root)).to.deep.equal([]);
        expect(() => tree.children(a)).to.throw("Node does not exist");
        expect(() => tree.parent(b)).to.throw("Node does not exist");
    });

    it("remove node but keep children", () => {
        const root = {};
        const a = {};
        const b = {};
        const c = {};
        const tree = new Tree<object>(root);

        tree.addChild(root, a);
        tree.addChild(a, b);
        tree.addChild(a, c);

        tree.remove(a, false);
        expect(tree.children(root)).to.deep.equal([b, c]);
        expect(tree.parent(b)).to.equal(root);
        expect(tree.parent(c)).to.equal(root);
        expect(tree.size()).to.equal(3);
    });

    it("walk supports stepover and abort", () => {
        const root = { id: "root" };
        const a = { id: "a" };
        const b = { id: "b" };
        const c = { id: "c" };
        const tree = new Tree<typeof root>(root);

        tree.addChild(root, a);
        tree.addChild(a, b);
        tree.addChild(root, c);

        const preOrder: string[] = [];
        tree.walk(node => {
            preOrder.push(node.id);
        });
        expect(preOrder).to.deep.equal(["root", "a", "b", "c"]);

        const stepOver: string[] = [];
        tree.walk(node => {
            stepOver.push(node.id);
            if (node.id === "a") return "stepover";
        });
        expect(stepOver).to.deep.equal(["root", "a", "c"]);

        const aborted: string[] = [];
        tree.walk(node => {
            aborted.push(node.id);
            if (node.id === "b") return "abort";
        });
        expect(aborted).to.deep.equal(["root", "a", "b"]);
    });

    it("walkPostOrder visits children first", () => {
        const root = { id: "root" };
        const a = { id: "a" };
        const b = { id: "b" };
        const tree = new Tree<typeof root>(root);
        tree.addChild(root, a);
        tree.addChild(a, b);

        const postOrder: string[] = [];
        tree.walkPostOrder(node => {
            postOrder.push(node.id);
        });
        expect(postOrder).to.deep.equal(["b", "a", "root"]);
    });

    it("walkPostOrder from a specific node", () => {
        const root = { id: "root" };
        const a = { id: "a" };
        const b = { id: "b" };
        const c = { id: "c" };
        const tree = new Tree<typeof root>(root);
        tree.addChild(root, a);
        tree.addChild(a, b);
        tree.addChild(root, c);

        const postOrder: string[] = [];
        tree.walkPostOrder(a, node => {
            postOrder.push(node.id);
        });
        expect(postOrder).to.deep.equal(["b", "a"]);
    });

    it("walkPostOrder abort stops traversal", () => {
        const root = { id: "root" };
        const a = { id: "a" };
        const b = { id: "b" };
        const tree = new Tree<typeof root>(root);
        tree.addChild(root, a);
        tree.addChild(root, b);

        const visited: string[] = [];
        tree.walkPostOrder(node => {
            visited.push(node.id);
            if (node.id === "a") return "abort";
        });
        expect(visited).to.deep.equal(["a"]);
    });

    it("addChildren adds multiple children", () => {
        const root = {};
        const a = {};
        const b = {};
        const c = {};
        const tree = new Tree<object>(root);

        tree.addChildren(root, [a, b, c]);
        expect(tree.children(root)).to.deep.equal([a, b, c]);
        expect(tree.size()).to.equal(4);
    });

    it("addChild with index inserts at position", () => {
        const root = {};
        const a = {};
        const b = {};
        const c = {};
        const tree = new Tree<object>(root);

        tree.addChild(root, a);
        tree.addChild(root, c);
        tree.addChild(root, b, { index: 1 });
        expect(tree.children(root)).to.deep.equal([a, b, c]);
    });

    it("addChild with out-of-range index throws", () => {
        const root = {};
        const a = {};
        const tree = new Tree<object>(root);
        expect(() => tree.addChild(root, a, { index: -1 })).to.throw("Index out of range");
        expect(() => tree.addChild(root, a, { index: 5 })).to.throw("Index out of range");
    });

    it("addChild self-reference throws", () => {
        const root = {};
        const tree = new Tree<object>(root);
        expect(() => tree.addChild(root, root)).to.throw("Cannot add node as its own child");
    });

    it("cannot remove root", () => {
        const root = {};
        const tree = new Tree<object>(root);
        expect(() => tree.remove(root)).to.throw("Cannot remove root");
    });

    it("clear resets to root only", () => {
        const root = {};
        const a = {};
        const b = {};
        const tree = new Tree<object>(root);

        tree.addChild(root, a);
        tree.addChild(a, b);
        expect(tree.size()).to.equal(3);

        tree.clear();
        expect(tree.size()).to.equal(1);
        expect(tree.root()).to.equal(root);
        expect(tree.children(root)).to.deep.equal([]);
    });

    it("ancestors returns path to root", () => {
        const root = {};
        const a = {};
        const b = {};
        const tree = new Tree<object>(root);

        tree.addChild(root, a);
        tree.addChild(a, b);

        expect(tree.ancestors(b)).to.deep.equal([a, root]);
        expect(tree.ancestors(b, { includeSelf: true })).to.deep.equal([b, a, root]);
        expect(tree.ancestors(root)).to.deep.equal([]);
        expect(tree.ancestors(root, { includeSelf: true })).to.deep.equal([root]);
    });

    it("pathTo returns root-to-node path", () => {
        const root = {};
        const a = {};
        const b = {};
        const tree = new Tree<object>(root);

        tree.addChild(root, a);
        tree.addChild(a, b);

        expect(tree.pathTo(b)).to.deep.equal([root, a, b]);
        expect(tree.pathTo(root)).to.deep.equal([root]);
    });

    it("depth returns distance from root", () => {
        const root = {};
        const a = {};
        const b = {};
        const tree = new Tree<object>(root);

        tree.addChild(root, a);
        tree.addChild(a, b);

        expect(tree.depth(root)).to.equal(0);
        expect(tree.depth(a)).to.equal(1);
        expect(tree.depth(b)).to.equal(2);
    });

    it("has returns correct membership", () => {
        const root = {};
        const a = {};
        const outside = {};
        const tree = new Tree<object>(root);

        tree.addChild(root, a);
        expect(tree.has(root)).to.equal(true);
        expect(tree.has(a)).to.equal(true);
        expect(tree.has(outside)).to.equal(false);
    });

    it("walk from a specific node", () => {
        const root = { id: "root" };
        const a = { id: "a" };
        const b = { id: "b" };
        const c = { id: "c" };
        const tree = new Tree<typeof root>(root);
        tree.addChild(root, a);
        tree.addChild(a, b);
        tree.addChild(root, c);

        const visited: string[] = [];
        tree.walk(a, node => {
            visited.push(node.id);
        });
        expect(visited).to.deep.equal(["a", "b"]);
    });
});
