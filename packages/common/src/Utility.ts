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
    const faCodeMap = { "fa-glass": "\uf000", "fa-music": "\uf001", "fa-search": "\uf002", "fa-envelope-o": "\uf003", "fa-heart": "\uf004", "fa-star": "\uf005", "fa-star-o": "\uf006", "fa-user": "\uf007", "fa-film": "\uf008", "fa-th-large": "\uf009", "fa-th": "\uf00a", "fa-th-list": "\uf00b", "fa-check": "\uf00c", "fa-times": "\uf00d", "fa-search-plus": "\uf00e", "fa-search-minus": "\uf010", "fa-power-off": "\uf011", "fa-signal": "\uf012", "fa-cog": "\uf013", "fa-trash-o": "\uf014", "fa-home": "\uf015", "fa-file-o": "\uf016", "fa-clock-o": "\uf017", "fa-road": "\uf018", "fa-download": "\uf019", "fa-arrow-circle-o-down": "\uf01a", "fa-arrow-circle-o-up": "\uf01b", "fa-inbox": "\uf01c", "fa-play-circle-o": "\uf01d", "fa-repeat": "\uf01e", "fa-refresh": "\uf021", "fa-list-alt": "\uf022", "fa-lock": "\uf023", "fa-flag": "\uf024", "fa-headphones": "\uf025", "fa-volume-off": "\uf026", "fa-volume-down": "\uf027", "fa-volume-up": "\uf028", "fa-qrcode": "\uf029", "fa-barcode": "\uf02a", "fa-tag": "\uf02b", "fa-tags": "\uf02c", "fa-book": "\uf02d", "fa-bookmark": "\uf02e", "fa-print": "\uf02f", "fa-camera": "\uf030", "fa-font": "\uf031", "fa-bold": "\uf032", "fa-italic": "\uf033", "fa-text-height": "\uf034", "fa-text-width": "\uf035", "fa-align-left": "\uf036", "fa-align-center": "\uf037", "fa-align-right": "\uf038", "fa-align-justify": "\uf039", "fa-list": "\uf03a", "fa-outdent": "\uf03b", "fa-indent": "\uf03c", "fa-video-camera": "\uf03d", "fa-picture-o": "\uf03e", "fa-pencil": "\uf040", "fa-map-marker": "\uf041", "fa-adjust": "\uf042", "fa-tint": "\uf043", "fa-pencil-square-o": "\uf044", "fa-share-square-o": "\uf045", "fa-check-square-o": "\uf046", "fa-arrows": "\uf047", "fa-step-backward": "\uf048", "fa-fast-backward": "\uf049", "fa-backward": "\uf04a", "fa-play": "\uf04b", "fa-pause": "\uf04c", "fa-stop": "\uf04d", "fa-forward": "\uf04e", "fa-fast-forward": "\uf050", "fa-step-forward": "\uf051", "fa-eject": "\uf052", "fa-chevron-left": "\uf053", "fa-chevron-right": "\uf054", "fa-plus-circle": "\uf055", "fa-minus-circle": "\uf056", "fa-times-circle": "\uf057", "fa-check-circle": "\uf058", "fa-question-circle": "\uf059", "fa-info-circle": "\uf05a", "fa-crosshairs": "\uf05b", "fa-times-circle-o": "\uf05c", "fa-check-circle-o": "\uf05d", "fa-ban": "\uf05e", "fa-arrow-left": "\uf060", "fa-arrow-right": "\uf061", "fa-arrow-up": "\uf062", "fa-arrow-down": "\uf063", "fa-share": "\uf064", "fa-expand": "\uf065", "fa-compress": "\uf066", "fa-plus": "\uf067", "fa-minus": "\uf068", "fa-asterisk": "\uf069", "fa-exclamation-circle": "\uf06a", "fa-gift": "\uf06b", "fa-leaf": "\uf06c", "fa-fire": "\uf06d", "fa-eye": "\uf06e", "fa-eye-slash": "\uf070", "fa-exclamation-triangle": "\uf071", "fa-plane": "\uf072", "fa-calendar": "\uf073", "fa-random": "\uf074", "fa-comment": "\uf075", "fa-magnet": "\uf076", "fa-chevron-up": "\uf077", "fa-chevron-down": "\uf078", "fa-retweet": "\uf079", "fa-shopping-cart": "\uf07a", "fa-folder": "\uf07b", "fa-folder-open": "\uf07c", "fa-arrows-v": "\uf07d", "fa-arrows-h": "\uf07e", "fa-bar-chart": "\uf080", "fa-twitter-square": "\uf081", "fa-facebook-square": "\uf082", "fa-camera-retro": "\uf083", "fa-key": "\uf084", "fa-cogs": "\uf085", "fa-comments": "\uf086", "fa-thumbs-o-up": "\uf087", "fa-thumbs-o-down": "\uf088", "fa-star-half": "\uf089", "fa-heart-o": "\uf08a", "fa-sign-out": "\uf08b", "fa-linkedin-square": "\uf08c", "fa-thumb-tack": "\uf08d", "fa-external-link": "\uf08e", "fa-sign-in": "\uf090", "fa-trophy": "\uf091", "fa-github-square": "\uf092", "fa-upload": "\uf093", "fa-lemon-o": "\uf094", "fa-phone": "\uf095", "fa-square-o": "\uf096", "fa-bookmark-o": "\uf097", "fa-phone-square": "\uf098", "fa-twitter": "\uf099", "fa-facebook": "\uf09a", "fa-github": "\uf09b", "fa-unlock": "\uf09c", "fa-credit-card": "\uf09d", "fa-rss": "\uf09e", "fa-hdd-o": "\uf0a0", "fa-bullhorn": "\uf0a1", "fa-bell": "\uf0f3", "fa-certificate": "\uf0a3", "fa-hand-o-right": "\uf0a4", "fa-hand-o-left": "\uf0a5", "fa-hand-o-up": "\uf0a6", "fa-hand-o-down": "\uf0a7", "fa-arrow-circle-left": "\uf0a8", "fa-arrow-circle-right": "\uf0a9", "fa-arrow-circle-up": "\uf0aa", "fa-arrow-circle-down": "\uf0ab", "fa-globe": "\uf0ac", "fa-wrench": "\uf0ad", "fa-tasks": "\uf0ae", "fa-filter": "\uf0b0", "fa-briefcase": "\uf0b1", "fa-arrows-alt": "\uf0b2", "fa-users": "\uf0c0", "fa-link": "\uf0c1", "fa-cloud": "\uf0c2", "fa-flask": "\uf0c3", "fa-scissors": "\uf0c4", "fa-files-o": "\uf0c5", "fa-paperclip": "\uf0c6", "fa-floppy-o": "\uf0c7", "fa-square": "\uf0c8", "fa-bars": "\uf0c9", "fa-list-ul": "\uf0ca", "fa-list-ol": "\uf0cb", "fa-strikethrough": "\uf0cc", "fa-underline": "\uf0cd", "fa-table": "\uf0ce", "fa-magic": "\uf0d0", "fa-truck": "\uf0d1", "fa-pinterest": "\uf0d2", "fa-pinterest-square": "\uf0d3", "fa-google-plus-square": "\uf0d4", "fa-google-plus": "\uf0d5", "fa-money": "\uf0d6", "fa-caret-down": "\uf0d7", "fa-caret-up": "\uf0d8", "fa-caret-left": "\uf0d9", "fa-caret-right": "\uf0da", "fa-columns": "\uf0db", "fa-sort": "\uf0dc", "fa-sort-desc": "\uf0dd", "fa-sort-asc": "\uf0de", "fa-envelope": "\uf0e0", "fa-linkedin": "\uf0e1", "fa-undo": "\uf0e2", "fa-gavel": "\uf0e3", "fa-tachometer": "\uf0e4", "fa-comment-o": "\uf0e5", "fa-comments-o": "\uf0e6", "fa-bolt": "\uf0e7", "fa-sitemap": "\uf0e8", "fa-umbrella": "\uf0e9", "fa-clipboard": "\uf0ea", "fa-lightbulb-o": "\uf0eb", "fa-exchange": "\uf0ec", "fa-cloud-download": "\uf0ed", "fa-cloud-upload": "\uf0ee", "fa-user-md": "\uf0f0", "fa-stethoscope": "\uf0f1", "fa-suitcase": "\uf0f2", "fa-bell-o": "\uf0a2", "fa-coffee": "\uf0f4", "fa-cutlery": "\uf0f5", "fa-file-text-o": "\uf0f6", "fa-building-o": "\uf0f7", "fa-hospital-o": "\uf0f8", "fa-ambulance": "\uf0f9", "fa-medkit": "\uf0fa", "fa-fighter-jet": "\uf0fb", "fa-beer": "\uf0fc", "fa-h-square": "\uf0fd", "fa-plus-square": "\uf0fe", "fa-angle-double-left": "\uf100", "fa-angle-double-right": "\uf101", "fa-angle-double-up": "\uf102", "fa-angle-double-down": "\uf103", "fa-angle-left": "\uf104", "fa-angle-right": "\uf105", "fa-angle-up": "\uf106", "fa-angle-down": "\uf107", "fa-desktop": "\uf108", "fa-laptop": "\uf109", "fa-tablet": "\uf10a", "fa-mobile": "\uf10b", "fa-circle-o": "\uf10c", "fa-quote-left": "\uf10d", "fa-quote-right": "\uf10e", "fa-spinner": "\uf110", "fa-circle": "\uf111", "fa-reply": "\uf112", "fa-github-alt": "\uf113", "fa-folder-o": "\uf114", "fa-folder-open-o": "\uf115", "fa-smile-o": "\uf118", "fa-frown-o": "\uf119", "fa-meh-o": "\uf11a", "fa-gamepad": "\uf11b", "fa-keyboard-o": "\uf11c", "fa-flag-o": "\uf11d", "fa-flag-checkered": "\uf11e", "fa-terminal": "\uf120", "fa-code": "\uf121", "fa-reply-all": "\uf122", "fa-star-half-o": "\uf123", "fa-location-arrow": "\uf124", "fa-crop": "\uf125", "fa-code-fork": "\uf126", "fa-chain-broken": "\uf127", "fa-question": "\uf128", "fa-info": "\uf129", "fa-exclamation": "\uf12a", "fa-superscript": "\uf12b", "fa-subscript": "\uf12c", "fa-eraser": "\uf12d", "fa-puzzle-piece": "\uf12e", "fa-microphone": "\uf130", "fa-microphone-slash": "\uf131", "fa-shield": "\uf132", "fa-calendar-o": "\uf133", "fa-fire-extinguisher": "\uf134", "fa-rocket": "\uf135", "fa-maxcdn": "\uf136", "fa-chevron-circle-left": "\uf137", "fa-chevron-circle-right": "\uf138", "fa-chevron-circle-up": "\uf139", "fa-chevron-circle-down": "\uf13a", "fa-html5": "\uf13b", "fa-css3": "\uf13c", "fa-anchor": "\uf13d", "fa-unlock-alt": "\uf13e", "fa-bullseye": "\uf140", "fa-ellipsis-h": "\uf141", "fa-ellipsis-v": "\uf142", "fa-rss-square": "\uf143", "fa-play-circle": "\uf144", "fa-ticket": "\uf145", "fa-minus-square": "\uf146", "fa-minus-square-o": "\uf147", "fa-level-up": "\uf148", "fa-level-down": "\uf149", "fa-check-square": "\uf14a", "fa-pencil-square": "\uf14b", "fa-external-link-square": "\uf14c", "fa-share-square": "\uf14d", "fa-compass": "\uf14e", "fa-caret-square-o-down": "\uf150", "fa-caret-square-o-up": "\uf151", "fa-caret-square-o-right": "\uf152", "fa-eur": "\uf153", "fa-gbp": "\uf154", "fa-usd": "\uf155", "fa-inr": "\uf156", "fa-jpy": "\uf157", "fa-rub": "\uf158", "fa-krw": "\uf159", "fa-btc": "\uf15a", "fa-file": "\uf15b", "fa-file-text": "\uf15c", "fa-sort-alpha-asc": "\uf15d", "fa-sort-alpha-desc": "\uf15e", "fa-sort-amount-asc": "\uf160", "fa-sort-amount-desc": "\uf161", "fa-sort-numeric-asc": "\uf162", "fa-sort-numeric-desc": "\uf163", "fa-thumbs-up": "\uf164", "fa-thumbs-down": "\uf165", "fa-youtube-square": "\uf166", "fa-youtube": "\uf167", "fa-xing": "\uf168", "fa-xing-square": "\uf169", "fa-youtube-play": "\uf16a", "fa-dropbox": "\uf16b", "fa-stack-overflow": "\uf16c", "fa-instagram": "\uf16d", "fa-flickr": "\uf16e", "fa-adn": "\uf170", "fa-bitbucket": "\uf171", "fa-bitbucket-square": "\uf172", "fa-tumblr": "\uf173", "fa-tumblr-square": "\uf174", "fa-long-arrow-down": "\uf175", "fa-long-arrow-up": "\uf176", "fa-long-arrow-left": "\uf177", "fa-long-arrow-right": "\uf178", "fa-apple": "\uf179", "fa-windows": "\uf17a", "fa-android": "\uf17b", "fa-linux": "\uf17c", "fa-dribbble": "\uf17d", "fa-skype": "\uf17e", "fa-foursquare": "\uf180", "fa-trello": "\uf181", "fa-female": "\uf182", "fa-male": "\uf183", "fa-gratipay": "\uf184", "fa-sun-o": "\uf185", "fa-moon-o": "\uf186", "fa-archive": "\uf187", "fa-bug": "\uf188", "fa-vk": "\uf189", "fa-weibo": "\uf18a", "fa-renren": "\uf18b", "fa-pagelines": "\uf18c", "fa-stack-exchange": "\uf18d", "fa-arrow-circle-o-right": "\uf18e", "fa-arrow-circle-o-left": "\uf190", "fa-caret-square-o-left": "\uf191", "fa-dot-circle-o": "\uf192", "fa-wheelchair": "\uf193", "fa-vimeo-square": "\uf194", "fa-try": "\uf195", "fa-plus-square-o": "\uf196", "fa-space-shuttle": "\uf197", "fa-slack": "\uf198", "fa-envelope-square": "\uf199", "fa-wordpress": "\uf19a", "fa-openid": "\uf19b", "fa-university": "\uf19c", "fa-graduation-cap": "\uf19d", "fa-yahoo": "\uf19e", "fa-google": "\uf1a0", "fa-reddit": "\uf1a1", "fa-reddit-square": "\uf1a2", "fa-stumbleupon-circle": "\uf1a3", "fa-stumbleupon": "\uf1a4", "fa-delicious": "\uf1a5", "fa-digg": "\uf1a6", "fa-pied-piper": "\uf1a7", "fa-pied-piper-alt": "\uf1a8", "fa-drupal": "\uf1a9", "fa-joomla": "\uf1aa", "fa-language": "\uf1ab", "fa-fax": "\uf1ac", "fa-building": "\uf1ad", "fa-child": "\uf1ae", "fa-paw": "\uf1b0", "fa-spoon": "\uf1b1", "fa-cube": "\uf1b2", "fa-cubes": "\uf1b3", "fa-behance": "\uf1b4", "fa-behance-square": "\uf1b5", "fa-steam": "\uf1b6", "fa-steam-square": "\uf1b7", "fa-recycle": "\uf1b8", "fa-car": "\uf1b9", "fa-taxi": "\uf1ba", "fa-tree": "\uf1bb", "fa-spotify": "\uf1bc", "fa-deviantart": "\uf1bd", "fa-soundcloud": "\uf1be", "fa-database": "\uf1c0", "fa-file-pdf-o": "\uf1c1", "fa-file-word-o": "\uf1c2", "fa-file-excel-o": "\uf1c3", "fa-file-powerpoint-o": "\uf1c4", "fa-file-image-o": "\uf1c5", "fa-file-archive-o": "\uf1c6", "fa-file-audio-o": "\uf1c7", "fa-file-video-o": "\uf1c8", "fa-file-code-o": "\uf1c9", "fa-vine": "\uf1ca", "fa-codepen": "\uf1cb", "fa-jsfiddle": "\uf1cc", "fa-life-ring": "\uf1cd", "fa-circle-o-notch": "\uf1ce", "fa-rebel": "\uf1d0", "fa-empire": "\uf1d1", "fa-git-square": "\uf1d2", "fa-git": "\uf1d3", "fa-hacker-news": "\uf1d4", "fa-tencent-weibo": "\uf1d5", "fa-qq": "\uf1d6", "fa-weixin": "\uf1d7", "fa-paper-plane": "\uf1d8", "fa-paper-plane-o": "\uf1d9", "fa-history": "\uf1da", "fa-circle-thin": "\uf1db", "fa-header": "\uf1dc", "fa-paragraph": "\uf1dd", "fa-sliders": "\uf1de", "fa-share-alt": "\uf1e0", "fa-share-alt-square": "\uf1e1", "fa-bomb": "\uf1e2", "fa-futbol-o": "\uf1e3", "fa-tty": "\uf1e4", "fa-binoculars": "\uf1e5", "fa-plug": "\uf1e6", "fa-slideshare": "\uf1e7", "fa-twitch": "\uf1e8", "fa-yelp": "\uf1e9", "fa-newspaper-o": "\uf1ea", "fa-wifi": "\uf1eb", "fa-calculator": "\uf1ec", "fa-paypal": "\uf1ed", "fa-google-wallet": "\uf1ee", "fa-cc-visa": "\uf1f0", "fa-cc-mastercard": "\uf1f1", "fa-cc-discover": "\uf1f2", "fa-cc-amex": "\uf1f3", "fa-cc-paypal": "\uf1f4", "fa-cc-stripe": "\uf1f5", "fa-bell-slash": "\uf1f6", "fa-bell-slash-o": "\uf1f7", "fa-trash": "\uf1f8", "fa-copyright": "\uf1f9", "fa-at": "\uf1fa", "fa-eyedropper": "\uf1fb", "fa-paint-brush": "\uf1fc", "fa-birthday-cake": "\uf1fd", "fa-area-chart": "\uf1fe", "fa-pie-chart": "\uf200", "fa-line-chart": "\uf201", "fa-lastfm": "\uf202", "fa-lastfm-square": "\uf203", "fa-toggle-off": "\uf204", "fa-toggle-on": "\uf205", "fa-bicycle": "\uf206", "fa-bus": "\uf207", "fa-ioxhost": "\uf208", "fa-angellist": "\uf209", "fa-cc": "\uf20a", "fa-ils": "\uf20b", "fa-meanpath": "\uf20c", "fa-buysellads": "\uf20d", "fa-connectdevelop": "\uf20e", "fa-dashcube": "\uf210", "fa-forumbee": "\uf211", "fa-leanpub": "\uf212", "fa-sellsy": "\uf213", "fa-shirtsinbulk": "\uf214", "fa-simplybuilt": "\uf215", "fa-skyatlas": "\uf216", "fa-cart-plus": "\uf217", "fa-cart-arrow-down": "\uf218", "fa-diamond": "\uf219", "fa-ship": "\uf21a", "fa-user-secret": "\uf21b", "fa-motorcycle": "\uf21c", "fa-street-view": "\uf21d", "fa-heartbeat": "\uf21e", "fa-venus": "\uf221", "fa-mars": "\uf222", "fa-mercury": "\uf223", "fa-transgender": "\uf224", "fa-transgender-alt": "\uf225", "fa-venus-double": "\uf226", "fa-mars-double": "\uf227", "fa-venus-mars": "\uf228", "fa-mars-stroke": "\uf229", "fa-mars-stroke-v": "\uf22a", "fa-mars-stroke-h": "\uf22b", "fa-neuter": "\uf22c", "fa-genderless": "\uf22d", "fa-facebook-official": "\uf230", "fa-pinterest-p": "\uf231", "fa-whatsapp": "\uf232", "fa-server": "\uf233", "fa-user-plus": "\uf234", "fa-user-times": "\uf235", "fa-bed": "\uf236", "fa-viacoin": "\uf237", "fa-train": "\uf238", "fa-subway": "\uf239", "fa-medium": "\uf23a", "fa-y-combinator": "\uf23b", "fa-optin-monster": "\uf23c", "fa-opencart": "\uf23d", "fa-expeditedssl": "\uf23e", "fa-battery-full": "\uf240", "fa-battery-three-quarters": "\uf241", "fa-battery-half": "\uf242", "fa-battery-quarter": "\uf243", "fa-battery-empty": "\uf244", "fa-mouse-pointer": "\uf245", "fa-i-cursor": "\uf246", "fa-object-group": "\uf247", "fa-object-ungroup": "\uf248", "fa-sticky-note": "\uf249", "fa-sticky-note-o": "\uf24a", "fa-cc-jcb": "\uf24b", "fa-cc-diners-club": "\uf24c", "fa-clone": "\uf24d", "fa-balance-scale": "\uf24e", "fa-hourglass-o": "\uf250", "fa-hourglass-start": "\uf251", "fa-hourglass-half": "\uf252", "fa-hourglass-end": "\uf253", "fa-hourglass": "\uf254", "fa-hand-rock-o": "\uf255", "fa-hand-paper-o": "\uf256", "fa-hand-scissors-o": "\uf257", "fa-hand-lizard-o": "\uf258", "fa-hand-spock-o": "\uf259", "fa-hand-pointer-o": "\uf25a", "fa-hand-peace-o": "\uf25b", "fa-trademark": "\uf25c", "fa-registered": "\uf25d", "fa-creative-commons": "\uf25e", "fa-gg": "\uf260", "fa-gg-circle": "\uf261", "fa-tripadvisor": "\uf262", "fa-odnoklassniki": "\uf263", "fa-odnoklassniki-square": "\uf264", "fa-get-pocket": "\uf265", "fa-wikipedia-w": "\uf266", "fa-safari": "\uf267", "fa-chrome": "\uf268", "fa-firefox": "\uf269", "fa-opera": "\uf26a", "fa-internet-explorer": "\uf26b", "fa-television": "\uf26c", "fa-contao": "\uf26d", "fa-500px": "\uf26e", "fa-amazon": "\uf270", "fa-calendar-plus-o": "\uf271", "fa-calendar-minus-o": "\uf272", "fa-calendar-times-o": "\uf273", "fa-calendar-check-o": "\uf274", "fa-industry": "\uf275", "fa-map-pin": "\uf276", "fa-map-signs": "\uf277", "fa-map-o": "\uf278", "fa-map": "\uf279", "fa-commenting": "\uf27a", "fa-commenting-o": "\uf27b", "fa-houzz": "\uf27c", "fa-vimeo": "\uf27d", "fa-black-tie": "\uf27e", "fa-fonticons": "\uf280" };
    return faCodeMap[key];
}

