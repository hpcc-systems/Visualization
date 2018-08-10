module.exports = {
    translateXXX: function (load) {
    },
    instantiateXXX: function (load) {
        if (!this.builder) {
            return JSON.parse(load.source);
        }
    },
    fetch: function (url) {
        return new Promise((resolve, reject) => {
            resolve(window["cm_editor"].text());
        });
    }
}