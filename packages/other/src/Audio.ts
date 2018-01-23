import { HTMLWidget } from "@hpcc-js/common";
import { timer as d3Timer } from "d3-timer";

export class Audio extends HTMLWidget {
    _sections;

    constructor() {
        super();
        this._tag = "audio";

        this._sections = {};
    }

    section(label, offset, beatLength, beatCount) {
        if (!arguments.length) return this._sections;
        if (arguments.length === 1) return this._sections[label];
        this._sections[label] = {
            label,
            offset,
            beatLength,
            beatCount,
            endOffset: offset + beatCount * beatLength
        };
        return this;
    }

    getType(fileExt) {
        switch (fileExt) {
            case "mp3":
                return "audio/mpeg; codecs='mp3'";
            case "ogg":
                return "audio/ogg; codecs='vorbis'";
        }
        return "";
    }

    enter(domNode, element) {
        const context = this;
        element.on("play", function (d) { context.onPlay(d); });
    }

    update(domNode, element) {
        const source = element.selectAll("source").data(this.source(), function (d) { return d; });
        source.enter().append("source")
            .attr("src", function (d) { return d; })
            ;
    }

    createTimer(params, startTime, beat) {
        const context = this;
        d3Timer(function () {
            context.onTick(params.label, beat, params);
            return true;
        }, beat * params.beatLength, startTime + params.offset);
    }

    onTick(label, beat, params) {
    }

    onPlay(d) {
        const startTime = Date.now();
        for (const key in this._sections) {
            const section = this._sections[key];
            for (let i = 0; i < section.beatCount; ++i) {
                this.createTimer(section, startTime, i);
            }
        }
    }

    play(d) {
        const context = this;
        this._element.on("canplaythrough", function (d2) {
            context.node().play();
        });
        this.node().load();
    }

    source_exists: () => boolean;
}
Audio.prototype._class += " other_Audio";

export interface Audio {
    source(): string;
    source(_: string): this;
}
Audio.prototype.publish("source", "", "string", "Audio Source");
