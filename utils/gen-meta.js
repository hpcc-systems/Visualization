/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`file:///${__dirname}/gen-meta.html`);

    const allMeta = await page.evaluate(() => {
        return JSON.stringify(window["hpcc-js"].allMeta(), null, 4);
    });
    fs.writeFileSync(path.join(__dirname, "../temp/web-components.meta.json"), allMeta);

    await browser.close();
})();

