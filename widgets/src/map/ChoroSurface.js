(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/Surface", "./Choropleth", "../common/Palette"], factory);
    } else {
        root.ChoroSurface = factory(root.d3, root.Surface, root.Choropleth, root.Palette);
    }
}(this, function (d3, Surface, Choropleth, Palette, usStates) {
    function ChoroSurface() {
        Surface.call(this);

        this._title = "ChoroSurface";

        this._menu
            .data(Palette.brewer())
        ;
        var context = this;
        this._menu.click = function (d) {
            context._content
                .palette(d)
                .render(d)
            ;
        }

        this._choropleth = new Choropleth()
        ;
        this.content(this._choropleth);
    };
    ChoroSurface.prototype = Object.create(Surface.prototype);

    return ChoroSurface;
}));
