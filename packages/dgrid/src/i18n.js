define({
    load: function (name, req, onload, config) {
        if (config.isBuild) {
            onload();
        } else {
            req([name], function (value) {
                onload(value.root);
            });
        }
    }
});