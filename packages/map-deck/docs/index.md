# @hpcc-js/map-deck

This package is a @hpcc-js wrapper around [Deck.GL](https://deck.gl/).

## MapBox API Key

These maps are reliant on maps provided by MapBox.  While there is a "default" access token burnt into the sources, it is liable to be changed and or hit usage limits **without notice**.

You can create your own access tokens by following these instructions:  [Creating access tokens with the Tokens API](https://docs.mapbox.com/help/tutorials/get-started-tokens-api/)

To provide your private MapBox API key, set the following global variable **before** instantiating any maps:

```
window.__hpcc_mapbox_apikey = "...my api key...";
```

## Contents

It contains the following widgets:
* [CircleLines](./CircleLines.md)
* [Polygons](./Polygons.md)
