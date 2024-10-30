import { defineConfig } from "vitepress";
import { observable } from "@hpcc-js/markdown-it-plugins";
import { eclLang } from "@hpcc-js/markdown-it-plugins/ecl-lang";

// https://vitepress.dev/reference/site-config
export default async () => {

    return defineConfig({
        title: "@hpcc-js/Visualization",
        description: "HPCC Systems JavaScript Library",
        base: "/Visualization/",
        srcDir: ".",
        rewrites: {
        },
        lastUpdated: true,
        themeConfig: {
            // https://vitepress.dev/reference/default-theme-config
            nav: [
                { text: "Home", link: "/" },
                { text: "Getting Started", link: "/README" },
            ],

            sidebar: [
                { text: "Getting Started", link: "/README" },
                {
                    text: "Documentation",
                    items: [
                    ]
                }
            ],

            socialLinks: [
                { icon: "github", link: "https://github.com/hpcc-systems/visualization" }
            ],

        },
        markdown: {
            // https://github.com/vuejs/vitepress/blob/main/src/node/markdown/markdown.ts
            config: md => {
                md.use(observable, { vitePress: true });
            },

            languages: [eclLang()],
        }

    });
};
