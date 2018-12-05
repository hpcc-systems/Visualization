// import { Persist } from "@hpcc-js/other";
import { DockLayout, DockPanel, each, TabBar, Widget } from "@hpcc-js/phosphor-shim";
import { WidgetAdapter, WidgetAdapterArray } from "./WidgetAdapter";

export class PRenderer extends DockPanel.Renderer {
    _owner: PDockPanel;

    constructor() {
        super();
    }

    createTabBar(): TabBar<Widget> {
        const bar = super.createTabBar();
        bar.tabsMovable = this._owner.tabsMovable;
        return bar;
    }
}

export class PDockPanel extends DockPanel {
    private _tabsMovable: boolean;
    get tabsMovable(): boolean {
        return this._tabsMovable;
    }
    set tabsMovable(value: boolean) {
        this._tabsMovable = value;
        each(this.tabBars(), tabbar => tabbar.tabsMovable = value);
    }

    private _content: WidgetAdapterArray;
    private _contentMap: { [key: string]: WidgetAdapter };

    constructor(options: DockPanel.IOptions = {}) {
        options.renderer = options.renderer || new PRenderer();
        super(options);
        if (this["_renderer"] instanceof PRenderer) {
            this["_renderer"]._owner = this;
        }
        this._tabsMovable = true;
        this._content = WidgetAdapterArray.create();
        this._contentMap = {};
    }

    appendContent(wa: WidgetAdapter) {
        this._content.push(wa);
        this._contentMap[wa.widget.id()] = wa;
    }

    removeContent(wa: WidgetAdapter) {
        const idx = this._content.indexOf(wa);
        if (idx >= 0) {
            this._content.splice(idx, 1);
        }
        delete this._contentMap[wa.widget.id()];
        wa.dispose();
    }

    content(): WidgetAdapterArray {
        return this._content;
    }

    serializeWidget(widget: Widget): object {
        if (widget instanceof WidgetAdapter) {
            try {
                return {
                    __id: widget.widget.id()
                };
            } catch (e) {
                return {
                    exception: {
                        message: e.message,
                        stack: e.stack
                    }
                };
            }
        }
        return null;
    }

    deserializeWidget(layout: any): WidgetAdapter {
        let wa: WidgetAdapter = this._contentMap[layout.__id];
        if (wa) {
            // Persist.deserializeFromObject(wa.widget, layout);
        } else {
            wa = new WidgetAdapter(undefined, layout);
        }
        return wa;
    }

    serializeITabAreaConfig(config: DockLayout.ITabAreaConfig, deserialize: boolean): DockLayout.ITabAreaConfig {
        return {
            ...config,
            widgets: config.widgets.map(widget => deserialize ? this.deserializeWidget(widget) : this.serializeWidget(widget) as any)
        };
    }

    serializeISplitAreaConfig(config: DockLayout.ISplitAreaConfig, deserialize: boolean): DockLayout.ISplitAreaConfig {
        return {
            ...config,
            children: config.children.map(child => this.serializeAreaConfig(child, deserialize))
        };
    }

    serializeAreaConfig(config: DockLayout.AreaConfig, deserialize: boolean): DockLayout.AreaConfig {
        if (config) {
            switch (config.type) {
                case "tab-area":
                    return this.serializeITabAreaConfig(config, deserialize);
                case "split-area":
                    return this.serializeISplitAreaConfig(config, deserialize);
            }
        }
        return undefined;
    }

    saveLayout(): DockLayout.ILayoutConfig {
        return {
            main: this.serializeAreaConfig(super.saveLayout().main, false)
        };
    }

    restoreLayout(config: DockLayout.ILayoutConfig) {
        return super.restoreLayout({
            main: this.serializeAreaConfig(config.main, true)
        });
    }
}
