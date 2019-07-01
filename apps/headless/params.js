var params = {};
var rawParams = window.location.href.split('?')[1] || "";
rawParams.split("&").forEach(function (str) {
    var name = str.split('=')[0];
    var val = str.split('=')[1];
    params[name] = val;
})
if (typeof params.columns === "undefined") {
    params.columns = ["Category", "Value"];
} else {
    params.columns = JSON.parse(params.columns.split('%22').join('"'));
}
if (typeof params.data === "undefined") {
    params.data = [
        ["A", 1],
        ["B", 2],
        ["C", 3]
    ];
} else {
    params.data = JSON.parse(params.data.split('%22').join('"'));
}
if (typeof params.package === "undefined") {
    params.package = "chart";
}
if (typeof params.widget === "undefined") {
    params.widget = "Pie";
}