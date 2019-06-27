import { isArray } from "@hpcc-js/util";
import { ascending as d3Ascending, descending as d3Descending } from "d3-array";
import { select as d3Select } from "d3-selection";
import { timeFormat as d3TimeFormat } from "d3-time-format";

function _naturalSort(a, b, order, idx, sortCaseSensitive) {
    const re = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi;
    const sre = /(^[ ]*|[ ]*$)/g;
    const dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
    const ore = /^0/;
    const i = function (s) { return !sortCaseSensitive && ("" + s).toLowerCase() || "" + s; };
    // convert all to strings strip whitespace
    const x = i(idx ? a[idx] : a).replace(sre, "") || "";
    const y = i(idx ? b[idx] : b).replace(sre, "") || "";
    // chunk/tokenize
    const xN = x.replace(re, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0");
    const yN = y.replace(re, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0");
    // numeric or date detection
    const xD = (xN.length !== 1 && x.match(dre) && Date.parse(x));
    const yD = xD && y.match(dre) && Date.parse(y) || null;
    let oFxNcL;
    let oFyNcL;
    // first try and sort Hex codes or Dates
    if (yD) {
        if (xD < yD) {
            return order === "ascending" ? -1 : 1;
        } else if (xD > yD) {
            return order === "ascending" ? 1 : -1;
        }
    }
    // natural sorting through split numeric strings and default strings
    for (let cLoc = 0, numS = Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
        // find floats not starting with "0", string or 0 if not defined (Clint Priest)
        oFxNcL = !(xN[cLoc] || "").match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
        oFyNcL = !(yN[cLoc] || "").match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
        // handle numeric vs string comparison - number < string - (Kyle Adams)
        if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
            return (isNaN(oFxNcL)) ? 1 : -1;
        } else if (typeof oFxNcL !== typeof oFyNcL) {
            // rely on string comparison if different types - i.e. "02" < 2 != "02" < "2"
            oFxNcL += "";
            oFyNcL += "";
        }
        if (oFxNcL < oFyNcL) { return order === "ascending" ? -1 : 1; }
        if (oFxNcL > oFyNcL) { return order === "ascending" ? 1 : -1; }
    }
    return 0;
}

//  Selection Bag(s)  ---
export class SelectionBase {
    protected __widget;
    private __svgGlowID: string;

    constructor(widget) {
        //  Can't import Widget or SVGWidget as it breaks AMD loading...
        this.__widget = widget;
    }

    svgGlowID(): string {
        if (this.__svgGlowID === undefined) {
            this.__svgGlowID = this.__widget.svgGlowID && this.__widget.svgGlowID() || "";
        }
        return this.__svgGlowID;
    }
}

export class SelectionBag extends SelectionBase {
    items;
    constructor(widget) {
        super(widget);
        this.items = {};
    }

    clear() {
        for (const key in this.items) {
            this.items[key].element()
                .classed("selected", false)
                .attr("filter", null)
                ;
        }
        this.items = {};
    }

    isEmpty() {
        for (const _key in this.items) { // jshint ignore:line
            return false;
        }
        return true;
    }

    append(item) {
        this.items[item._id] = item;
        item.element()
            .classed("selected", true)
            .attr("filter", this.svgGlowID() ? `url(#${this.svgGlowID()})` : null)
            ;
    }

    remove(item) {
        this.items[item._id].element()
            .classed("selected", false)
            .attr("filter", null)
            ;
        delete this.items[item._id];
    }

    isSelected(item) {
        return this.items[item._id] !== undefined;
    }

    get() {
        const retVal = [];
        for (const key in this.items) {
            retVal.push(this.items[key]);
        }
        return retVal;
    }

    set(itemArray) {
        this.clear();
        itemArray.forEach(function (item) {
            this.append(item);
        }, this);
    }

    click = function (item, d3Event) {
        if (d3Event.ctrlKey) {
            if (this.items[item._id]) {
                this.remove(item);
            } else {
                this.append(item);
            }
        } else {
            this.clear();
            this.append(item);
        }
    };
}

export class SimpleSelection extends SelectionBase {
    constructor(widget, widgetElement, skipBringToTop?) {
        super(widget);
        this.widgetElement(widgetElement);
        this.skipBringToTop(skipBringToTop);
    }

    _widgetElement;
    widgetElement(_?) {
        if (!arguments.length) return this._widgetElement;
        this._widgetElement = _;
        return this;
    }

    _skipBringToTop;
    skipBringToTop(_) {
        if (!arguments.length) return this._skipBringToTop;
        this._skipBringToTop = _;
        return this;
    }

    _initialSelection;
    enter(elements) {
        const context = this;
        elements
            .each(function (d) {
                const selected = context._initialSelection ? context._initialSelection.indexOf(JSON.stringify(d)) >= 0 : false;
                d3Select(this)
                    .classed("selected", selected)
                    .classed("deselected", !selected)
                    .attr("filter", context.svgGlowID() && selected ? `url(#${context.svgGlowID()})` : null)
                    ;
            })
            .on("click.SimpleSelection", function () {
                context.click(this);
            })
            .on("mouseover.SimpleSelection", function () {
                context.mouseOver(this);
            })
            .on("mouseout.SimpleSelection", function () {
                context.mouseOut(this);
            })
            ;
    }
    click(domNode): boolean {
        if (!this._skipBringToTop) {
            domNode.parentNode.appendChild(domNode);
        }
        const element = d3Select(domNode);
        const wasSelected = element.classed("selected");
        this._widgetElement.selectAll(".selected")
            .classed("selected", false)
            .classed("deselected", true)
            .attr("filter", null)
            ;
        if (!wasSelected) {
            element
                .classed("selected", true)
                .classed("deselected", false)
                .attr("filter", this.svgGlowID() ? `url(#${this.svgGlowID()})` : null)
                ;
        }
        return !wasSelected;
    }
    mouseOver(domNode) {
        d3Select(domNode)
            .classed("over", true)
            ;
    }
    mouseOut(domNode) {
        d3Select(domNode)
            .classed("over", null)
            ;
    }
    selected(domNode) {
        return d3Select(domNode).classed("selected");
    }
    selection(_) {
        if (!arguments.length) {
            const retVal = [];
            if (this._widgetElement) {
                this._widgetElement.selectAll(".selected")
                    .each(function (d) { retVal.push(JSON.stringify(d)); })
                    ;
            }
            return retVal;
        }
        if (this._widgetElement) {
            const context = this;
            this._widgetElement.selectAll(".selected,.deselected")
                .each(function (d) {
                    const selected = _.indexOf(JSON.stringify(d)) >= 0;
                    d3Select(this)
                        .classed("selected", selected)
                        .classed("deselected", !selected)
                        .attr("filter", context.svgGlowID() ? `url(#${context.svgGlowID()})` : null)
                        ;
                })
                ;
        } else {
            this._initialSelection = _;
        }
        return this;
    }
}

export function SimpleSelectionMixin(skipBringToTop) {
    this._selection = new SimpleSelection(this, null, skipBringToTop);
}

SimpleSelectionMixin.prototype.serializeState = function () {
    return {
        selection: this._selection.selection(),
        data: this.data()
    };
};

SimpleSelectionMixin.prototype.deserializeState = function (state) {
    if (state) {
        this._selection.selection(state.selection);
        if (state.data) {
            this.data(state.data);
        }
    }
    return this;
};

const perf: any = window.performance;
const now = perf && (perf.now || perf.mozNow || perf.msNow || perf.oNow || perf.webkitNow);

export function faCode(key) {
    const faCodeMap = {"fa-500px": "", "fa-address-book": "", "fa-address-book-o": "", "fa-address-card": "", "fa-address-card-o": "", "fa-adjust": "", "fa-adn": "", "fa-align-center": "", "fa-align-justify": "", "fa-align-left": "", "fa-align-right": "", "fa-amazon": "", "fa-ambulance": "", "fa-american-sign-language-interpreting": "", "fa-anchor": "", "fa-android": "", "fa-angellist": "", "fa-angle-double-down": "", "fa-angle-double-left": "", "fa-angle-double-right": "", "fa-angle-double-up": "", "fa-angle-down": "", "fa-angle-left": "", "fa-angle-right": "", "fa-angle-up": "", "fa-apple": "", "fa-archive": "", "fa-area-chart": "", "fa-arrow-circle-down": "", "fa-arrow-circle-left": "", "fa-arrow-circle-o-down": "", "fa-arrow-circle-o-left": "", "fa-arrow-circle-o-right": "", "fa-arrow-circle-o-up": "", "fa-arrow-circle-right": "", "fa-arrow-circle-up": "", "fa-arrow-down": "", "fa-arrow-left": "", "fa-arrow-right": "", "fa-arrow-up": "", "fa-arrows": "", "fa-arrows-alt": "", "fa-arrows-h": "", "fa-arrows-v": "", "fa-asl-interpreting": "", "fa-assistive-listening-systems": "", "fa-asterisk": "", "fa-at": "", "fa-audio-description": "", "fa-automobile": "", "fa-backward": "", "fa-balance-scale": "", "fa-ban": "", "fa-bandcamp": "", "fa-bank": "", "fa-bar-chart": "", "fa-bar-chart-o": "", "fa-barcode": "", "fa-bars": "", "fa-bath": "", "fa-bathtub": "", "fa-battery": "", "fa-battery-0": "", "fa-battery-1": "", "fa-battery-2": "", "fa-battery-3": "", "fa-battery-4": "", "fa-battery-empty": "", "fa-battery-full": "", "fa-battery-half": "", "fa-battery-quarter": "", "fa-battery-three-quarters": "", "fa-bed": "", "fa-beer": "", "fa-behance": "", "fa-behance-square": "", "fa-bell": "", "fa-bell-o": "", "fa-bell-slash": "", "fa-bell-slash-o": "", "fa-bicycle": "", "fa-binoculars": "", "fa-birthday-cake": "", "fa-bitbucket": "", "fa-bitbucket-square": "", "fa-bitcoin": "", "fa-black-tie": "", "fa-blind": "", "fa-bluetooth": "", "fa-bluetooth-b": "", "fa-bold": "", "fa-bolt": "", "fa-bomb": "", "fa-book": "", "fa-bookmark": "", "fa-bookmark-o": "", "fa-braille": "", "fa-briefcase": "", "fa-btc": "", "fa-bug": "", "fa-building": "", "fa-building-o": "", "fa-bullhorn": "", "fa-bullseye": "", "fa-bus": "", "fa-buysellads": "", "fa-cab": "", "fa-calculator": "", "fa-calendar": "", "fa-calendar-check-o": "", "fa-calendar-minus-o": "", "fa-calendar-o": "", "fa-calendar-plus-o": "", "fa-calendar-times-o": "", "fa-camera": "", "fa-camera-retro": "", "fa-car": "", "fa-caret-down": "", "fa-caret-left": "", "fa-caret-right": "", "fa-caret-square-o-down": "", "fa-caret-square-o-left": "", "fa-caret-square-o-right": "", "fa-caret-square-o-up": "", "fa-caret-up": "", "fa-cart-arrow-down": "", "fa-cart-plus": "", "fa-cc": "", "fa-cc-amex": "", "fa-cc-diners-club": "", "fa-cc-discover": "", "fa-cc-jcb": "", "fa-cc-mastercard": "", "fa-cc-paypal": "", "fa-cc-stripe": "", "fa-cc-visa": "", "fa-certificate": "", "fa-chain": "", "fa-chain-broken": "", "fa-check": "", "fa-check-circle": "", "fa-check-circle-o": "", "fa-check-square": "", "fa-check-square-o": "", "fa-chevron-circle-down": "", "fa-chevron-circle-left": "", "fa-chevron-circle-right": "", "fa-chevron-circle-up": "", "fa-chevron-down": "", "fa-chevron-left": "", "fa-chevron-right": "", "fa-chevron-up": "", "fa-child": "", "fa-chrome": "", "fa-circle": "", "fa-circle-o": "", "fa-circle-o-notch": "", "fa-circle-thin": "", "fa-clipboard": "", "fa-clock-o": "", "fa-clone": "", "fa-close": "", "fa-cloud": "", "fa-cloud-download": "", "fa-cloud-upload": "", "fa-cny": "", "fa-code": "", "fa-code-fork": "", "fa-codepen": "", "fa-codiepie": "", "fa-coffee": "", "fa-cog": "", "fa-cogs": "", "fa-columns": "", "fa-comment": "", "fa-comment-o": "", "fa-commenting": "", "fa-commenting-o": "", "fa-comments": "", "fa-comments-o": "", "fa-compass": "", "fa-compress": "", "fa-connectdevelop": "", "fa-contao": "", "fa-copy": "", "fa-copyright": "", "fa-creative-commons": "", "fa-credit-card": "", "fa-credit-card-alt": "", "fa-crop": "", "fa-crosshairs": "", "fa-css3": "", "fa-cube": "", "fa-cubes": "", "fa-cut": "", "fa-cutlery": "", "fa-dashboard": "", "fa-dashcube": "", "fa-database": "", "fa-deaf": "", "fa-deafness": "", "fa-dedent": "", "fa-delicious": "", "fa-desktop": "", "fa-deviantart": "", "fa-diamond": "", "fa-digg": "", "fa-dollar": "", "fa-dot-circle-o": "", "fa-download": "", "fa-dribbble": "", "fa-drivers-license": "", "fa-drivers-license-o": "", "fa-dropbox": "", "fa-drupal": "", "fa-edge": "", "fa-edit": "", "fa-eercast": "", "fa-eject": "", "fa-ellipsis-h": "", "fa-ellipsis-v": "", "fa-empire": "", "fa-envelope": "", "fa-envelope-o": "", "fa-envelope-open": "", "fa-envelope-open-o": "", "fa-envelope-square": "", "fa-envira": "", "fa-eraser": "", "fa-etsy": "", "fa-eur": "", "fa-euro": "", "fa-exchange": "", "fa-exclamation": "", "fa-exclamation-circle": "", "fa-exclamation-triangle": "", "fa-expand": "", "fa-expeditedssl": "", "fa-external-link": "", "fa-external-link-square": "", "fa-eye": "", "fa-eye-slash": "", "fa-eyedropper": "", "fa-fa": "", "fa-facebook": "", "fa-facebook-f": "", "fa-facebook-official": "", "fa-facebook-square": "", "fa-fast-backward": "", "fa-fast-forward": "", "fa-fax": "", "fa-feed": "", "fa-female": "", "fa-fighter-jet": "", "fa-file": "", "fa-file-archive-o": "", "fa-file-audio-o": "", "fa-file-code-o": "", "fa-file-excel-o": "", "fa-file-image-o": "", "fa-file-movie-o": "", "fa-file-o": "", "fa-file-pdf-o": "", "fa-file-photo-o": "", "fa-file-picture-o": "", "fa-file-powerpoint-o": "", "fa-file-sound-o": "", "fa-file-text": "", "fa-file-text-o": "", "fa-file-video-o": "", "fa-file-word-o": "", "fa-file-zip-o": "", "fa-files-o": "", "fa-film": "", "fa-filter": "", "fa-fire": "", "fa-fire-extinguisher": "", "fa-firefox": "", "fa-first-order": "", "fa-flag": "", "fa-flag-checkered": "", "fa-flag-o": "", "fa-flash": "", "fa-flask": "", "fa-flickr": "", "fa-floppy-o": "", "fa-folder": "", "fa-folder-o": "", "fa-folder-open": "", "fa-folder-open-o": "", "fa-font": "", "fa-font-awesome": "", "fa-fonticons": "", "fa-fort-awesome": "", "fa-forumbee": "", "fa-forward": "", "fa-foursquare": "", "fa-free-code-camp": "", "fa-frown-o": "", "fa-futbol-o": "", "fa-gamepad": "", "fa-gavel": "", "fa-gbp": "", "fa-ge": "", "fa-gear": "", "fa-gears": "", "fa-genderless": "", "fa-get-pocket": "", "fa-gg": "", "fa-gg-circle": "", "fa-gift": "", "fa-git": "", "fa-git-square": "", "fa-github": "", "fa-github-alt": "", "fa-github-square": "", "fa-gitlab": "", "fa-gittip": "", "fa-glass": "", "fa-glide": "", "fa-glide-g": "", "fa-globe": "", "fa-google": "", "fa-google-plus": "", "fa-google-plus-circle": "", "fa-google-plus-official": "", "fa-google-plus-square": "", "fa-google-wallet": "", "fa-graduation-cap": "", "fa-gratipay": "", "fa-grav": "", "fa-group": "", "fa-h-square": "", "fa-hacker-news": "", "fa-hand-grab-o": "", "fa-hand-lizard-o": "", "fa-hand-o-down": "", "fa-hand-o-left": "", "fa-hand-o-right": "", "fa-hand-o-up": "", "fa-hand-paper-o": "", "fa-hand-peace-o": "", "fa-hand-pointer-o": "", "fa-hand-rock-o": "", "fa-hand-scissors-o": "", "fa-hand-spock-o": "", "fa-hand-stop-o": "", "fa-handshake-o": "", "fa-hard-of-hearing": "", "fa-hashtag": "", "fa-hdd-o": "", "fa-header": "", "fa-headphones": "", "fa-heart": "", "fa-heart-o": "", "fa-heartbeat": "", "fa-history": "", "fa-home": "", "fa-hospital-o": "", "fa-hotel": "", "fa-hourglass": "", "fa-hourglass-1": "", "fa-hourglass-2": "", "fa-hourglass-3": "", "fa-hourglass-end": "", "fa-hourglass-half": "", "fa-hourglass-o": "", "fa-hourglass-start": "", "fa-houzz": "", "fa-html5": "", "fa-i-cursor": "", "fa-id-badge": "", "fa-id-card": "", "fa-id-card-o": "", "fa-ils": "", "fa-image": "", "fa-imdb": "", "fa-inbox": "", "fa-indent": "", "fa-industry": "", "fa-info": "", "fa-info-circle": "", "fa-inr": "", "fa-instagram": "", "fa-institution": "", "fa-internet-explorer": "", "fa-intersex": "", "fa-ioxhost": "", "fa-italic": "", "fa-joomla": "", "fa-jpy": "", "fa-jsfiddle": "", "fa-key": "", "fa-keyboard-o": "", "fa-krw": "", "fa-language": "", "fa-laptop": "", "fa-lastfm": "", "fa-lastfm-square": "", "fa-leaf": "", "fa-leanpub": "", "fa-legal": "", "fa-lemon-o": "", "fa-level-down": "", "fa-level-up": "", "fa-life-bouy": "", "fa-life-buoy": "", "fa-life-ring": "", "fa-life-saver": "", "fa-lightbulb-o": "", "fa-line-chart": "", "fa-link": "", "fa-linkedin": "", "fa-linkedin-square": "", "fa-linode": "", "fa-linux": "", "fa-list": "", "fa-list-alt": "", "fa-list-ol": "", "fa-list-ul": "", "fa-location-arrow": "", "fa-lock": "", "fa-long-arrow-down": "", "fa-long-arrow-left": "", "fa-long-arrow-right": "", "fa-long-arrow-up": "", "fa-low-vision": "", "fa-magic": "", "fa-magnet": "", "fa-mail-forward": "", "fa-mail-reply": "", "fa-mail-reply-all": "", "fa-male": "", "fa-map": "", "fa-map-marker": "", "fa-map-o": "", "fa-map-pin": "", "fa-map-signs": "", "fa-mars": "", "fa-mars-double": "", "fa-mars-stroke": "", "fa-mars-stroke-h": "", "fa-mars-stroke-v": "", "fa-maxcdn": "", "fa-meanpath": "", "fa-medium": "", "fa-medkit": "", "fa-meetup": "", "fa-meh-o": "", "fa-mercury": "", "fa-microchip": "", "fa-microphone": "", "fa-microphone-slash": "", "fa-minus": "", "fa-minus-circle": "", "fa-minus-square": "", "fa-minus-square-o": "", "fa-mixcloud": "", "fa-mobile": "", "fa-mobile-phone": "", "fa-modx": "", "fa-money": "", "fa-moon-o": "", "fa-mortar-board": "", "fa-motorcycle": "", "fa-mouse-pointer": "", "fa-music": "", "fa-navicon": "", "fa-neuter": "", "fa-newspaper-o": "", "fa-object-group": "", "fa-object-ungroup": "", "fa-odnoklassniki": "", "fa-odnoklassniki-square": "", "fa-opencart": "", "fa-openid": "", "fa-opera": "", "fa-optin-monster": "", "fa-outdent": "", "fa-pagelines": "", "fa-paint-brush": "", "fa-paper-plane": "", "fa-paper-plane-o": "", "fa-paperclip": "", "fa-paragraph": "", "fa-paste": "", "fa-pause": "", "fa-pause-circle": "", "fa-pause-circle-o": "", "fa-paw": "", "fa-paypal": "", "fa-pencil": "", "fa-pencil-square": "", "fa-pencil-square-o": "", "fa-percent": "", "fa-phone": "", "fa-phone-square": "", "fa-photo": "", "fa-picture-o": "", "fa-pie-chart": "", "fa-pied-piper": "", "fa-pied-piper-alt": "", "fa-pied-piper-pp": "", "fa-pinterest": "", "fa-pinterest-p": "", "fa-pinterest-square": "", "fa-plane": "", "fa-play": "", "fa-play-circle": "", "fa-play-circle-o": "", "fa-plug": "", "fa-plus": "", "fa-plus-circle": "", "fa-plus-square": "", "fa-plus-square-o": "", "fa-podcast": "", "fa-power-off": "", "fa-print": "", "fa-product-hunt": "", "fa-puzzle-piece": "", "fa-qq": "", "fa-qrcode": "", "fa-question": "", "fa-question-circle": "", "fa-question-circle-o": "", "fa-quora": "", "fa-quote-left": "", "fa-quote-right": "", "fa-ra": "", "fa-random": "", "fa-ravelry": "", "fa-rebel": "", "fa-recycle": "", "fa-reddit": "", "fa-reddit-alien": "", "fa-reddit-square": "", "fa-refresh": "", "fa-registered": "", "fa-remove": "", "fa-renren": "", "fa-reorder": "", "fa-repeat": "", "fa-reply": "", "fa-reply-all": "", "fa-resistance": "", "fa-retweet": "", "fa-rmb": "", "fa-road": "", "fa-rocket": "", "fa-rotate-left": "", "fa-rotate-right": "", "fa-rouble": "", "fa-rss": "", "fa-rss-square": "", "fa-rub": "", "fa-ruble": "", "fa-rupee": "", "fa-s15": "", "fa-safari": "", "fa-save": "", "fa-scissors": "", "fa-scribd": "", "fa-search": "", "fa-search-minus": "", "fa-search-plus": "", "fa-sellsy": "", "fa-send": "", "fa-send-o": "", "fa-server": "", "fa-share": "", "fa-share-alt": "", "fa-share-alt-square": "", "fa-share-square": "", "fa-share-square-o": "", "fa-shekel": "", "fa-sheqel": "", "fa-shield": "", "fa-ship": "", "fa-shirtsinbulk": "", "fa-shopping-bag": "", "fa-shopping-basket": "", "fa-shopping-cart": "", "fa-shower": "", "fa-sign-in": "", "fa-sign-language": "", "fa-sign-out": "", "fa-signal": "", "fa-signing": "", "fa-simplybuilt": "", "fa-sitemap": "", "fa-skyatlas": "", "fa-skype": "", "fa-slack": "", "fa-sliders": "", "fa-slideshare": "", "fa-smile-o": "", "fa-snapchat": "", "fa-snapchat-ghost": "", "fa-snapchat-square": "", "fa-snowflake-o": "", "fa-soccer-ball-o": "", "fa-sort": "", "fa-sort-alpha-asc": "", "fa-sort-alpha-desc": "", "fa-sort-amount-asc": "", "fa-sort-amount-desc": "", "fa-sort-asc": "", "fa-sort-desc": "", "fa-sort-down": "", "fa-sort-numeric-asc": "", "fa-sort-numeric-desc": "", "fa-sort-up": "", "fa-soundcloud": "", "fa-space-shuttle": "", "fa-spinner": "", "fa-spoon": "", "fa-spotify": "", "fa-square": "", "fa-square-o": "", "fa-stack-exchange": "", "fa-stack-overflow": "", "fa-star": "", "fa-star-half": "", "fa-star-half-empty": "", "fa-star-half-full": "", "fa-star-half-o": "", "fa-star-o": "", "fa-steam": "", "fa-steam-square": "", "fa-step-backward": "", "fa-step-forward": "", "fa-stethoscope": "", "fa-sticky-note": "", "fa-sticky-note-o": "", "fa-stop": "", "fa-stop-circle": "", "fa-stop-circle-o": "", "fa-street-view": "", "fa-strikethrough": "", "fa-stumbleupon": "", "fa-stumbleupon-circle": "", "fa-subscript": "", "fa-subway": "", "fa-suitcase": "", "fa-sun-o": "", "fa-superpowers": "", "fa-superscript": "", "fa-support": "", "fa-table": "", "fa-tablet": "", "fa-tachometer": "", "fa-tag": "", "fa-tags": "", "fa-tasks": "", "fa-taxi": "", "fa-telegram": "", "fa-television": "", "fa-tencent-weibo": "", "fa-terminal": "", "fa-text-height": "", "fa-text-width": "", "fa-th": "", "fa-th-large": "", "fa-th-list": "", "fa-themeisle": "", "fa-thermometer": "", "fa-thermometer-0": "", "fa-thermometer-1": "", "fa-thermometer-2": "", "fa-thermometer-3": "", "fa-thermometer-4": "", "fa-thermometer-empty": "", "fa-thermometer-full": "", "fa-thermometer-half": "", "fa-thermometer-quarter": "", "fa-thermometer-three-quarters": "", "fa-thumb-tack": "", "fa-thumbs-down": "", "fa-thumbs-o-down": "", "fa-thumbs-o-up": "", "fa-thumbs-up": "", "fa-ticket": "", "fa-times": "", "fa-times-circle": "", "fa-times-circle-o": "", "fa-times-rectangle": "", "fa-times-rectangle-o": "", "fa-tint": "", "fa-toggle-down": "", "fa-toggle-left": "", "fa-toggle-off": "", "fa-toggle-on": "", "fa-toggle-right": "", "fa-toggle-up": "", "fa-trademark": "", "fa-train": "", "fa-transgender": "", "fa-transgender-alt": "", "fa-trash": "", "fa-trash-o": "", "fa-tree": "", "fa-trello": "", "fa-tripadvisor": "", "fa-trophy": "", "fa-truck": "", "fa-try": "", "fa-tty": "", "fa-tumblr": "", "fa-tumblr-square": "", "fa-turkish-lira": "", "fa-tv": "", "fa-twitch": "", "fa-twitter": "", "fa-twitter-square": "", "fa-umbrella": "", "fa-underline": "", "fa-undo": "", "fa-universal-access": "", "fa-university": "", "fa-unlink": "", "fa-unlock": "", "fa-unlock-alt": "", "fa-unsorted": "", "fa-upload": "", "fa-usb": "", "fa-usd": "", "fa-user": "", "fa-user-circle": "", "fa-user-circle-o": "", "fa-user-md": "", "fa-user-o": "", "fa-user-plus": "", "fa-user-secret": "", "fa-user-times": "", "fa-users": "", "fa-vcard": "", "fa-vcard-o": "", "fa-venus": "", "fa-venus-double": "", "fa-venus-mars": "", "fa-viacoin": "", "fa-viadeo": "", "fa-viadeo-square": "", "fa-video-camera": "", "fa-vimeo": "", "fa-vimeo-square": "", "fa-vine": "", "fa-vk": "", "fa-volume-control-phone": "", "fa-volume-down": "", "fa-volume-off": "", "fa-volume-up": "", "fa-warning": "", "fa-wechat": "", "fa-weibo": "", "fa-weixin": "", "fa-whatsapp": "", "fa-wheelchair": "", "fa-wheelchair-alt": "", "fa-wifi": "", "fa-wikipedia-w": "", "fa-window-close": "", "fa-window-close-o": "", "fa-window-maximize": "", "fa-window-minimize": "", "fa-window-restore": "", "fa-windows": "", "fa-won": "", "fa-wordpress": "", "fa-wpbeginner": "", "fa-wpexplorer": "", "fa-wpforms": "", "fa-wrench": "", "fa-xing": "", "fa-xing-square": "", "fa-y-combinator": "", "fa-y-combinator-square": "", "fa-yahoo": "", "fa-yc": "", "fa-yc-square": "", "fa-yelp": "", "fa-yen": "", "fa-yoast": "", "fa-youtube": "", "fa-youtube-play": "", "fa-youtube-square": ""};
    return faCodeMap[key];
}

export function removeHTMLFromString(str: string, div?: HTMLDivElement) {
    div = div ? div : document.createElement("div");
    div.innerHTML = str;
    return div.textContent || div.innerText || "";
}

//  Template   ---
//  https://github.com/Matt-Esch/string-template (MIT)
const nargs = /\{([0-9a-zA-Z_\s\[\]]+)\}/g;
const nargs2 = /\{\{([0-9a-zA-Z_\s\[\]]+)\}\}/g;

export function templateFields(tpl: string): string[] {
    if (!tpl) return [];
    const retVal: string[] = [];
    const matches = tpl.match(nargs);
    if (matches && matches.length) {
        for (const tplField of matches) {
            retVal.push(tplField.substring(1, tplField.length - 1));
        }
    }
    return retVal;
}

export function template(tpl: string, _args) {
    if (!tpl) return "";
    let args;

    if (arguments.length === 2 && typeof arguments[1] === "object") {
        args = arguments[1];
    } else {
        args = new Array(arguments.length - 1);
        for (let i = 1; i < arguments.length; ++i) {
            args[i - 1] = arguments[i];
        }
    }

    if (!args || !args.hasOwnProperty) {
        args = {};
    }

    //  Array handling
    for (const key in args) {
        if (isArray(args[key])) {
            args[key].forEach(function (row, idx) {
                args[key + "[" + idx + "]"] = row;
            });
        }
    }

    return tpl
        .replace(nargs2, function replaceArg(match, i) {
            const result = args.hasOwnProperty(i) ? args[i] : null;
            if (result === null || result === undefined) {
                return match;
            }
            return removeHTMLFromString(result);
        })
        .replace(nargs, function replaceArg(match, i, index) {
            const result = args.hasOwnProperty(i) ? args[i] : null;
            if (result === null || result === undefined) {
                return "";
            }
            return result;
        })
        ;
}

export function naturalSort(data, order, idx, sortCaseSensitive) {
    return data.slice(0).sort(function (a, b) {
        return _naturalSort(a, b, order, idx, sortCaseSensitive);
    });
}

export function multiSort(data, sortBy) {
    if (sortBy && sortBy.length) {
        data.sort(function (l, r) {
            for (let i = 0; i < sortBy.length; ++i) {
                const lVal = l[sortBy[i].idx];
                const rVal = r[sortBy[i].idx];
                if (lVal !== rVal) {
                    return sortBy[i].reverse ? d3Descending(lVal, rVal) : d3Ascending(lVal, rVal);
                }
            }
            return 0;
        });
    }
    return data;
}

export const Selection = SelectionBag;

export function urlParams() {
    const def = window.location.search.split("?")[1];
    const retVal = {};
    if (def) {
        def.split("&").forEach(function (param) {
            const paramParts = param.split("=");
            switch (paramParts.length) {
                case 1:
                    retVal[decodeURIComponent(paramParts[0])] = undefined;
                    break;
                case 2:
                    retVal[decodeURIComponent(paramParts[0])] = decodeURIComponent(paramParts[1]);
                    break;
                default:
                    throw new Error("Invalid URL Param:  " + param);
            }
        });
    }
    return retVal;
}

export function endsWith(str: string, searchStr: string, pos?: number) {
    const subjectString = str.toString();
    if (typeof pos !== "number" || !isFinite(pos) || Math.floor(pos) !== pos || pos > subjectString.length) {
        pos = subjectString.length;
    }
    pos -= searchStr.length;
    const lastIndex = subjectString.indexOf(searchStr, pos);
    return lastIndex !== -1 && lastIndex === pos;
}

export function d3ArrayAdapter(array) {
    return {
        ownerDocument: {
            createElement(_tagName) {
                return {
                    get __data__() { return this.row; },
                    set __data__(_) { this.row = array[this.index] = _; }
                };
            },

            createElementNS(_ns, tagName) {
                return this.createElement(tagName);
            }
        },

        querySelectorAll(selectors) {
            if (selectors) throw new Error("unsupported");
            const context = this;
            return array.map(function (row, idx) {
                return {
                    ownerDocument: context.ownerDocument,
                    parentNode: context,
                    get __data__() { return row; },
                    set __data__(_) { array[idx] = _; }
                };
            });
        },

        appendChild(node) {
            node.parentNode = this;
            node.index = array.length;
            array.push(null);
            return node;
        },

        insertBefore(node, referenceNode) {
            const idx = array.indexOf(node.__data__);
            const refIdx = array.indexOf(referenceNode.__data__);
            if (idx > refIdx) {
                array.splice(refIdx, 0, array.splice(idx, 1)[0]);
            } else if (idx < refIdx - 1) {
                array.splice(refIdx - 1, 0, array.splice(idx, 1)[0]);
            }
            return node;
        },

        removeChild(node) {
            array.splice(array.indexOf(node.__data__), 1);
            return node;
        }
    };
}

export function downloadBlob(blob: Blob, filename: string) {
    let a = document.createElement("a");
    if (navigator.msSaveBlob) { // IE10+
        a = null;
        return navigator.msSaveBlob(blob, filename);
    } else if ("download" in a) { // html 5
        a.href = URL.createObjectURL(blob);
        a.setAttribute("download", filename);
        document.body.appendChild(a);
        setTimeout(function () {
            a.click();
            document.body.removeChild(a);
        }, 10);
        return true;
    }
}

export function timestamp() {
    const currentdate = new Date();
    const timeFormat = d3TimeFormat("%Y-%m-%dT%H_%M_%S");
    return timeFormat(currentdate);
}

export function downloadString(format: "CSV" | "TSV" | "JSON" | "TEXT" | "SVG", blob: string, id?: string) {
    const filename = id || ("data_" + timestamp()) + "." + format.toLowerCase();

    let mimeType = "";
    switch (format) {
        case "TSV":
            mimeType = "text/tab-seperated-values";
            break;
        case "JSON":
            mimeType = "application/json";
            break;
        case "SVG":
            mimeType = "image/svg+xml";
            break;
        case "CSV":
        case "TEXT":
        default:
            mimeType = "text/csv";
    }
    downloadBlob(new Blob([blob], { type: mimeType }), filename);
}

export function widgetPath(classID) {
    return "../" + classID.split("_").join("/");
}

export function parseClassID(classID, prefix = "..") {
    const parts = classID.split(".");
    const classParts = parts[0].split("_");
    return {
        package: `@hpcc-js/${classParts[0]}`,
        path: prefix + "/" + parts[0].split("_").join("/"),
        widgetID: classParts.length > 1 ? classParts[1] : null,
        memberWidgetID: parts.length > 1 ? parts[1] : null
    };
}

export function checksum(s) {
    if (s instanceof Array) {
        s = s.join("") + s.length;
    }
    switch (typeof s) {
        case "string":
            break;
        default:
            s = "" + s;
    }
    let chk = 0x12345678;
    for (let i = 0, l = s.length; i < l; ++i) {
        chk += (s.charCodeAt(i) * (i + 1));
    }
    // tslint:disable-next-line:no-bitwise
    return (chk & 0xffffffff).toString(16);
}
export function getTime() {
    return (now && now.call(perf)) || (new Date().getTime());
}
export function mixin(dest, _sources) {
    dest = dest || {};
    for (let i = 1, l = arguments.length; i < l; i++) {
        _mixin(dest, arguments[i]);
    }
    return dest;
}

function _mixin(dest, source) {
    let s;
    const empty = {};
    for (const key in source) {
        s = source[key];
        if (!(key in dest) || (dest[key] !== s && (!(key in empty) || empty[key] !== s))) {
            dest[key] = s;
        }
    }
    return dest;
}

export function exists(prop, scope) {
    if (!prop || !scope) {
        return false;
    }
    const propParts = prop.split(".");
    let testScope = scope;
    for (let i = 0; i < propParts.length; ++i) {
        const item = propParts[i];
        if (testScope[item] === undefined) {
            return false;
        }
        testScope = testScope[item];
    }
    return true;
}

export function logStringify(obj) {
    const cache = [];
    return JSON.stringify(obj, function (_key, value) {
        if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return;
            }

            cache.push(value);
        }
        return value;
    });
}

export function debounce(func, threshold = 100, execAsap = false) {
    return function debounced(..._dummyArgs) {
        const obj = this || {};
        const args = arguments;
        function delayed() {
            if (!execAsap)
                func.apply(obj, args);
            obj.__hpcc_debounce_timeout = null;
        }
        if (obj.__hpcc_debounce_timeout)
            clearTimeout(obj.__hpcc_debounce_timeout);
        else if (execAsap)
            func.apply(obj, args);
        obj.__hpcc_debounce_timeout = setTimeout(delayed, threshold);
    };
}

export function parseVersionString(versionString) {
    const _sp = versionString.split(".");
    return {
        major: parseInt(_sp[0].replace("v", "")),
        minor: parseInt(_sp[1]),
        patch: parseInt(_sp[2].split("-")[0])
    };
}
