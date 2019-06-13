import * as DDL2 from "./ddl2";

const classMappings: any = {
    c3chart_Bar: "chart_Bar",
    c3chart_Column: "chart_Column",
    c3chart_Pie: "chart_Pie",
    c3chart_Area: "chart_Area",
    c3chart_Line: "chart_Line",
    amchart_Bar: "chart_Bar",
    amchart_Column: "chart_Column",
    amchart_Pie: "chart_Pie",
    amchart_Area: "chart_Area",
    amchart_Line: "chart_Line",
    google_Bar: "chart_Bar",
    google_Column: "chart_Column",
    google_Pie: "chart_Pie",
    google_Area: "chart_Area",
    google_Line: "chart_Line",
    other_Table: "dgrid_Table"
};
const propertyMappings: any = {
    xAxisLabelRotation: [
        { name: "xAxisOverlapMode", transform: (n: any) => "rotate" },
        { name: "xAxisLabelRotation", transform: (n: any) => n }
    ],
    tooltipLabelColor: {
        name: "tooltipLabelColor"
    },
    tooltipSeriesColor: {
        name: "tooltipSeriesColor"
    },
    tooltipValueColor: {
        name: "tooltipValueColor"
    },
    tooltipValueFormat: {
        name: "tooltipValueFormat"
    },
    timePattern: {
        name: "xAxisTypeTimePattern"
    },
    smoothLines: {
        name: "interpolate",
        transform: (n: any) => {
            if (n === false) return "linear";
            return "catmullRom";
        }
    },
    holePercent: {
        name: "innerRadius"
    },
    flip: {
        name: "orientation",
        transform: (n: any) => n ? "vertical" : "horizontal"
    },
    bottomText: {
        name: "xAxisTitle"
    },
    xAxisTypeTimePattern: {
        name: "xAxisTypeTimePattern"
    },
    yAxisTypeTimePattern: {
        name: "yAxisTypeTimePattern"
    },
    valueFormat: {
        name: "tooltipValueFormat"
    },
    stacked: {
        name: "yAxisStacked"
    },
    showYGrid: {
        name: "yAxisGuideLines"
    },
    showXGrid: {
        name: "xAxisGuideLines"
    },
    showValueLabel: {
        name: "showValue"
    },
    low: {
        name: "yAxisDomainLow"
    },
    high: {
        name: "yAxisDomainHigh"
    },
    fillOpacity: {
        name: "interpolateFillOpacity"
    },
    areaFillOpacity: {
        name: "interpolateFillOpacity"
    },
    showToolbar: {
        name: "titleVisible"
    },
    showCSV: {
        name: "downloadButtonVisible"
    }
};

function findKeyVal(object: any, key: any, val: any): any {
    let value;

    for (const k in object) {
        if (k === key && object[k] === val) {
            value = object;
            break;
        }
        if (object[k] && typeof object[k] === "object") {
            value = findKeyVal(object[k], key, val);
            if (value !== undefined) {
                break;
            }
        }
    }
    return value;
}

