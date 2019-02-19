# @hpcc-js/common
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [EntityCard](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/common/EntityCard.js)
* [EntityPin](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/common/EntityPin.js)
* [EntityRect](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/common/EntityRect.js)
* [EntityVertex](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/common/EntityVertex.js)
* [Icon](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/common/Icon.js)
* [Shape](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/common/Shape.js)
* [TextBox](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/widget/Text%20Box.js)
* [TitleBar](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/common/TitleBar.js)
* [CanvasWidget](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/common/CanvasWidget.js)
* [HTMLWidget](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/common/HTMLWidget.js)
* [SVGWidget](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/common/SVGWidget.js)

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple EntityCard</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <script src="https://unpkg.com/@hpcc-js/util"></script>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
    </head>
    <body>
        <div id="placeholder" style="width:800px;height:600px;"></div>
        <script>
            console.log(window["@hpcc-js/common"].EntityCard);
            var chart = new window["@hpcc-js/common"].EntityCard()
                .target("placeholder")
                .icon("")
                .iconDiameter(55)
                .iconPaddingPercent(0)
                .title("Hello\nEntityCard")
                .titleFontSize(28)
                .titleColor("#ecf0f1")
                .description("This is an EntityCard description")
                .descriptionColor("#ecf0f1")
                .iconColor("#ecf0f1")
                .backgroundShape("rect")
                .backgroundColorFill("#2980b9")
                .backgroundColorStroke("#2c3e50")
                .annotationIcons([
                    { faChar: "A", image_colorFill: "#2c3e50", shape_colorFill: "#f1c40f", shape_colorStroke: "none" },
                    { faChar: "B", image_colorFill: "#2c3e50", shape_colorFill: "#e67e22", shape_colorStroke: "none" },
                    { faChar: "C", image_colorFill: "#2c3e50", shape_colorFill: "#e74c3c", shape_colorStroke: "none" }
                ])
                .render();
        </script>
    </body>
</html>
```

## Getting Started with @hpccjs
* _[Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start)_
* _[Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials)_
* _[Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html)_ ([alt](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html))
* _[Wiki](https://github.com/hpcc-systems/Visualization/wiki)_
