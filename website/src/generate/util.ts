import * as fs from "fs";
import * as marked from "marked";

if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
}

fs.readFile("docs/test.md", (err, data) => {
    const html = marked(data.toString());
    fs.writeFile("dist/test.html", html, "utf8", err => {
    });
});
