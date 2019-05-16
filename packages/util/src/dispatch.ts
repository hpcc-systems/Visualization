import { IObserverHandle } from "./observer";
import { root } from "./platform";

export type RquestAnimationFrame = (callback: FrameRequestCallback) => number | undefined;
export type CancelAnimationFrame = (handle: number) => void | undefined;

let requestAnimationFrame: RquestAnimationFrame;
// let cancelAnimationFrame: CancelAnimationFrame;

(function () {
    if (root.requestAnimationFrame) {
        requestAnimationFrame = root.requestAnimationFrame;
        // cancelAnimationFrame = root.cancelAnimationFrame;
    } else {
        let lastTime = 0;
        requestAnimationFrame = function (callback: FrameRequestCallback): number {
            const currTime = new Date().getTime();
            const timeToCall = Math.max(0, 16 - (currTime - lastTime));
            const id = setTimeout(() => callback(currTime + timeToCall), timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
        // cancelAnimationFrame = function (handle: number): void {
        //     clearTimeout(handle);
        // };
    }
})();

export class Message {

    get canConflate(): boolean { return false; }
    conflate(other: Message): boolean {
        return false;
    }

    void(): boolean {
        return false;
    }
}
type MessageConstructor<T extends Message> = new (...args: any[]) => T;

export type Callback = (messages: Message[]) => void;
export { IObserverHandle };

type ObserverAdapter<T extends Message = Message> = {
    id: number;
    type?: MessageConstructor<T>;
    callback: Callback;
};

export class Dispatch {

    private _observerID: number = 0;
    private _observers: ObserverAdapter[] = [];
    private _messageBuffer: Message[] = [];

    constructor() {
    }

    private observers(): ObserverAdapter[] {
        return this._observers;
    }

    private messages(): Message[] {
        const retVal: Message[] = [];
        this._messageBuffer.forEach(msg => {
            if (!retVal.some(msg2 => msg2.canConflate && msg2.conflate(msg))) {
                retVal.push(msg);
            }
        });
        return retVal;
    }

    private dispatchAll() {
        this.dispatch(this.messages());
        this.flush();
    }

    private dispatch(messages: Message[]) {
        if (messages.length === 0) return;
        this.observers().forEach(o => {
            const msgs = messages.filter(m => !m.void() && (o.type === undefined || m instanceof o.type));
            if (msgs.length) {
                o.callback(msgs);
            }
        });
    }

    hasObserver(): boolean {
        return this._observers.length > 0;
    }

    flush() {
        this._messageBuffer = [];
    }

    send(msg: Message) {
        this.dispatch([msg]);
    }

    post(msg: Message) {
        this._messageBuffer.push(msg);
        requestAnimationFrame(() => this.dispatchAll());
    }

    attach<T extends Message>(callback: Callback, type?: MessageConstructor<T>): IObserverHandle {
        const context = this;
        const id = ++this._observerID;
        this._observers.push({ id, type, callback });
        return {
            release() {
                context._observers = context._observers.filter(o => o.id !== id);
            },
            unwatch() {
                this.release();
            }
        };
    }
}
