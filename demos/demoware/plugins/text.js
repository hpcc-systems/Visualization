module.exports = {
    translate: function (load) {
        if (this.builder && this.transpiler) {
            load.metadata.format = 'esm';
            return 'exp' + 'ort var __useDefault = ' + JSON.stringify(load.source) + '; exp' + 'ort default __useDefault;';
        }

        load.metadata.format = 'amd';
        return 'def' + 'ine(function() {\nreturn ' + JSON.stringify(load.source) + ';\n});';
    }
}