//  Template   ---
//  https://github.com/Matt-Esch/string-template (MIT)
const nargs = /\{([0-9a-zA-Z_\s\[\]]+)\}/g;

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

    return tpl.replace(nargs, function replaceArg(match, i, index) {
        let result;

        if (tpl[index - 1] === "{" &&
            tpl[index + match.length] === "}") {
            return i;
        } else {
            result = args.hasOwnProperty(i) ? args[i] : null;
            if (result === null || result === undefined) {
                return "";
            }

            return result;
        }
    });
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
            // tslint:disable-next-line:object-literal-shorthand
            createElement: function (_tagName) {
                return {
                    get __data__() { return this.row; },
                    set __data__(_) { this.row = array[this.index] = _; }
                };
            },
            // tslint:disable-next-line:object-literal-shorthand
            createElementNS: function (_ns, tagName) {
                return this.createElement(tagName);
            }
        },
        // tslint:disable-next-line:object-literal-shorthand
        querySelectorAll: function (selectors) {
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
        // tslint:disable-next-line:object-literal-shorthand
        appendChild: function (node) {
            node.parentNode = this;
            node.index = array.length;
            array.push(null);
            return node;
        },
        // tslint:disable-next-line:object-literal-shorthand
        insertBefore: function (node, referenceNode) {
            const idx = array.indexOf(node.__data__);
            const refIdx = array.indexOf(referenceNode.__data__);
            if (idx > refIdx) {
                array.splice(refIdx, 0, array.splice(idx, 1)[0]);
            } else if (idx < refIdx - 1) {
                array.splice(refIdx - 1, 0, array.splice(idx, 1)[0]);
            }
            return node;
        },
        // tslint:disable-next-line:object-literal-shorthand
        removeChild: function (node) {
            array.splice(array.indexOf(node.__data__), 1);
            return node;
        }
    };
}

