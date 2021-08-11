import { Editor } from "@hpcc-js/codemirror";
import { Workunit } from "@hpcc-js/comms";
import { SplitPanel } from "@hpcc-js/phosphor";
import { DirectoryTree } from "@hpcc-js/tree";
import { hashSum, xml2json } from "@hpcc-js/util";

export class ECLArchiveViewer extends SplitPanel {
    private _prevHash;
    private _contentStr;
    public _directoryPane = new DirectoryTree();
    public _fileEditorPane = new Editor()
        .text("")
        ;

    constructor() {
        super("horizontal");
        this._directoryPane.rowClick = (text) => {
            this._fileEditorPane
                .text(text)
                .render()
                ;
        };
    }

    protected transformArchiveTreeData(json) {
        const ret = {
            label: json.name,
            children: json._children.map(transformNode).filter(n => n)
        };

        if (ret.children && ret.children[0] && ret.children[0].label === "html") {
            // must be parsererror
            return {
                label: "root",
                children: [
                    {
                        label: "error",
                        content: JSON.stringify(ret, null, 4)
                    }
                ]
            };
        }
        return ret;

        function transformNode(node) {
            const _node: any = {};
            _node.label = node.name + (node["$"] && node["$"].key ? ` (${node["$"].key})` : "");
            if (node._children && node._children.length > 0) {
                _node.children = node._children.map(_node => {
                    return transformNode(_node);
                })
                .filter(n => n)
                ;
            } else if (typeof node.content === "string" && node.content.trim()) {
                _node.content = node.content;
            } else {
                return false;
            }
            return _node;
        }
    }

    async updateDirectoryPane(contentStr) {
        let json;
        if (contentStr) {
            try {
                json = JSON.parse(contentStr);
            } catch (e) {
                json = await xml2json(contentStr);
            }
        }
        if (json) {
            const _data = this.transformArchiveTreeData(json);
            this._directoryPane
                .data(_data)
                .render()
                ;
        }
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this
            .addWidget(this._directoryPane)
            .addWidget(this._fileEditorPane)
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        const hash = hashSum({
            baseUrl: this.baseUrl(),
            wuid: this.wuid()
        });

        if (this._prevHash !== hash || typeof this._contentStr === "undefined") {
            Workunit.attach({ baseUrl: this.baseUrl() }, this.wuid())
                .fetchArchive()
                .then(resp => {

                    this._contentStr = resp;
                    this.updateDirectoryPane(this._contentStr);

                    this._prevHash = hash;
                });
        } else {
            this.updateDirectoryPane(this._contentStr);
        }

        this.relativeSizes([this.directoryWidthRatio(), 1 - this.directoryWidthRatio()]);
    }
}
ECLArchiveViewer.prototype._class += " eclwatch_ECLArchiveViewer";

export interface ECLArchiveViewer {
    directoryPaneColor(): string;
    directoryPaneColor(_: string): this;
    directoryPaneHoverColor(): string;
    directoryPaneHoverColor(_: string): this;
    fontColor(): string;
    fontColor(_: string): this;
    fontFamily(): string;
    fontFamily(_: string): this;
    fontSize(): number;
    fontSize(_: number): this;
    fileIconSize(): number;
    fileIconSize(_: number): this;
    folderIconOpen(): string;
    folderIconOpen(_: string): this;
    folderIconClosed(): string;
    folderIconClosed(_: string): this;
    textFileIcon(): string;
    textFileIcon(_: string): this;
    codeFileIcon(): string;
    codeFileIcon(_: string): this;
    verticalScroll(): boolean;
    verticalScroll(_: boolean): this;
    directoryWidthRatio(): number;
    directoryWidthRatio(_: number): this;
    baseUrl(): string;
    baseUrl(_: string): this;
    wuid(): string;
    wuid(_: string): this;
}
ECLArchiveViewer.prototype.publish("baseUrl", "", "string", "HPCC Platform Base URL");
ECLArchiveViewer.prototype.publish("wuid", "", "string", "Workunit ID");
ECLArchiveViewer.prototype.publish("directoryWidthRatio", 0.38, "number", "Default directory panel width ratio relative to the full width");
ECLArchiveViewer.prototype.publish("contentString", null, "string", "XML/JSON archive content string");
ECLArchiveViewer.prototype.publishProxy("directoryPaneColor", "_directoryPane", "backgroundColor");
ECLArchiveViewer.prototype.publishProxy("directoryPaneHoverColor", "_directoryPane", "hoverBackgroundColor");
ECLArchiveViewer.prototype.publishProxy("iconSize", "_directoryPane");
ECLArchiveViewer.prototype.publishProxy("fontColor", "_directoryPane");
ECLArchiveViewer.prototype.publishProxy("fontFamily", "_directoryPane");
ECLArchiveViewer.prototype.publishProxy("fontSize", "_directoryPane");
ECLArchiveViewer.prototype.publishProxy("folderIconOpen", "_directoryPane");
ECLArchiveViewer.prototype.publishProxy("folderIconClosed", "_directoryPane");
ECLArchiveViewer.prototype.publishProxy("textFileIcon", "_directoryPane");
ECLArchiveViewer.prototype.publishProxy("codeFileIcon", "_directoryPane");
ECLArchiveViewer.prototype.publishProxy("verticalScroll", "_directoryPane");
