## Reusing the Marshaller
_Or how do I take control of the Visualization Placement in MY web page_

* Create a new instance of the HipieDDL Marshaller:
```
this.marshaller = new HipieDDL.Marshaller();
```
* Initialize it with the URL to your DDL:
```
this.marshaller.url(this._url, function (response) {
    //  My DIV Creation will go here   ---
}
````
* Create your own DIV elements and place the HipieDDL created widgets within them:
```
for (var key in context.marshaller.dashboards) {
    var dashboard = context.marshaller.dashboards[key];
    for (var key2 in dashboard.visualizations) {
        var visualization = dashboard.visualizations[key2];
        if (visualization.widget) {
            var width = 640, height = 480;
            var myDiv = document.createElement("DIV");
            myDiv.setAttribute("style", "width: " + width + "px;height: " + height + "px;");
            myDiv.setAttribute("display", "inline-block");
            document.getElementById("htmlMarshaller").appendChild(myDiv);
            visualization.widget
                .pos({ x: width / 2, y: width / 2 })
                .size({ width: width, height: height })
                .target(myDiv)
                .render()
            ;
        }
    }
}
```
* Kick start the whole DDL process, by fetching the default data:
```
for (var key in dashboard.datasources) {
    dashboard.datasources[key].fetchData({}, true);
}
```

* Putting it all together:
```
this.marshaller = new HipieDDL.Marshaller();
this.marshaller.url(this._url, function (response) {
    for (var key in context.marshaller.dashboards) {
        var dashboard = context.marshaller.dashboards[key];
        for (var key2 in dashboard.visualizations) {
            var visualization = dashboard.visualizations[key2];
            if (visualization.widget) {
                var width = 640, height = 480;
                var myDiv = document.createElement("DIV");
                myDiv.setAttribute("style", "width: " + width + "px;height: " + height + "px;");
                myDiv.setAttribute("display", "inline-block");
                document.getElementById("htmlMarshaller").appendChild(myDiv);
                visualization.widget
                    .pos({ x: width / 2, y: width / 2 })
                    .size({ width: width, height: height })
                    .target(myDiv)
                    .render()
                ;
            }
        }
    }
    for (var key in dashboard.datasources) {
        dashboard.datasources[key].fetchData({}, true);
    }
    return;
});
```

## FAQs

_1. I'm hosting on RawGit but my webpage isn't updating._

It takes a few minutes, depending on your usage of the service, traffic on the server etc. so it should be up soon! 

_2._

