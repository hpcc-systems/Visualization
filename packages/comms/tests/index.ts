import { SMCService, WorkunitsService } from "../src/index.browser.ts";

export function testWUDetailsMeta(placeholder: string) {
    const wuService = new WorkunitsService({ baseUrl: "http://localhost:8010" });
    const wuPlaceholder = document.getElementById(placeholder);
    wuService.WUDetailsMeta({}).then(response => {
        const prefixSet = new Set<string>();
        response?.Properties?.Property.forEach(field => {
            if (field.Name) {
                // Find the first capital letter after the first character
                for (let i = 1; i < field.Name.length; i++) {
                    if (field.Name[i] === field.Name[i].toUpperCase() && field.Name[i] !== field.Name[i].toLowerCase()) {
                        prefixSet.add(field.Name.substring(0, i));
                        break;
                    }
                }
            }
        });
        console.info("WUDetailsMeta Response:", response);
        console.info("Prefixes:", Array.from(prefixSet).sort());
        if (wuPlaceholder) {
            wuPlaceholder.textContent = JSON.stringify(Array.from(prefixSet).sort(), null, 2) + "\n\n" + JSON.stringify(response, null, 2);
        }
    }).catch(err => {
        console.error("Error calling WUDetailsMeta:", err);
        if (wuPlaceholder) {
            wuPlaceholder.textContent = JSON.stringify(err, null, 2);
        }
    });

}

export function testSMCGlobalMetrics(placeholder: string) {
    const service = new SMCService({ baseUrl: "http://localhost:8010" });
    const placeholderElement = document.getElementById(placeholder);

    const end = new Date();
    const start = new Date(end);
    start.setUTCMonth(start.getUTCMonth() - 1);
    start.setUTCHours(0, 0, 0, 0);

    const request = {
        DateTimeRange: {
            Start: start.toISOString(),
            End: end.toISOString()
        }
    };
    service.GetNormalisedGlobalMetrics(request).then(response => {
        console.info("GetNormalisedGlobalMetrics Response:", response);
        if (placeholderElement) {
            placeholderElement.textContent = JSON.stringify(response, null, 2);
        }
    }).catch(err => {
        console.error("Error calling GetNormalisedGlobalMetrics:", err);
        if (placeholderElement) {
            placeholderElement.textContent = JSON.stringify(err, null, 2);
        }
    });
}