import react from "@vitejs/plugin-react";
import { createHpccViteConfig } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

export default createHpccViteConfig(pkg, {
    plugins: [react()],
    configOverrides: {
        resolve: {
            dedupe: ["react", "react-dom"]
        },
        define: {
            "process.env.NODE_ENV": JSON.stringify("production")
        }
    }
});