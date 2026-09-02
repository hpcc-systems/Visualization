import react from "@vitejs/plugin-react";
import { createHpccViteConfig } from "@hpcc-js/vite-plugins";
import pkg from "./package.json" with { type: "json" };

export default ({ command }: { command: string }) => createHpccViteConfig(pkg, {
    plugins: [react()],
    configOverrides: {
        resolve: {
            dedupe: ["react", "react-dom"]
        },
        // Only force production React builds for the actual bundle output. Forcing this during
        // test/serve breaks @vitejs/plugin-react's dev JSX runtime, since react/jsx-dev-runtime
        // only exports `jsxDEV` when NODE_ENV !== "production".
        ...(command === "build" ? {
            define: {
                "process.env.NODE_ENV": JSON.stringify("production")
            }
        } : {})
    }
});