import { defineConfig } from "vitepress";
import { observable } from "@hpcc-js/markdown-it-plugins";
import { eclLang } from "@hpcc-js/markdown-it-plugins/ecl-lang";

// https://vitepress.dev/reference/site-config
export default async () => {

    return defineConfig({
        title: "@hpcc-js/markdown-it-plugins",
        description: "ObservableHQ plugin for markdown-it",
        base: "/Visualization/markdown-it-plugins",
        srcDir: ".",
        rewrites: {
            'docs/index.md': 'index.md'
        },
        lastUpdated: true,
        themeConfig: {
            // https://vitepress.dev/reference/default-theme-config
            nav: [
                { text: "Home", link: "/" },
                { text: "Getting Started", link: "/README" },
                { text: "Documentation", link: "/docs/observablehq-markdown-it" },
            ],

            sidebar: [
                { text: "Getting Started", link: "/README" },
                {
                    text: "Documentation",
                    items: [
                        {
                            text: "markdown-it",
                            items: [
                                { text: "ObservableHQ", link: "/docs/observablehq-markdown-it" },
                            ]
                        },
                        {
                            text: "VitePress",
                            items: [
                                { text: "ObservableHQ", link: "/docs/observablehq-vitepress" },
                                { text: "ECL Code Highlighting", link: "/docs/ecl-vitepress" },
                                { text: "GH Stats", link: "/docs/gh-stats" },
                                {
                                    text: "Demo OBT",
                                    items: [
                                        { text: "Summary", link: "/docs/obt/summary" },
                                    ],
                                }
                            ]
                        }
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
