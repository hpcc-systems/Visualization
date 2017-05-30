import { JSXWidget } from "./JSXWidget";

export class VizInstance extends JSXWidget.Component<any, any> {
    widget;

    refreshProps() {
        for (const key in (this as any).props) {
            if (this.widget[key] && typeof this.widget[key] === "function") {
                this.widget[key]((this as any).props[key]);
            }
        }
    }

    componentDidMount() {
        this.widget = (this as any).props.instance
            .target((this as any).base)
            ;
        this.refreshProps();
        this.widget
            .render()
            ;
    }

    componentWillUnmount() {
        this.widget
            .target(null)
            .render()
            ;
    }

    render() {
        return <div style={(this as any).props.style} />;
    }

    componentDidUpdate() {
        this.refreshProps();
        this.widget.render();
    }
}
