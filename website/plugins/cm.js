module.exports = {
    fetch: function (url) {
        const parts = url.address.split("/");
        const cmID = parts.pop();
        return new Promise((resolve, reject) => {
            const cmNode = document.getElementById(cmID);
            const cmWidget = cmNode.__data__;
            resolve(cmWidget.text().replace(`.target("target")`, `.target("${cmID}-sample")`));
        });
    }
}