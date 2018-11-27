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
import { Element as ModelElement, State } from "./model/element";
import { Visualization } from "./model/visualization";

class PipelinePanel extends ChartPanel {
    _owner: PipelineSplitPanel;

    datasource = new SelectionButton().faChar("fa-database").tooltip("Datasource").selected(true);
    filter = new SelectionButton().faChar("fa-filter").tooltip("Filter");
    project = new SelectionButton().faChar("fa-random").tooltip("Project");
    groupBy = new SelectionButton().faChar("fa-object-group").tooltip("Group By");
    sort = new SelectionButton().faChar("fa-sort-alpha-asc").tooltip("Sort");
    limit = new SelectionButton().faChar("fa-list-ol").tooltip("Limit");
    mappings = new SelectionButton().faChar("fa-random").tooltip("Mappings");
    chartPanel = new SelectionButton().faChar("fa-area-chart").tooltip("Visualization");
    state = new SelectionButton().faChar("fa-check-square-o").tooltip("State");
    debug = new SelectionButton().faChar("fa-bug").tooltip("Debug");
    all = new SelectionButton().faChar("fa-list").tooltip("All");

    _propEditor: PropertyEditor = new PropertyEditor()
        .show_header(false)
        .show_settings(false)
        .showFields(false)
        ;

    _pipelineButton: SelectionButton = this.datasource;
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
            this.title(sb.tooltip()).render();
        });

    constructor(owner: PipelineSplitPanel) {
        super();
        this._owner = owner;
        this.buttons([this._pipelineSelection]);
        this.title(this.datasource.tooltip());
        super.widget(this._propEditor);
        this._propEditor.monitor((id: string, newValue: any, oldValue: any, source: PropertyExt) => {
            if (source !== this._propEditor) {
                this.propChanged(id, newValue, oldValue, source);
            }
        });
    }

    selectionButtons(): SelectionButton[] {
        return this._pipelineSelection.buttons().filter(b => b instanceof SelectionButton) as SelectionButton[];
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

    private peAsChartPanel(): ChartPanel {
        if (this._propExt instanceof ChartPanel) {
            return this._propExt;
        } else if (this._propExt instanceof ModelElement) {
            return this._propExt.visualization().chartPanel();
        } else if (this._propExt instanceof Visualization) {
            return this._propExt.chartPanel();
        }
    }

    private peAsState(): State {
        if (this._propExt instanceof State) {
            return this._propExt;
        } else if (this._propExt instanceof ModelElement) {
            return this._propExt.state();
        }
    }

    selectionButton(): SelectionButton {
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

    updateState() {
        this.selectionButtons().forEach(sb => {
            switch (sb) {
                case this.datasource:
                    sb.enabled(!!this.peAsDatasource());
                    break;
                case this.filter:
                    sb.enabled(!!this.peAsFilter());
                    break;
                case this.project:
                    sb.enabled(!!this.peAsProject());
                    break;
                case this.groupBy:
                    sb.enabled(!!this.peAsGroupBy());
                    break;
                case this.sort:
                    sb.enabled(!!this.peAsSort());
                    break;
                case this.limit:
                    sb.enabled(!!this.peAsLimit());
                    break;
                case this.mappings:
                    sb.enabled(!!this.peAsMappings());
                    break;
                case this.chartPanel:
                    sb.enabled(!!this.peAsChartPanel());
                    break;
                case this.state:
                    sb.enabled(!!this.peAsState());
                    break;
                case this.debug:
                    sb.enabled(false);
                    break;
                case this.all:
                    sb.enabled(!!this._propExt);
                    break;
            }
            if (sb.selected()) {
                this.title(sb.enabled() ? sb.tooltip() : "");
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
