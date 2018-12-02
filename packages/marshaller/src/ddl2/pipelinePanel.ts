import { PropertyExt, SelectionBar, SelectionButton, Spacer } from "@hpcc-js/common";
import { DatasourceTable } from "@hpcc-js/dgrid";
import { ChartPanel } from "@hpcc-js/layout";
import { PropertyEditor } from "@hpcc-js/other";
import { SplitPanel } from "@hpcc-js/phosphor";
import { Activity } from "./activities/activity";
import { DatasourceAdapt } from "./activities/databomb";
import { Datasource } from "./activities/datasource";
import { DSPicker } from "./activities/dspicker";
import { Filters } from "./activities/filter";
import { GroupBy } from "./activities/groupby";
import { Limit } from "./activities/limit";
import { Mappings, Project } from "./activities/project";
import { Sort } from "./activities/sort";
import { Element as ModelElement, IElementError, State } from "./model/element";
import { Visualization } from "./model/visualization";

import "../../src/ddl2/pipelinePanel.css";

class PipelineSelectionButton extends SelectionButton {

    _label: string;
    label(): string;
    label(_: string): this;
    label(_?: string): string | this {
        if (!arguments.length) return this._label;
        this._label = _;
        this.tooltip(_);
        return this;
    }

    _elementErrors: IElementError[] = [];
    errors(): IElementError[];
    errors(_: IElementError[]): this;
    errors(_?: IElementError[]): IElementError[] | this {
        if (!arguments.length) return this._elementErrors;
        this._elementErrors = _;
        this.classed("error", _.length > 0);
        // this.element().classed("error", _.length > 0);
        if (_.length) {
            this.tooltip(_.map(err => {
                const errSourceParts = err.source.split(".");
                errSourceParts.splice(0, 1);
                return `${errSourceParts.join(".")}:  ${err.msg}`;
            }).join("\n"));
        } else {
            this.tooltip(this._label);
        }
        this.render();
        return this;
    }
}

class PipelinePanel extends ChartPanel {
    _owner: PipelineSplitPanel;

    datasource = new PipelineSelectionButton().faChar("fa-database").label("Datasource").selected(true);
    filter = new PipelineSelectionButton().faChar("fa-filter").label("Filter");
    project = new PipelineSelectionButton().faChar("fa-random").label("Project");
    groupBy = new PipelineSelectionButton().faChar("fa-object-group").label("Group By");
    sort = new PipelineSelectionButton().faChar("fa-sort-alpha-asc").label("Sort");
    limit = new PipelineSelectionButton().faChar("fa-list-ol").label("Limit");
    mappings = new PipelineSelectionButton().faChar("fa-random").label("Mappings");
    chartPanel = new PipelineSelectionButton().faChar("fa-area-chart").label("Visualization");
    state = new PipelineSelectionButton().faChar("fa-check-square-o").label("State");
    debug = new PipelineSelectionButton().faChar("fa-bug").label("Debug");
    all = new PipelineSelectionButton().faChar("fa-list").label("All");

    _propEditor: PropertyEditor = new PropertyEditor()
        .show_header(false)
        .show_settings(false)
        .showFields(false)
        ;

    _pipelineButton: PipelineSelectionButton = this.datasource;
    private _pipelineSelection = new SelectionBar()
        .buttons([
            this.datasource,
            this.filter,
            this.project,
            this.groupBy,
            this.sort,
            this.limit,
            new Spacer(),
            this.mappings,
            this.chartPanel,
            new Spacer(),
            this.state,
            this.debug,
            new Spacer(),
            this.all
        ]).on("selected", sb => {
            this._pipelineButton = sb;
            this.title(sb.label()).render();
        });

    constructor(owner: PipelineSplitPanel) {
        super();
        this._owner = owner;
        this.buttons([this._pipelineSelection]);
        this.title(this.datasource.label());
        super.widget(this._propEditor);
        this._propEditor.monitor((id: string, newValue: any, oldValue: any, source: PropertyExt) => {
            if (source !== this._propEditor) {
                this.propChanged(id, newValue, oldValue, source);
                this.updateState();
            }
        });
    }

    selectionButtons(): PipelineSelectionButton[] {
        return this._pipelineSelection.buttons().filter(b => b instanceof PipelineSelectionButton) as PipelineSelectionButton[];
    }

    private _propExt: PropertyExt;
    propExt(): PropertyExt;
    propExt(_: PropertyExt): this;
    propExt(_?: PropertyExt): PropertyExt | this {
        if (!arguments.length) return this._propExt;
        this._propExt = _;
        return this;
    }

    private peAsDatasource(): Datasource {
        if (this._propExt instanceof Datasource) {
            return this._propExt;
        } else if (this._propExt instanceof DSPicker) {
            return this._propExt;
        } else if (this._propExt instanceof ModelElement) {
            return this._propExt.hipiePipeline().datasource();
        }
    }

    private peAsFilter(): Filters {
        if (this._propExt instanceof Filters) {
            return this._propExt;
        } else if (this._propExt instanceof ModelElement) {
            return this._propExt.hipiePipeline().filters();
        }
    }

    private peAsProject(): Project {
        if (this._propExt instanceof Project) {
            return this._propExt;
        } else if (this._propExt instanceof ModelElement) {
            return this._propExt.hipiePipeline().project();
        }
    }

    private peAsGroupBy(): GroupBy {
        if (this._propExt instanceof GroupBy) {
            return this._propExt;
        } else if (this._propExt instanceof ModelElement) {
            return this._propExt.hipiePipeline().groupBy();
        }
    }

    private peAsSort(): Sort {
        if (this._propExt instanceof Sort) {
            return this._propExt;
        } else if (this._propExt instanceof ModelElement) {
            return this._propExt.hipiePipeline().sort();
        }
    }

