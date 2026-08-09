define([], function () {
    return {
        create: function (onChange) {
            var value = 0;
            onChange(value);
            return {
                increment: function (by) {
                    value += by || 1;
                    onChange(value);
                    return value;
                }
            };
        }
    };
});
