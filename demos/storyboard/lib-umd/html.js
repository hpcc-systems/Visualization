(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.html = void 0;
    function encodeMD(str) {
        return str
            .split("\\").join("\\\\")
            .split("`").join("\\`")
            .split("$").join("\\$");
    }
    function html(md, mode) {
        return "<!doctype html>\n<html>\n\n<head>\n    <meta charset=\"utf-8\">\n    <title>@hpcc-js/observable-md</title>\n    <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/@hpcc-js/common/font-awesome/css/font-awesome.min.css\">\n    <style>\n    body {\n        padding: 0px;\n        margin: 8px;\n        background: white;\n        color: black;\n    }\n    #placeholder {\n        position: absolute;\n        left: 8px;\n        top: 8px;\n        right: 8px;\n        bottom: 8px;\n        max-width: 480px;\n    }\n    </style>\n    <script src=\"https://cdn.jsdelivr.net/npm/@hpcc-js/observable-md/dist/index.full.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n    <script>\n        var omdMod = window[\"@hpcc-js/observable-md\"]\n    </script>\n\n</head>\n\n<body onresize=\"doResize()\">\n    <div id=\"placeholder\">\n    </div>\n    <script>\n        var app = new omdMod.Observable()\n            .target(\"placeholder\")\n            .showValues(false)\n            .mode(\"".concat(mode, "\")\n            .text(`").concat(encodeMD(md), "`)\n            ;\n\n        doResize();\n\n        function doResize() {\n        if (app) {\n            app\n                .resize()\n                .lazyRender()\n                ;\n        }\n    }\n    </script>\n</body>\n\n</html>\n");
    }
    exports.html = html;
});
//# sourceMappingURL=html.js.map