    private peAsLimit(): Limit {
        if (this._propExt instanceof Limit) {
            return this._propExt;
        } else if (this._propExt instanceof ModelElement) {
            return this._propExt.hipiePipeline().limit();
        }
    }

    private peAsMappings(): Mappings {
        if (this._propExt instanceof Mappings) {
            return this._propExt;
        } else if (this._propExt instanceof ModelElement) {
            return this._propExt.visualization().mappings();
        } else if (this._propExt instanceof Visualization) {
            return this._propExt.mappings();
        }
    }

    private peAsChartPanel(): ChartPanel | Visualization {
        if (this._propExt instanceof ChartPanel) {
            return this._propExt;
        } else if (this._propExt instanceof Visualization) {
            return this._propExt;
        } else if (this._propExt instanceof ModelElement) {
            return this._propExt.visualization();
        }
    }

    private peAsState(): State {
        if (this._propExt instanceof State) {
            return this._propExt;
        } else if (this._propExt instanceof ModelElement) {
            return this._propExt.state();
        }
    }

    selectionButton(): PipelineSelectionButton {
        if (this._pipelineButton && this._pipelineButton.enabled()) {
            return this._pipelineButton;
        }
        for (const pb of this.selectionButtons()) {
            if (pb.enabled()) {
                pb.selected(true);
                return pb;
            }
        }
        return undefined;
    }

    _prevPropExt: PropertyExt;
    _prevPipelineButton: SelectionButton;
    update(domNode, element) {
        super.update(domNode, element);
        this.updateState();
        const pipelineButton = this.selectionButton();
        if (this._prevPropExt !== this._propExt || this._prevPipelineButton !== pipelineButton) {
            this._prevPropExt = this._propExt;
            this._prevPipelineButton = pipelineButton;
            if (this._propExt && pipelineButton) {
                switch (pipelineButton) {
                    case this.datasource:
                        this._propEditor.widget(this.peAsDatasource());
                        break;
                    case this.filter:
                        this._propEditor.widget(this.peAsFilter());
                        break;
                    case this.project:
                        this._propEditor.widget(this.peAsProject());
                        break;
                    case this.groupBy:
                        this._propEditor.widget(this.peAsGroupBy());
                        break;
                    case this.sort:
                        this._propEditor.widget(this.peAsSort());
                        break;
                    case this.limit:
                        this._propEditor.widget(this.peAsLimit());
                        break;
                    case this.mappings:
                        this._propEditor.widget(this.peAsMappings());
                        break;
                    case this.chartPanel:
                        this._propEditor.widget(this.peAsChartPanel());
                        break;
                    case this.state:
                        this._propEditor.widget(this.peAsState());
                        break;
                    case this.all:
                        this._propEditor.widget(this._propExt);
                        break;
                }
            } else {
                this._propEditor.widget(undefined);
            }
            this._owner.loadPreview(this._propEditor.widget());
        }
    }

    updateButtonState(pe, sb) {
        sb.enabled(!!pe);
        sb.errors(!!pe && pe.validate() || []);
    }

    updateState() {
        this.selectionButtons().forEach(sb => {
            switch (sb) {
                case this.datasource:
                    this.updateButtonState(this.peAsDatasource(), sb);
                    break;
                case this.filter:
                    this.updateButtonState(this.peAsFilter(), sb);
                    break;
                case this.project:
                    this.updateButtonState(this.peAsProject(), sb);
                    break;
                case this.groupBy:
                    this.updateButtonState(this.peAsGroupBy(), sb);
                    break;
                case this.sort:
                    this.updateButtonState(this.peAsSort(), sb);
                    break;
                case this.limit:
                    this.updateButtonState(this.peAsLimit(), sb);
                    break;
                case this.mappings:
                    this.updateButtonState(this.peAsMappings(), sb);
                    break;
                case this.chartPanel:
                    const cp = this.peAsChartPanel();
                    sb.enabled(!!cp);
                    break;
                case this.state:
                    const st = this.peAsState();
                    sb.enabled(!!st);
                    break;
                case this.debug:
                    sb.enabled(false);
                    break;
                case this.all:
                    sb.enabled(!!this._propExt);
                    break;
            }
            if (sb.selected()) {
                this.title(sb.enabled() ? sb.label() : "");
            }
        });
    }

    //  Events  ---
    propChanged(id: string, newValue: any, oldValue: any, source: PropertyExt) {
    }
}
PipelinePanel.prototype._class += " marshaller_PipelinePanel";

export class PipelineSplitPanel extends SplitPanel {
    private _rhsPropsPanel = new PipelinePanel(this).on("propChanged", (id: string, newValue: any, oldValue: any, source: PropertyExt) => {
        this.propChanged(id, newValue, oldValue, source);
    });
    private _rhsDataPreview = new DatasourceTable().pagination(true);

    constructor() {
        super();
        this
            .addWidget(this._rhsPropsPanel)
            .addWidget(this._rhsDataPreview)
            ;
    }

    loadDataProps(pe: PropertyExt) {
        this._rhsPropsPanel
            .propExt(pe)
            .render()
            ;
    }

    loadPreview(activity: undefined | PropertyExt) {
        activity = activity instanceof Visualization ? activity.mappings() : activity;
        this._rhsDataPreview
            .datasource(new DatasourceAdapt(activity instanceof Activity ? activity : undefined))
            .lazyRender()
            ;
    }

    refreshPreview() {
        const ds = this._rhsDataPreview.datasource() as DatasourceAdapt;
        if (ds) {
            ds.exec().then(() => {
                this._rhsDataPreview
                    .invalidate()
                    .lazyRender()
                    ;
            });
        }
    }

    //  Events  ---
    propChanged(id: string, newValue: any, oldValue: any, source: PropertyExt) {
    }
}
