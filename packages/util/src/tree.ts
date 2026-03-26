export type TreeWalkAction = "abort" | "stepover" | void;

export class Tree<N extends object> {

    protected _root: N;
    protected _childrenOf: Map<N, N[]> = new Map();
    protected _parentOf: Map<N, N | undefined> = new Map();
    protected _nodes: Set<N> = new Set();

    constructor(root: N) {
        this._root = root;
        this._nodes.add(root);
        this._parentOf.set(root, undefined);
    }

    root(): N {
        return this._root;
    }

    size(): number {
        return this._nodes.size;
    }

    has(node: N): boolean {
        return this._nodes.has(node);
    }

    parent(node: N): N | undefined {
        this._assertNodeExists(node);
        return this._parentOf.get(node);
    }

    children(node: N): N[] {
        this._assertNodeExists(node);
        return this._childrenOf.get(node) || [];
    }

    addChild(parent: N, child: N, options: { reparent?: boolean, index?: number } = {}): void {
        this._assertNodeExists(parent);
        if (parent === child) {
            throw new Error("Cannot add node as its own child");
        }
        if (this._wouldCreateCycle(parent, child)) {
            throw new Error("Cycle detected");
        }

        const existingParent = this._parentOf.get(child);
        if (existingParent !== undefined && existingParent !== parent) {
            if (!options.reparent) {
                throw new Error("Child already has a parent");
            }
            this._detachFromParent(child);
        }

        // Ensure child is part of this tree
        if (!this._nodes.has(child)) {
            this._nodes.add(child);
        }

        let children = this._childrenOf.get(parent);
        if (!children) {
            children = [];
            this._childrenOf.set(parent, children);
        }
        if (children.indexOf(child) >= 0) {
            throw new Error("Child already exists");
        }

        const insertIndex = options.index === undefined ? children.length : options.index;
        if (insertIndex < 0 || insertIndex > children.length) {
            throw new Error("Index out of range");
        }
        children.splice(insertIndex, 0, child);
        this._parentOf.set(child, parent);
    }

    addChildren(parent: N, children: Iterable<N>, options: { reparent?: boolean } = {}): void {
        for (const child of children) {
            this.addChild(parent, child, options);
        }
    }

    remove(node: N, removeChildren: boolean = true): void {
        this._assertNodeExists(node);
        if (node === this._root) {
            throw new Error("Cannot remove root");
        }

        const parent = this._parentOf.get(node);
        if (parent === undefined) {
            throw new Error("Node has no parent");
        }

        const siblings = this._childrenOf.get(parent) || [];
        const idx = siblings.indexOf(node);
        if (idx < 0) {
            throw new Error("Parent does not contain node");
        }

        const nodeChildren = this._childrenOf.get(node) || [];
        siblings.splice(idx, 1);

        if (!removeChildren && nodeChildren.length) {
            // Reparent children to the removed node's parent at the same index
            siblings.splice(idx, 0, ...nodeChildren);
            for (const child of nodeChildren) {
                this._parentOf.set(child, parent);
            }
        } else if (removeChildren) {
            for (const child of nodeChildren) {
                this._deleteSubtree(child);
            }
        }

        this._childrenOf.delete(node);
        this._parentOf.delete(node);
        this._nodes.delete(node);
    }

    clear(): void {
        this._childrenOf.clear();
        this._parentOf.clear();
        this._nodes.clear();
        this._nodes.add(this._root);
        this._parentOf.set(this._root, undefined);
    }

    ancestors(node: N, options: { includeSelf?: boolean } = {}): N[] {
        this._assertNodeExists(node);
        const retVal: N[] = [];
        let curr: N | undefined = options.includeSelf ? node : this._parentOf.get(node);
        while (curr !== undefined) {
            retVal.push(curr);
            curr = this._parentOf.get(curr);
        }
        return retVal;
    }

    pathTo(node: N): N[] {
        const path = this.ancestors(node, { includeSelf: true });
        path.reverse();
        if (path[0] !== this._root) {
            throw new Error("Node is not connected to root");
        }
        return path;
    }

    depth(node: N): number {
        return this.pathTo(node).length - 1;
    }

    walk(visitor: (node: N) => TreeWalkAction): void;
    walk(node: N, visitor: (node: N) => TreeWalkAction): void;
    walk(nodeOrVisitor: N | ((node: N) => TreeWalkAction), maybeVisitor?: (node: N) => TreeWalkAction): void {
        const start = typeof nodeOrVisitor === "function" ? this._root : nodeOrVisitor;
        const visitor = typeof nodeOrVisitor === "function" ? nodeOrVisitor : maybeVisitor!;
        this._assertNodeExists(start);

        const _walk = (node: N): boolean => {
            const action = visitor(node);
            if (action === "abort") return true;
            if (action !== "stepover") {
                const children = this._childrenOf.get(node) || [];
                for (const child of children) {
                    if (_walk(child)) return true;
                }
            }
            return false;
        };
        _walk(start);
    }

    walkPostOrder(visitor: (node: N) => TreeWalkAction): void;
    walkPostOrder(node: N, visitor: (node: N) => TreeWalkAction): void;
    walkPostOrder(nodeOrVisitor: N | ((node: N) => TreeWalkAction), maybeVisitor?: (node: N) => TreeWalkAction): void {
        const start = typeof nodeOrVisitor === "function" ? this._root : nodeOrVisitor;
        const visitor = typeof nodeOrVisitor === "function" ? nodeOrVisitor : maybeVisitor!;
        this._assertNodeExists(start);

        const _walk = (node: N): boolean => {
            const children = this._childrenOf.get(node) || [];
            for (const child of children) {
                if (_walk(child)) return true;
            }
            const action = visitor(node);
            return action === "abort";
        };
        _walk(start);
    }

    private _assertNodeExists(node: N): void {
        if (!this._nodes.has(node)) {
            throw new Error("Node does not exist");
        }
    }

    private _detachFromParent(child: N): void {
        const parent = this._parentOf.get(child);
        if (parent === undefined) return;
        const siblings = this._childrenOf.get(parent);
        if (!siblings) return;
        const idx = siblings.indexOf(child);
        if (idx >= 0) siblings.splice(idx, 1);
        this._parentOf.delete(child);
    }

    private _wouldCreateCycle(newParent: N, child: N): boolean {
        if (!this._nodes.has(child)) return false;
        // Cycle if child is an ancestor of newParent
        let curr: N | undefined = newParent;
        while (curr !== undefined) {
            if (curr === child) return true;
            curr = this._parentOf.get(curr);
        }
        return false;
    }

    private _deleteSubtree(node: N): void {
        const children = this._childrenOf.get(node) || [];
        for (const child of children) {
            this._deleteSubtree(child);
        }
        this._childrenOf.delete(node);
        this._parentOf.delete(node);
        this._nodes.delete(node);
    }
}
