import { IDDL } from "@hpcc-js/ddl-shim";

export const ddl: IDDL = {
    dashboards: [
        {
            id: "Ins122_pro2dashboard",
            label: "pro2dashboard",
            title: "pro2dashboard",
            visualizations: [
                {
                    events: {
                        click: {
                            updates: [
                                {
                                    datasource: "Ins122_dsOutput1",
                                    instance: "Ins122",
                                    mappings: {
                                        year: "year"
                                    },
                                    merge: false,
                                    visualization: "t"
                                }
                            ]
                        }
                    },
                    fields: [
                        {
                            id: "year",
                            properties: {
                                datatype: "string",
                                default: [
                                    "2015"
                                ],
                                label: "year",
                                type: "string"
                            }
                        }
                    ],
                    id: "tFORM",
                    properties: {
                        allowEmptyRequest: true,
                        flyout: true
                    },
                    title: "t",
                    type: "FORM"
                },
                {
                    events: {
                        click: {
                            updates: [
                                {
                                    datasource: "Ins122_dsOutput1",
                                    instance: "Ins122",
                                    mappings: {
                                        workeroffice: "workeroffice"
                                    },
                                    merge: true,
                                    visualization: "b"
                                }
                            ]
                        }
                    },
                    fields: [
                        {
                            id: "bestprojectedlatency_AVE",
                            properties: {
                                datatype: "real",
                                function: "AVE",
                                label: "AVE(bestprojectedlatency)",
                                params: {
                                    param1: "bestprojectedlatency_SUM",
                                    param2: "Base_COUNT"
                                },
                                type: "real"
                            }
                        },
                        {
                            id: "workeroffice",
                            properties: {
                                datatype: "string",
                                label: "workeroffice",
                                type: "string"
                            }
                        }
                    ],
                    id: "t",
                    label: [
                        "AVE(bestprojectedlatency)",
                        "workeroffice"
                    ],
                    properties: {
                        charttype: "TABLE"
                    },
                    source: {
                        id: "Ins122_dsOutput1",
                        mappings: {
                            value: [
                                "bestprojectedlatency_AVE",
                                "workeroffice"
                            ]
                        },
                        output: "View_t"
                    },
                    title: "t",
                    type: "TABLE"
                },
                {
                    events: {
                        click: {
                            updates: [
                                {
                                    datasource: "Ins122_dsOutput1",
                                    instance: "Ins122",
                                    mappings: {
                                        quarter: "quarter"
                                    },
                                    merge: true,
                                    visualization: "c"
                                }
                            ]
                        }
                    },
                    fields: [
                        {
                            id: "bestprojectedlatency_AVE",
                            properties: {
                                datatype: "real",
                                function: "AVE",
                                params: {
                                    param1: "bestprojectedlatency_SUM",
                                    param2: "Base_COUNT"
                                },
                                type: "real"
                            }
                        },
                        {
                            id: "quarter",
                            properties: {
                                datatype: "string",
                                type: "string"
                            }
                        }
                    ],
                    id: "b",
                    properties: {
                        charttype: "AM_BAR"
                    },
                    source: {
                        id: "Ins122_dsOutput1",
                        mappings: {
                            x: [
                                "quarter"
                            ],
                            y: [
                                "bestprojectedlatency_AVE"
                            ]
                        },
                        output: "View_b"
                    },
                    title: "b",
                    type: "LINE"
                },
                {
                    fields: [
                        {
                            id: "bestprojectedlatency_AVE",
                            properties: {
                                datatype: "real",
                                function: "AVE",
                                params: {
                                    param1: "bestprojectedlatency_SUM",
                                    param2: "Base_COUNT"
                                },
                                type: "real"
                            }
                        },
                        {
                            id: "month",
                            properties: {
                                datatype: "string",
                                type: "string"
                            }
                        }
                    ],
                    id: "c",
                    properties: {
                        charttype: "AM_COLUMN"
                    },
                    source: {
                        id: "Ins122_dsOutput1",
                        mappings: {
                            x: [
                                "month"
                            ],
                            y: [
                                "bestprojectedlatency_AVE"
                            ]
                        },
                        output: "View_c"
                    },
                    title: "c",
                    type: "LINE"
                }
            ]
        }
    ],
    datasources: [
        {
            WUID: true,
            filter: [
                {
                    fieldid: "year",
                    nullable: false,
                    rule: "=="
                },
                {
                    fieldid: "workeroffice",
                    nullable: false,
                    rule: "=="
                },
                {
                    fieldid: "quarter",
                    nullable: false,
                    rule: "=="
                }
            ],
            id: "Ins122_dsOutput1",
            outputs: [
                {
                    filter: [
                        {
                            fieldid: "year",
                            nullable: false,
                            rule: "=="
                        }
                    ],
                    from: "Ins122_dsOutput1_View_t",
                    id: "View_t",
                    notify: [
                        "t"
                    ]
                },
                {
                    filter: [
                        {
                            fieldid: "workeroffice",
                            nullable: false,
                            rule: "=="
                        }
                    ],
                    from: "Ins122_dsOutput1_View_b",
                    id: "View_b",
                    notify: [
                        "b"
                    ]
                },
                {
                    filter: [
                        {
                            fieldid: "quarter",
                            nullable: false,
                            rule: "=="
                        }
                    ],
                    from: "Ins122_dsOutput1_View_c",
                    id: "View_c",
                    notify: [
                        "c"
                    ]
                }
            ]
        }
    ],
    hipieversion: "1.9.0",
    visualizationversion: "v1.16.0-rc1"
};
