var mainDiv = document.getElementById("main");
var app;

var debouncedResize = null;
var transitionDuration = 250;
var doRandom;
var doSave;
var doLoad;

require(["app/Main"], function (Main) {
    app = new Main()
        .url("http://10.173.147.1:8010/?QuerySetId=roxie&Id=claim_group_data_review_ex_srvc_rmap2.1&Widget=QuerySetDetailsWidget")
        .target("main")
        .render()
    ;

    var search = window.location.search.split("?");
    var entity = search[search.length - 1];
    if (!entity) {
        entity = "CLM00042945-C034";
    }
    if (entity.indexOf("CLM") === 0) {
        app.queryClaim(entity);
    } else if (entity.indexOf("POL") === 0) {
        app.queryPolicy(entity);
    } else if (entity.indexOf("VEH") === 0) {
        app.queryVehicle(entity);
    } else {
        app.queryPerson(entity);
    }

    doRandom = function () {
        var maxV = Math.floor(Math.random() * 100);
        var maxE = Math.floor(Math.random() * 100);
        for (var i = 0; i < maxV; ++i) {
            var fromV = app.getVertex("v" + i, "", i);
        }
        for (var i = 0; i < maxE; ++i) {
            var fromIdx = Math.floor(Math.random() * app.vertices.length);
            var toIdx = Math.floor(Math.random() * app.vertices.length);
            app.getEdge(app.vertices[fromIdx], app.vertices[toIdx]);
        }
        app.graph
            .data({ vertices: app.vertices, edges: app.edges, merge: true })
            .render()
            .layout(app.graph.layout(), transitionDuration)
        ;
    }

    doShowSelected = function (evt) {
        app.showSelection(evt.target.checked);
    };

    doFilterEntities = function (evt) {
        app.filterEntities(evt.target.value);
    };

    doSave = function () {
        savedData = app.serializeToObject();
    };

    doLoad = function () {
        app.deserializefromObject(savedData);
    };

    resize = function () {
        if (mainDiv) {
            mainDiv.style.width = window.innerWidth - 16 + "px";
            mainDiv.style.height = window.innerHeight - 16 - 40 + "px";
        }

        app
            .resize()
            .render()
        ;
    };
    debouncedResize = Main.prototype.debounce(function () {
        resize();
    }, 250);
    resize();
});

function doResize() {
    if (debouncedResize) {
        debouncedResize();
    }
}
