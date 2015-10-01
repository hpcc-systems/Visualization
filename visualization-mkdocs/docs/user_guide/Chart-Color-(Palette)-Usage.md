## Chart Color (Palette)

The HPCC Visualization Library provides a universal mechanism to control the color of data/columns within charts.
All charts that support colorization expose two methods (Publish Parameters):

* paletteID (set)
* useClonedPalette (boolean)

These Publish Parameters control an instance or singleton (depending on if useClonedPalette is set) of the Palette object that is attached to the widget and can be accessed via widget._\_palette_

<h4>PaletteID</h4>

Sets the Palette to use.

<h4>useClonedPalette</h4>

Creates a cloned instance of a Palette for a widget. This has the effect that each color (extraction/iteration) will be isolated to each widget instance instead of sharing a pool among all the widgets on a page.

##### Types of Palettes

There are two types of Palettes:

* Ordinal
* Rainbow

#### Ordinal Palette

An ordinal Palette is a predefined pool of colors, that are returned in the order they are defined (FIFO). Colors are extracted from the palette by iterating the data/column set; passing in each value to the _palette object.

Ex:
```javascript
this._chart.colors = this.columns().filter(function (d, i) { return i > 0; }).map(function (row) {
    return this._palette(row);
}, this);
```

#### Custom Ordinal Palette

Custom color schemes can be created using the following code:

```Palette.ordinal("MyPalette", [blue, red, green]); // MyPalette is registered globally```

and utilized with the following:

```widget.paletteID("MyPalette")```

#### Rainbow Palette

TODO

#### Custom Rainbow Palette

```var newPalette = Palette.rainbow("MyPalette", [blue, red], 100); // Generates 100 colors from blue to red```

and utilized with the following:

```widget.paletteID("MyPalette")```
