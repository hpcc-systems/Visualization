let google = null;
let googlePromise: Promise<any> = null;

function initialize(): Promise<any> {
    if (googlePromise) return googlePromise;
    googlePromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://www.gstatic.com/charts/loader.js";
        document.body.appendChild(script);

        const intervalHandle = setInterval(() => {
            const root = window as any;
            if (root.google && root.google.charts && root.google.charts.load) {
                google = root.google;
                resolve(google);
                clearInterval(intervalHandle);
            }
        }, 50);
    });
    return googlePromise;
}

const googleCharts: { [key: string]: boolean } = {};
const googleChartsPromise: { [key: string]: any } = {};

export function isLoaded(packageName: string) {
    return googleCharts[packageName] === true;
}

export function load(packageName: string): Promise<any> {
    if (googleChartsPromise[packageName]) return googleChartsPromise[packageName];
    googleChartsPromise[packageName] = new Promise((resolve, reject) => {
        return initialize().then(() => {
            google.charts.load("45", { packages: [packageName] });
            google.charts.setOnLoadCallback(() => {
                googleCharts[packageName] = true;
                resolve();
            });
        });
    });
    return googleChartsPromise[packageName];
}

export function arrayToDataTable(data) {
    return google.visualization.arrayToDataTable(data);
}

export function createChart(library, type, domNode) {
    return new google[library][type](domNode);
}

export function createDataTable() {
    return new google.visualization.DataTable();
}

export function addListener(chart, event, callback) {
    google.visualization.events.addListener(chart, event, callback);
}

export function removeAllListeners(chart) {
    google.visualization.events.removeAllListeners(chart);
}
