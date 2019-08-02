---
title: 03 - Visualization Overview
root: '/docs'
parents: ['Getting Started']
---

Every visualization share some common methods and patterns for creation, setting content and rendering.

## Creating and Rendering
The general pattern is:
* Create a `new` instance of the visualization
* `target` a DIV placeholder on the web page
* Set the `data` [(see below)](#the-common-data-pattern)
* `render`

```javascript
const myColChart = new Column()
    .target("someDivID")
    ...set some data...
    .render()
    ;
```

## The common data pattern
In general "data" is typically a spreadsheet style table and the loading is broken into two calls:
* `columns`:  The first row of a spreadsheet
* `data`: The remaining content of a spreadsheet

This is to facilitate asynchronous data laoding and updating (the `columns` call is typically made during page load, while `data` may arrive later).

### Simple Example
<!--DOCUSAURUS_CODE_TABS-->
<!--JavaScript-->
```js
const myColChart = new Column()
    .target("someDivID")
    .columns(["Subject", "2019", "2018", "2017"])
    .data([
        ["Math", 80, 76, 70],
        ["English", 60, 65, 63],
        ["Science", 88, 82, 66]
    ])
    .render()
    ;
```
<!--Run-->
<div id="placeholder" style="left:0px;margin-right:240px;height:240px">
</div>
<script>
    new window["@hpcc-js/chart"].Column()
        .target("placeholder")
        .columns(["Subject", "2019", "2018", "2017"])
        .data([
            ["Math", 80, 76, 70],
            ["English", 60, 65, 63],
            ["Science", 88, 82, 66]
        ])
        .render()
        ;
</script>

<!--END_DOCUSAURUS_CODE_TABS-->



### Async Example
```javascript
const myColChart = new Column()
    .target("someDivID")
    .columns(["Subject", "2019", "2018", "2017"])
    .render()
    ;

//  Simulate server call to fetch data  ---
setTimeout(() => {
    myColChart
        .data([
            ["Math", 80, 76, 70],
            ["English", 60, 65, 63],
            ["Science", 88, 82, 66]
        ])
        .lazyRender()
        ;
}, 5000);
```
Note:  `lazyRender` is a "debounced" call, that will only render once even when called several times in quick succesion.  Very useful for resize events.