## Chart Color (Palette)

The HPCC Visualization Library provides a universal mechanism to control the color of data/columns within charts.
All charts that support colorization expose two methods (Publish Parameters):

* paletteID (set)
* useClonedPalette (boolean)

These Publish Parameters control an instance or singleton (depending on if useClonedPalette is set) of the Palette object that is attached to the widget and can be accessed via widget._\_palette_

There are two types of Palettes:

* Ordinal
* Rainbow

#### Ordinal

An ordinal Palette is a predefined pool of colors, that are returned in the order they are defined. Colors are extracted from the palette by iterating the data/column set; passing in each value to the _palette object.

Ex:
```javascript
this._chart.colors = this.columns().filter(function (d, i) { return i > 0; }).map(function (row) {
    return this._palette(row);
}, this);
```
