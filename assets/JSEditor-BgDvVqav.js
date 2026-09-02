import{a as e}from"./dist-BqZRP-Ic.js";var t=`function foo(a, b) {
    return a + b;
}
function bar(c, d) {
    return foo(c, d) + (c * d);
}
`,n=0;new e().target(`target`).javascript(t).render(e=>{setInterval(function(){n++,n%2?e.highlightSubstring(`a`):e.removeAllHighlight()},1500)});
//# sourceMappingURL=JSEditor-BgDvVqav.js.map