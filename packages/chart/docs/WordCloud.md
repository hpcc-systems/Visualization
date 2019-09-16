# WordCloud

<!--meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/WordCloud.ts#L11",
    "extends": "SVGWidget"
}
-->

A word cloud chart displays words with prominence relative to the word’s given weight. The larger the weight value, relative to the other word weights, the bigger it appears in the word cloud.

```sample-code
import { WordCloud } from "@hpcc-js/chart";

new WordCloud()
    .target("target")
    .columns(["Category", "Value"])
    .data([
        ["Apples", 34],
        ["Bananas", 55],
        ["Carrots", 89],
        ["Danishes", 144],
        ["Eggs", 60],
        ["Figs", 72],
        ["Ginger", 92],
        ["Hazelnut", 102],
        ["Incaberries", 52],
        ["Jambalaya", 42],
    ])
    .render()
    ;
```

Use _fontFamily_ to set the font family. _fontSizeFrom_ and _fontSizeTo_ can be used to control the range of font sizes from the minimum word weight to the maximum word weight.

```sample-code
import { WordCloud } from "@hpcc-js/chart";

new WordCloud()
    .target("target")
    .columns(["Category", "Value"])
    .data([
        ["Apples", 34],
        ["Bananas", 55],
        ["Carrots", 89],
        ["Danishes", 144],
        ["Eggs", 60],
        ["Figs", 72],
        ["Ginger", 92],
        ["Hazelnut", 102],
        ["Incaberries", 52],
        ["Jambalaya", 42],
    ])
    .fontFamily("Chilanka")
    .fontSizeFrom(12)
    .fontSizeTo(24)
    .render()
    ;
```

The rotation of the words are not bound to their weight. Use _angleFrom_ and _angleTo_ to set the minimum and maximum assigned angles. Use _angleCount_ to set the number of potential angles.

```sample-code
import { WordCloud } from "@hpcc-js/chart";

new WordCloud()
    .target("target")
    .columns(["Category", "Value"])
    .data([
        ["Apples", 34],
        ["Bananas", 55],
        ["Carrots", 89],
        ["Danishes", 144],
        ["Eggs", 60],
        ["Figs", 72],
        ["Ginger", 92],
        ["Hazelnut", 102],
        ["Incaberries", 52],
        ["Jambalaya", 42],
    ])
    .angleFrom(90)
    .angleTo(0)
    .angleCount(2)
    .render()
    ;
```

Below is an example with a single angle of 45 degrees and font sizes ranging from 18 to 28 pixels.

```sample-code
import { WordCloud } from "@hpcc-js/chart";

new WordCloud()
    .target("target")
    .columns(["Category", "Value"])
    .data([
        ["Apples", 34],
        ["Bananas", 55],
        ["Carrots", 89],
        ["Danishes", 144],
        ["Eggs", 60],
        ["Figs", 72],
        ["Ginger", 92],
        ["Hazelnut", 102],
        ["Incaberries", 52],
        ["Jambalaya", 42],
    ])
    .fontFamily("Chilanka")
    .angleFrom(45)
    .angleTo(45)
    .angleCount(1)
    .fontSizeFrom(18)
    .fontSizeTo(28)
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:WordCloud
```