export function downloadBlob(format: "CSV" | "TSV" | "JSON" | "TEXT", blob, id?, ext?) {
    const currentdate = new Date();
    const timeFormat = d3TimeFormat("%Y-%m-%dT%H_%M_%S");
    const nowTime = timeFormat(currentdate);
    id = id || "data" + "_" + nowTime + "." + format.toLowerCase();

    const filename = id + (ext ? "." + ext : "");

    let mimeType = "";
    switch (format) {
        case "TSV":
            mimeType = "text/tab-seperated-values";
            break;
        case "JSON":
            mimeType = "application/json";
            break;
        case "CSV":
        case "TEXT":
        default:
            mimeType = "text/csv";
    }

    let a = document.createElement("a");
    if (navigator.msSaveBlob) { // IE10+
        a = null;
        return navigator.msSaveBlob(new Blob([blob], { type: mimeType }), filename);
    } else if ("download" in a) { // html 5
        a.href = "data:" + mimeType + "," + encodeURIComponent(blob);
        a.setAttribute("download", filename);
        document.body.appendChild(a);
        setTimeout(function () {
            a.click();
            document.body.removeChild(a);
        }, 10);
        return true;
    } else { // old chrome and FF:
        a = null;
        const frame = document.createElement("iframe");
        document.body.appendChild(frame);
        frame.src = "data:" + mimeType + "," + encodeURIComponent(blob);

        setTimeout(function () {
            document.body.removeChild(frame);
        }, 100);
        return true;
    }
}
export function downloadBlob2(blob, id?, ext?) {
    const currentdate = new Date();
    const timeFormat = d3TimeFormat("%Y-%m-%dT%H_%M_%S");
    const nowTime = timeFormat(currentdate);
    id = id || "data" + "_" + nowTime + ".png";

    const filename = id + (ext ? "." + ext : "");
    let a = document.createElement("a");
    if (navigator.msSaveBlob) { // IE10+
        a = null;
        return navigator.msSaveBlob(new Blob([blob], { type: blob.type }), filename);
    } else if ("download" in a) { // html 5
        a.href = URL.createObjectURL(blob);
        a.setAttribute("download", filename);
        document.body.appendChild(a);
        setTimeout(function () {
            a.click();
            document.body.removeChild(a);
        }, 10);
        return true;
    } else { // old chrome and FF:
        a = null;
        const frame = document.createElement("iframe");
        document.body.appendChild(frame);
        frame.src = "data:" + blob.mimeType + "," + encodeURIComponent(blob);

        setTimeout(function () {
            document.body.removeChild(frame);
        }, 100);
        return true;
    }
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

export function removeHTMLFromString(str: string, div?: HTMLDivElement) {
    div = div ? div : document.createElement("div");
    div.innerHTML = str;
    return div.textContent || div.innerText || "";
}
