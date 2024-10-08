# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

```js exec
Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: d3.randomNormal()})).plot();
```


```ecl
r := RECORD
  name: STRING;
  age: INT;
END;
OUTPUT([{name: 'Alice', age: 30}, {name: 'Bob', age: 40}], r);
```


```js exec echo
x = 40 + 2;
```

```js exec echo
z = x * 2;
```

```js
y = 40 + 3;
```
