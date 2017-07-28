/**
 * A generic Stack
 */
export class Stack<T> {
    private stack: T[] = [];

    /**
     * Push element onto the stack
     *
     * @param e - element to push
     */
    push(e: T) {
        this.stack.push(e);
        return e;
    }

    /**
     * Pop element off the stack
     */
    pop(): T | undefined {
        return this.stack.pop();
    }

    /**
     * Top item on the stack
     *
     * @returns Top element on the stack
     */
    top(): T | undefined {
        return this.stack.length ? this.stack[this.stack.length - 1] : undefined;
    }

    /**
     * Depth of stack
     *
     * @returns Depth
     */
    depth(): number {
        return this.stack.length;
    }
}
