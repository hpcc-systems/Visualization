import { Vertex } from "@hpcc-js/graph";
import { isArray } from "@hpcc-js/util";
import { IMovie, IPerson } from "./IMDBServer";

/**
 * The IMDBVertex abstract base class provides common implementations of:
 * * Default styling.
 * * Annotation addition and styling (different when expanded / contracted).
 * * Tooltip formatting.
 */
export abstract class IMDBVertex extends Vertex {

    constructor() {
        super();
        this
            .icon_diameter(60)
            .icon_shape_colorStroke("transparent")
            .icon_shape_colorFill("transparent")
            .icon_image_colorFill("#333333")
            .iconAnchor("middle")
            .textbox_shape_colorStroke("transparent")
            .textbox_shape_colorFill("white")
            .textbox_text_colorFill("#333333")
            ;
    }

    private _expanded = false;
    /**
     * Mark any vertex as expanded.  When expanded the annotations will render
     * "hollow" as a visual indicator to the user that the node has been expanded:
     */
    expanded(): boolean;
    expanded(_: boolean): this;
    expanded(_?: boolean): this | boolean {
        if (!arguments.length) return this._expanded;
        this._expanded = _;
        this.annotationIcons().forEach(ai => {
            ai.shape_colorFill = this._expanded ? "white" : ai.shape_colorStroke;
            ai.image_colorFill = this._expanded ? ai.shape_colorStroke : "white";
        });
        return this;
    }

    /**
     * Append a new annotation, default to "filled" to indicate that it has not
     * been expanded.
     * @param linkCount number of external links.  Numbers > 10 will be displayed
     * as a "*"
     * @param shape_color Rectangle color
     * @param image_color Icon/Text color
     */
    protected appendAnnotation(linkCount: number, tooltip, shape_color, image_color) {
        if (linkCount) {
            this.annotationIcons().push({
                faChar: linkCount < 10 ? "" + linkCount : "*",
                tooltip,
                shape_colorFill: shape_color,
                shape_colorStroke: shape_color,
                image_colorFill: image_color
            });
        }
    }

    /**
     * Tooltip html generator, creates a two column HTML table with a single header.
     * @param titleKey ID of key in obj to use as the title
     * @param obj Key/Value object containgin data to display in the table
     * @returns String containing HTML formatted table
     */
    protected calcTooltip(titleKey: string, obj: object): string {
        let body = "";
        for (const key in obj) {
            if (key !== titleKey) {
                const value = isArray(obj[key]) ? isArray.length : obj[key];
                body += `<tr><td>${key}</td><td style="font-weight:normal">${value}</td></tr>`;
            }
        }
        return `<table>
                    <thead>
                        <tr><th colspan="2" style="font-weight:bold;font-size:16px">${obj[titleKey]}</th></tr>
                    </thead>
                    <tbody>
                        ${body}
                    </tbody>
                </table>`;
    }

    /**
     * Abstract method which all specific IMDB vertices must implement.
     */
    abstract tooltipHTML(): string;
}

/**
 * The MovieVertex represents a single movie as a vertex (node) in the graph
 */
export class MovieVertex extends IMDBVertex {

    private _info: IMovie;

    /**
     * Instantiated with the Movie data from the server
     * @param info Movie data payload
     */
    constructor(info: IMovie) {
        super();
        this._info = info;
        this
            .faChar("") // See https://fontawesome.com/v4.7.0/cheatsheet/ for more choices
            .text(this._info.title)
            ;
        this.appendAnnotation(this._info.directors.length, "Directors", "navy", "white");
        this.appendAnnotation(this._info.actors.length, "Actors", "darkgreen", "white");
    }

    /**
     * Vertex info
     * @returns Movie data payload
     */
    info(): IMovie {
        return this._info;
    }

    /**
     * Format custom tooltip for movie
     */
    tooltipHTML(): string {
        return super.calcTooltip("Title", {
            "Title": this._info.title,
            "Rank": this._info.rank,
            "Year": this._info.year,
            "Runtime (minutes)": this._info.runtime,
            "Revenue (millions)": this._info.revenue
        });
    }
}

/**
 * The PersonVertex represents a single person as a vertex (node) in the graph
 */
export class PersonVertex extends IMDBVertex {

    private _info: IPerson;

    /**
     * Instantiated with the Person data from the server
     * @param info Person data payload
     */
    constructor(info: IPerson) {
        super();
        this._info = info;
        this
            .faChar("") // See https://fontawesome.com/v4.7.0/cheatsheet/ for more choices
            .text(this._info.name)
            ;
        this.appendAnnotation(this._info.directed.length, "Directed", "navy", "white");
        this.appendAnnotation(this._info.acted.length, "Acted", "darkgreen", "white");
    }

    /**
     * Vertex info
     * @returns Movie data payload
     */
    info(): IPerson {
        return this._info;
    }

    /**
     * Format custom tooltip for movie
     */
    tooltipHTML(): string {
        return super.calcTooltip("Name", {
            "Name": this._info.name,
            "Directed": this._info.directed,
            "Acted in": this._info.acted
        });
    }
}
