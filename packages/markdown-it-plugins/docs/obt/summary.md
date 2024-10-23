# Summary

_Recent OBT run summary_

<div class="grid grid-cols-2">
  <div class="card">
    <h2>Number of OBT runs</h2>
    <span class="big">${data.runCount}</span>
    <span class="muted"> In the last ${d3.utcDay.count(since, Date.now())} days</span>
  </div>
  <div class="card">
    <h2>Total number of tests</h2>
    <span class="big">${numberFormat(data.total)}</span>
    <span class="muted"> taking ${durationFormat(data.seconds)}</span>
  </div>
</div>
<div class="grid grid-cols-4">
  <div class="card">
    <h2>Passed</h2>
    <span class="big green">${pctFormat(data.pass/data.total)}</span>
  </div>
  <div class="card">
    <h2>Failed</h2>
    <span class="big red">${pctFormat(data.fail/data.total)}</span>
  </div>
  <div class="card">
    <h2>Error</h2>
    <span class="big red">${pctFormat(data.error/data.total)}</span>
  </div>
  <div class="card">
    <h2>Timeout</h2>
    <span class="big yellow">${pctFormat(data.timeout/data.total)}</span>
  </div>
</div>
<div class="grid grid-cols-1">
  <div class="card">
    <h2>Totals</h2>
    <span>${taskPlot(taskPlotData)}</span>
  </div>
</div>
<div class="grid grid-cols-1">
  <div class="card">
    <h2>Branches</h2>
    <span>${taskPlot(branchesPlotData, "branch")}</span>
  </div>
</div>
<div class="grid grid-cols-1">
  <div class="card">
    <h2>Build systems</h2>
    <span>${taskPlot(buildSystemsPlotData, "buildSystem")}</span>
  </div>
</div>

```js exec hide
//  Task Plot ---
function taskData(root) {
    return Object.keys(root).map(key => {
        const task = root[key];
        return {
            name:key,
            seconds: task.seconds ?? 0,
            color: (task.fail ?? 0) > 0 || (task.error ?? 0) > 0 ? red : 
                    (task.timeout ?? 0) > 0 ? yellow : green
        };
    });
}
taskPlotData = taskData(data.tasks);

branchesPlotData = [];
Object.keys(data.branches).forEach(branch => {
    taskData(data.branches[branch].tasks).forEach(row=>{
        row.branch = branch;
        branchesPlotData.push(row);
    });
});

buildSystemsPlotData = [];
Object.keys(data.buildSystems).forEach(buildSystem => {
    taskData(data.buildSystems[buildSystem].tasks).forEach(row=>{
        row.buildSystem = buildSystem;
        buildSystemsPlotData.push(row);
    });
});

function taskPlot(data, facet = "") {
    return Plot.plot({
        fill: {legend: true},
        marginLeft: 180,
        marginRight: facet ? 80 : 0,
        marks: [
            Plot.barX(data, {
                x: "seconds",
                y: "name",
                fy: facet,
                fill: "color",
                stroke: "color"
            })
        ]
    });
}
```

```js exec hide
//  Global Data + Functions ---
data = globalThis.__data;
since =  new Date(data.since);
numberFormat = d3.format(",");

_pctFormat = d3.format(".2~%");
function pctFormat(value) {
  const retVal = _pctFormat(value);
  if (value > 0 && retVal === "0%") {
    return "< 0.01%";
  }else if (value < 1 && retVal === "100%") {
    return ">99.99%";
  }
  return retVal;
}

function durationFormat(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
}
```

```js exec hide
//  Theme Colors ---
div = document.querySelector("div");
style = getComputedStyle(div);
red = style.getPropertyValue("--theme-red");
green = style.getPropertyValue("--theme-green");
yellow = style.getPropertyValue("--theme-yelow");
```

<script setup>
import { data } from './summary.data.ts';
globalThis.__data = data;
</script>
