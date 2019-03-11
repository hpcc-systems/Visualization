import { format as d3Format } from "d3-format";
import { StyledTable } from "./StyledTable";

export class StatsTable extends StyledTable {

    protected transformData() {
        const totalRow = [["Total", 0, 0]];
        const data = this.data();
        data.forEach(row => {
            totalRow[0][1] += row[1];
            totalRow[0][2] += row[2];
        });
        return data
            .concat(totalRow)
            .map(row => {
                return [
                    row[0],
                    this.secondColumnFormat_exists() ? d3Format(this.secondColumnFormat())(row[1]) : row[1],
                    this.thirdColumnFormat_exists() ? d3Format(this.thirdColumnFormat())(row[2]) : row[2]
                ];
            })
            ;
    }

    update(domNode, element) {
        this.tbodyColumnStyles_default([
            {
                "font-weight": "bold",
                "width": this.firstColumnWidth(),
                "text-align": "left"
            },
            {
                "width": this.secondColumnWidth(),
                "text-align": "right"
            },
            {
                "width": this.thirdColumnWidth(),
                "text-align": "right"
            }
        ]);
        this.evenRowStyles_default([
            {
                "font-weight": "bold",
                "width": this.firstColumnWidth(),
                "text-align": "left",
                "font-color": this.evenRowFontColor(),
                "background-color": this.evenRowBackgroundColor()
            },
            {
                "width": this.secondColumnWidth(),
                "text-align": "right",
                "font-color": this.evenRowFontColor(),
                "background-color": this.evenRowBackgroundColor()
            },
            {
                "width": this.thirdColumnWidth(),
                "text-align": "right",
                "font-color": this.evenRowFontColor(),
                "background-color": this.evenRowBackgroundColor()
            }
        ]);
        this.lastRowStyles_default({
            "font-weight": "bold"
        });
        super.update(domNode, element);
    }
}
StatsTable.prototype._class += " html_StatsTable";

export interface StatsTable {
    labelColor(): string;
    labelColor(_: string): this;
    primaryValueColor(): string;
    primaryValueColor(_: string): this;
    secondaryValueColor(): string;
    secondaryValueColor(_: string): this;
    evenRowFontColor(): string;
    evenRowFontColor(_: string): this;
    evenRowBackgroundColor(): string;
    evenRowBackgroundColor(_: string): this;
    firstColumnWidth(): string;
    firstColumnWidth(_: string): this;
    secondColumnWidth(): string;
    secondColumnWidth(_: string): this;
    thirdColumnWidth(): string;
    thirdColumnWidth(_: string): this;
    secondColumnFormat(): string;
    secondColumnFormat(_: string): this;
    secondColumnFormat_exists(): boolean;
    thirdColumnFormat(): string;
    thirdColumnFormat(_: string): this;
    thirdColumnFormat_exists(): boolean;
}
StatsTable.prototype.publish("labelColor", "#333", "html-color", "Color of the text in the first column");
StatsTable.prototype.publish("primaryValueColor", "#333", "html-color", "Color of the text in the second column");
StatsTable.prototype.publish("secondaryValueColor", "#333", "html-color", "Color of the text in the third column");
StatsTable.prototype.publish("evenRowBackgroundColor", "#333", "html-color", "Background color of the even rows");
StatsTable.prototype.publish("evenRowFontColor", "#333", "html-color", "Font color of the even rows");
StatsTable.prototype.publish("firstColumnWidth", "auto", "string", "CSS style applied as the 'width' for the first column (ex: 40px)");
StatsTable.prototype.publish("secondColumnWidth", "1%", "string", "CSS style applied as the 'width' for the second column (ex: 40px)");
StatsTable.prototype.publish("thirdColumnWidth", "1%", "string", "CSS style applied as the 'width' for the third column (ex: 40px)");
StatsTable.prototype.publish("secondColumnFormat", "$,.0f", "string", "d3-format specifier applied to the second column's values", undefined, {optional: true});
StatsTable.prototype.publish("thirdColumnFormat", null, "string", "d3-format specifier applied to the third column's values", undefined, {optional: true});
