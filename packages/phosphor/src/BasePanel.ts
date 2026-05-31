import { HTMLWidget, Widget, Utility } from "@hpcc-js/common";
import { Widget as PWidget, IMessageHandler, IMessageHook, Message, MessageLoop } from "./phosphor-shim.ts";
import { Msg, WidgetAdapter, WidgetAdapterArray } from "./WidgetAdapter.ts";

export namespace BasePanel {
    export interface IAddWidgetOptions {
        /** Minimum size in pixels */
        minSize?: number;
        /** Preferred/default size in pixels — used as initial size hint */
        defaultSize?: number;
        /** Inner padding in pixels (default 8) */
        padding?: number;

        /** Reference widget for split/tab positioning */
        refWidget?: Widget;
    }
}

export abstract class BasePanel extends HTMLWidget implements IMessageHandler, IMessageHook {

    protected abstract _content: WidgetAdapterArray;

    constructor() {
        super();
        this._tag = "div";
        MessageLoop.installMessageHook(this, this);
    }

    getWidget(wa: PWidget): Widget | undefined {
        if (wa instanceof WidgetAdapter) {
            return wa.widget;
        }
    }

    getWidgetAdapter(widget: Widget): WidgetAdapter | null {
        let retVal = null;
        this._content.some(wa => {
            if (wa.widget === widget) {
                retVal = wa;
                return true;
            }
            return false;
        });
        return retVal;
    }

    protected _prevActive: Widget;
    active(): Widget {
        return this._prevActive;
    }

    //  Phosphor Messaging  ---
    protected _lazyLayoutChanged = Utility.debounce(async () => {
        this.layoutChanged();
    }, 1000);

    processMessage(msg: Message): void {
        switch (msg.type) {
            case Msg.WAActivateRequest.type:
                const wa = (msg as Msg.WAActivateRequest).wa;
                const widget = wa.widget;
                if (this._prevActive !== widget) {
                    this._prevActive = widget;
                    this.childActivation(widget, wa);
                }
                break;
            case Msg.WALayoutChanged.type:
                this._lazyLayoutChanged();
                break;
        }
    }

    messageHook(handler: IMessageHandler, msg: Message): boolean {
        if (handler === this) {
            this.processMessage(msg);
        }
        return true;
    }

    //  Events  ---
    childActivation(w: Widget, wa: WidgetAdapter) {
    }

    layoutChanged() {
    }

}
