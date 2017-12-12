// https://webmiscdev.risk.regn.net/brundajx/DASH2/demos/dashy/index_1.php
module.exports = {
    port: 8080,
    directory: "../../",
    rewrite: [
        {
            from: "/brundajx/DASH2/demos/dashy/lib-umd/*",
            to: "/demos/dashy/lib-umd/$1"
        }, {
            from: "/brundajx/DASH2/packages/*",
            to: "/packages/$1"
        }, {
            from: "/brundajx/DASH2/node_modules/*",
            to: "/node_modules/$1"
        }, {
            from: "/brundajx/DASH2/*",
            to: "https://webmiscdev.risk.regn.net/brundajx/DASH2/$1"
        }, {
            from: "/brundajx/DASH2/*",
            to: "https://webmiscdev.risk.regn.net/brundajx/DASH2/$1"
        }
    ]
}

