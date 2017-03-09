import { JSXWidget } from "./JSXWidget";

export class VizInstance extends JSXWidget.Component<any, any> {
    widget;

    refreshProps() {
        for (const key in this.props) {
            if (this.widget[key] && typeof this.widget[key] === "function") {
                this.widget[key](this.props[key]);
            }
        }
    }

    componentDidMount() {
        this.widget = this.props.instance
            .target(this.base)
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
        return <div style={this.props.style} />;
    }

    componentDidUpdate() {
        this.refreshProps();
        this.widget.render();
    }
}
