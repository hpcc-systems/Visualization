var TimeStrength = {
    columns: ["Date / Time", "Signal Strength"],
    data: [
        ["2019-07-22T09:08:56", 75],
        ["2018-07-22T09:08:56", 50]
    ]
};

var NICSummary = {
    columns: ["MAC", "Count"],
    data: [
        ["> -40", 3],
        ["> -60", 5],
        ["> -80", 8]
    ]
};

//  Line  ---
const lineChart = new hpccChart.Line()
    .xAxisType("time")
    .xAxisTypeTimePattern("%Y-%m-%dT%H:%M:%S")
    .xAxisFocus(true)
    ;

const lineCP = new hpccLayout.ChartPanel()
    .widget(lineChart)
    .columns(TimeStrength.columns)
    .data(TimeStrength.data)
    .title("Wifi Signal Strength")
    .legendVisible(false)
    ;

//  Summary Charts
const neg40Summary = new hpccChart.Summary()
    .columns(["Strength", "Count"])
    .data([["> -40", 3]])
    ;

const neg60Summary = new hpccChart.Summary()
    .columns(["Strength", "Count"])
    .data([["> -80", 8]])
    ;

const vList = new hpccLayout.VerticalList()
    .widgets([
        neg40Summary,
        neg60Summary
    ])
    ;

//  Bar Chart  ---
const bar = new hpccChart.Bar()
    .columns(TimeStrength.columns)
    .data(TimeStrength.data)
    ;

//  Pie Chart  ---
const pie = new hpccChart.Pie()
    .columns(TimeStrength.columns)
    .data(TimeStrength.data)
    .paletteID("Paired")
    ;


//  Hex Bin  ---
const radar = new hpccChart.Radar()
    .columns(TimeStrength.columns)
    .data(TimeStrength.data)
    ;

//  Dock Panel ---
var app = new hpccPhosphor.DockPanel()
    .target("placeholder")
    .addWidget(vList, "Line")
    .addWidget(lineCP, "Line", "split-right", vList)
    .addWidget(bar, "Bar", "split-bottom", lineCP)
    .addWidget(pie, "Pie", "tab-after", bar)
    .addWidget(radar, "Radar", "tab-after", bar)
    .render()
    ;

function doResize() {
    app
        .resize()
        .render()
        ;
}
