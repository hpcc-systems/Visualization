const samplePath = decodeURIComponent(location.search.slice(1)).replace(/^\.\/samples\//, "");
const sampleModules = import.meta.glob("../samples/**/*.js");
const loadSample = sampleModules[`../samples/${samplePath}`];
const loading = document.getElementById("loading");

function resizeSample() {
    const widget = (document.querySelector("#target .common_Widget") as HTMLElement & {
        __data__?: { resize(): { render(): void; }; };
    })?.__data__;
    widget?.resize().render();
}

if (loadSample) {
    loadSample().then(() => {
        loading?.remove();
        requestAnimationFrame(resizeSample);
    }).catch(() => {
        if (loading) {
            loading.innerText = "...fetching sample from GitHub (FAILED)...";
        }
    });
} else if (loading) {
    loading.innerText = "...fetching sample from GitHub (FAILED)...";
}