function encodeMD(str: string) {
    return str
        .split("`").join("\\`")
        .split("$").join("\\$")
        ;
}

export function html(md: string): string {
    return `\
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>@hpcc-js/observable-md</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@hpcc-js/common/font-awesome/css/font-awesome.min.css">
    <style>
    body {
        padding: 0px;
        margin: 8px;
        background: white;
        color: black;
    }
    #placeholder {
        position: absolute;
        left: 8px;
        top: 8px;
        right: 8px;
        bottom: 8px;
        max-width: 480px;
    }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/observable-md/dist/index.full.js" type="text/javascript" charset="utf-8"></script>
    <script>
        var omdMod = window["@hpcc-js/observable-md"]
    </script>

</head>

<body onresize="doResize()">
    <div id="placeholder">
    </div>
    <script>
        var app = new omdMod.ObservableMD()
            .target("placeholder")
            .markdown(\`${encodeMD(md)}\`)
            ;

        doResize();

        function doResize() {
        if (app) {
            app
                .resize()
                .lazyRender()
                ;
        }
    }
    </script>
</body>

</html>
`;
}
