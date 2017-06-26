

module.exports = function (source, map) {
    this.cacheable && this.cacheable();
    if (this.resourcePath.indexOf(".ts") === this.resourcePath.length - 3) {
        this.emitWarning("Expected '.css' extension:  css!" + this.resourcePath.substring(0, this.resourcePath.length - 3));
    }
    return source;
};
