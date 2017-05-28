/*
import { Column } from "../chart/Column";
import { Pie } from "../chart/Pie";
import { JSXWidget } from "./JSXWidget";
import { VizComponent } from "./VizComponent";

import "./test.css";

export class Test extends JSXWidget {
    title: string = "Hello and Welcome";
    summary: string = "Lorem ipsum dolor sit amet, ut modo purto eam. Ne volutpat pericula qui, qui ut offendit postulant. Ut perfecto facilisis ocurreret his, eos in hinc bonorum prodesset. Et perfecto democritum vim, eu quas error salutatus cum. Reque labores has et, ne eum soleat quidam audiam.";

    update(domNode, _element) {
        const jsx = <div>
            <h1>{this.title}</h1>
            <i onClick={this.click}>{this.summary}</i>
            <p><VizComponent type={Pie} columns={this.columns()} data={this.data()} style="height:240px" /></p>
            <i>{this.summary}</i>
            <p><VizComponent type={Column} columns={this.columns()} data={this.data()} yAxisDomainLow="0" yAxisDomainHigh="200" style="height:320px" /></p>
            <i>{this.summary}</i>
        </div>;
        this.jsxRender(jsx, domNode);
    }

    click() {
        alert("woohoo");
    }
}
*/