function apply_to_dataviews(ddl2: DDL2.Schema, dermObj: any) {

    ddl2.dataviews.forEach(apply_to_dataview);

    function apply_to_dataview(dv: any) {
        const widgetId = dv.id;
        const dermPanelObj: any = findKeyVal(dermObj, "__id", widgetId);
        if (dermPanelObj) {
            const dermPanelProps: any = dermPanelObj.__properties;
            const dermWidgetObj: any = dermPanelObj.__properties.chart ? dermPanelObj.__properties.chart : dermPanelObj.__properties.widget;
            const dermWidgetProps: any = dermWidgetObj.__properties;
            apply_class_mapping(dermWidgetObj);
            apply_panel_property_mapping(dermPanelProps, dermWidgetProps);
            apply_widget_property_mapping(dermPanelProps, dermWidgetProps);
            if (dv.visualization.properties.chartType) {
                dv.visualization.properties.charttype = dv.visualization.properties.chartType;
            }
        } else {
            console.warn(widgetId + " not found in dermObj");
        }

        function apply_class_mapping(dermWidgetObj: any) {
            dv.visualization.__class = swap_with_supported_class(dermWidgetObj.__class);
            dv.visualization.properties.__class = "marshaller_VizChartPanel";
            if (!dv.visualization.properties.widget) dv.visualization.properties.widget = {};
            dv.visualization.properties.widget.__class = dv.visualization.__class;

            function swap_with_supported_class(_class: string): string {
                return classMappings[_class] ? classMappings[_class] : _class;
            }
        }
        function apply_panel_property_mapping(dermPanelProps: any, dermWidgetProps: any) {
            dv.visualization.title = dermPanelProps.title || "";
            dv.visualization.description = "";
            dv.visualization.visibility = dv.visualization.visibility === "flyout" ? "flyout" : "normal";
            dv.visualization.chartType = dv.visualization.__class.split("_")[1];
            for (const propName in dermPanelProps) {
                if (typeof propertyMappings[propName] !== "undefined") {
                    const newPropName = propertyMappings[propName].name;

                    if (typeof propertyMappings[propName].transform === "function") {
                        dv.visualization.properties[newPropName] = propertyMappings[propName].transform(dermPanelProps[propName]);
                    } else {
                        dv.visualization.properties[newPropName] = dermPanelProps[propName];
                    }

                }
            }
            if (dermWidgetProps && dermWidgetProps.showLegend && dv.visualization.properties) {
                dv.visualization.properties.legendVisible = true;
            }
        }
        function apply_widget_property_mapping(dermPanelProps: any, dermWidgetProps: any) {
            dv.visualization.title = dv.visualization.title || dermWidgetProps.title || "";
            dv.visualization.description = ""; // TODO - should this map to anything?
            dv.visualization.visibility = dv.visualization.visibility === "flyout" ? "flyout" : "normal";
            dv.visualization.chartType = dv.visualization.__class.split("_")[1];
            for (const propName in dermWidgetProps) {
                if (typeof propertyMappings[propName] !== "undefined") {
                    if (propertyMappings[propName] instanceof Array) {
                        propertyMappings[propName].forEach((p: any) => {
                            const newPropName = p.name;
                            dv.visualization.properties.widget[newPropName] = p.transform(dermWidgetProps[propName]);
                            if (typeof propertyMappings[propName].transform === "function") {
                                dv.visualization.properties.widget[newPropName] = propertyMappings[propName].transform(dermWidgetProps[propName]);
                            } else {
                                dv.visualization.properties.widget[newPropName] = dermWidgetProps[propName];
                            }
                        });
                    } else {
                        const newPropName = propertyMappings[propName].name;
                        dv.visualization.properties.widget[newPropName] = propertyMappings[propName].transform(dermWidgetProps[propName]);
                    }
                }
            }
        }
    }
}

type CellPosition = {
    id: string;
    position: [number, number, number, number];
};

type DDLProperties = {
    layout: CellPosition[]
};

function apply_to_properties_layout(ddl2: DDL2.Schema, dermObj: any) {
    const retVal: DDLProperties = {
        layout: []
    };
    if (!dermObj || !dermObj.__properties) return;
    dermObj.__properties.content.forEach((cell: any) => {
        const cellPosition: CellPosition = {
            // TODO - if "id" could be avoided then layouts could apply to any dashboard with the same number of widgets
            id: cell.__properties.widget.__id,
            position: [
                cell.__properties.gridCol,
                cell.__properties.gridRow,
                cell.__properties.gridColSpan,
                cell.__properties.gridRowSpan
            ]
        };
        retVal.layout.push(cellPosition);
    });
    return retVal;
}

export function upgrade(ddl2: DDL2.Schema, dermObj: any) {
    apply_to_dataviews(ddl2, dermObj);
    return apply_to_properties_layout(ddl2, dermObj);
}
