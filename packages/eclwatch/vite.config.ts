import { createHpccViteConfig } from "@hpcc-js/vite-plugins";
import pkg from "./package.json" with { type: "json" };

export default createHpccViteConfig(pkg, {
    configOverrides: {
        server: {
            proxy: {
                "/WsWorkunits": {
                    target: "http://localhost:8010",
                    changeOrigin: true
                }
            }
        }
    }
});