// eslint-disable-next-line no-undef
module.exports = function (api) {
    api.cache(false);

    const presets = [
        [
            "@babel/preset-env",
            {
                "corejs": { "version": "3.18" },
                "useBuiltIns": "usage",
                "targets": {
                    "ie": "11"
                }
            }
        ]
    ];

    const plugins = [
    ];

    return {
        presets,
        plugins
    };
};