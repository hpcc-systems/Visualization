const ConcatSource = require("webpack-sources").ConcatSource;

module.exports = class ScopedDojoRequire {
    apply(compiler) {
        compiler.plugin("compilation", function (compilation) {
            compilation.mainTemplate.plugin("dojo global require", function (source) {
                return "";	// don't set global require
            });
            /*
                        compilation.mainTemplate.plugin("require", function (source) {
                            // This code, together with the 'render' plugin below, defines a scoped
                            // Dojo require variable for each AMD module so that referencing 'require' from
                            // within the module will yield the Dojo function.
                            return source.replace(/__webpack_require__\);/g, "__webpack_require__, req);");
                        });
            
                        compilation.moduleTemplate.plugin("render", function (source, module) {
                            var result = source;
                            if (module.isAMD) {
                                // Define a module scoped 'require' variable for AMD modules that references the
                                // the Dojo require function.
                                result = new ConcatSource();
                                result.add("var require = arguments[3];");
                                result.add(source);
                            }
                            return result;
                        });
            */
        });
    }
};