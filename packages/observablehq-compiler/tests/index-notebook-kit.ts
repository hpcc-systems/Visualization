import { Inspector } from "@observablehq/inspector";
import { Library } from "@observablehq/stdlib";
import { runtime, main } from "@observablehq/notebook-kit/runtime";
import { ohqnk } from "../src/index.ts";

const html = `\
<!doctype html>
<notebook theme="air">
  <title>Auto mark, heatmap</title>
  <script id="1" type="text/markdown">
    # Auto mark, heatmap

    Given two quantitative dimensions for *x* and *y*, the [auto](https://observablehq.com/plot/marks/auto) mark will create a heatmap from the [binned](https://observablehq.com/plot/transforms/bin) values.
  </script>
  <script id="5" type="module" pinned="">
    Plot.auto(olympians, { x: "weight", y: "height", color: "count" }).plot()
  </script>
  <script id="12" type="text/markdown">
    Given a quantitative dimension for *x* and an ordinal dimension for *y*, the [auto](https://observablehq.com/plot/marks/auto) mark will create a heatmap from the [binned](https://observablehq.com/plot/transforms/bin) *x* values, grouped by *y*.
  </script>
  <script id="11" type="module" pinned="">
    Plot.auto(olympians, { x: "weight", y: "sex", color: "count" }).plot()
  </script>
  <script id="9" type="text/markdown">
    This auto mark is equivalent to a rect & bin combination:
  </script>
  <script id="7" type="module" pinned="">
    Plot.rect(olympians, Plot.bin({ fill: "count" }, { x: "weight", y: "height" })).plot()
  </script>
  <script id="13" type="module" pinned="">
    Plot.rect(olympians, Plot.binX({ fill: "count" }, { x: "weight", y: "sex" })).plot()
  </script>
  <script id="10" type="module" pinned="">
    const olympians = FileAttachment("data/olympians.csv").csv({ typed: true }).then(display);
  </script>
</notebook>
`;

export function test() {

  const notebook = ohqnk.html2notebook(html);
  const compiled = ohqnk.compile(notebook);

  const placeholder = document.getElementById("placeholder");
  const main = compiled(runtime, name => {
    if (placeholder) {
      const div = globalThis?.document.createElement("div");
      placeholder.appendChild(div);
      return new Inspector(div);
    }

  });
}