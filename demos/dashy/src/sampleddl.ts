import { DDL1 } from "@hpcc-js/ddl-shim";

export const ddl: DDL1.DDLSchema = {
    dashboards: [
        {
            id: "Ins109_govottocustomerstatsdashboard",
            label: "govottocustomerstatsdashboard",
            title: "govottocustomerstatsdashboard",
            visualizations: [
                {
                    fields: [
                        {
                            id: "description",
                            properties: {
                                datatype: "string",
                                label: "description",
                                type: "string"
                            }
                        },
                        {
                            id: "summaryvalue",
                            properties: {
                                datatype: "string",
                                label: "summaryvalue",
                                type: "string"
                            }
                        },
                        {
                            id: "icon",
                            properties: {
                                datatype: "string",
                                label: "icon",
                                type: "string"
                            }
                        },
                        {
                            id: "moredescription",
                            properties: {
                                datatype: "string",
                                label: "moredescription",
                                type: "string"
                            }
                        },
                        {
                            id: "moreicon",
                            properties: {
                                datatype: "string",
                                label: "moreicon",
                                type: "string"
                            }
                        }
                    ],
                    id: "CustomerIdentityStats",
                    label: [
                        "description",
                        "summaryvalue",
                        "icon",
                        "moredescription",
                        "moreicon"
                    ],
                    properties: {
                        charttype: "TABLE"
                    },
                    source: {
                        id: "Ins109_dsOutput1",
                        mappings: {
                            value: [
                                "description",
                                "summaryvalue",
                                "icon",
                                "moredescription",
                                "moreicon"
                            ]
                        },
                        output: "View_CustomerIdentityStats"
                    },
                    title: "Customer Identity Stats",
                    type: "TABLE"
                },
                {
                    fields: [
                        {
                            id: "Base_COUNT",
                            properties: {
                                datatype: "integer",
                                type: "integer"
                            }
                        },
                        {
                            id: "person_count_",
                            properties: {
                                datatype: "integer8",
                                type: "integer8"
                            }
                        }
                    ],
                    id: "AddressIdentityCountDistribution",
                    properties: {
                        charttype: "AM_COLUMN"
                    },
                    source: {
                        id: "Ins109_dsOutput2",
                        mappings: {
                            x: [
                                "person_count_"
                            ],
                            y: [
                                "Base_COUNT"
                            ]
                        },
                        output: "View_AddressIdentityCountDistribution",
                        sort: [
                            "person_count_"
                        ]
                    },
                    title: "Address Identity Count Distribution",
                    type: "LINE"
                },
                {
                    fields: [
                        {
                            id: "event_date_",
                            properties: {
                                datatype: "unsigned4",
                                type: "unsigned4"
                            }
                        },
                        {
                            id: "Base_COUNT",
                            properties: {
                                datatype: "integer",
                                label: "rowcount",
                                type: "integer"
                            }
                        }
                    ],
                    id: "CalendarHeatmap",
                    label: [
                        "event_date_",
                        "rowcount"
                    ],
                    properties: {
                        charttype: "TABLE"
                    },
                    source: {
                        id: "Ins109_dsOutput3",
                        mappings: {
                            value: [
                                "event_date_",
                                "Base_COUNT"
                            ]
                        },
                        output: "View_CalendarHeatmap",
                        sort: [
                            "event_date_"
                        ]
                    },
                    title: "Calendar Heatmap",
                    type: "TABLE"
                },
                {
                    events: {
                        click: {
                            updates: [
                                {
                                    datasource: "Ins109_dsOutput4",
                                    instance: "Ins109",
                                    mappings: {
                                        event_year_month_: "event_year_month_"
                                    },
                                    merge: true,
                                    visualization: "TopLocations"
                                }
                            ]
                        }
                    },
                    fields: [
                        {
                            id: "Base_COUNT",
                            properties: {
                                datatype: "integer",
                                type: "integer"
                            }
                        },
                        {
                            id: "event_year_month_",
                            properties: {
                                datatype: "integer8",
                                type: "integer8"
                            }
                        }
                    ],
                    id: "EventTrend",
                    properties: {
                        charttype: "AM_COLUMN"
                    },
                    source: {
                        id: "Ins109_dsOutput3",
                        mappings: {
                            x: [
                                "event_year_month_"
                            ],
                            y: [
                                "Base_COUNT"
                            ]
                        },
                        output: "View_EventTrend",
                        sort: [
                            "event_year_month_"
                        ]
                    },
                    title: "Event Trend",
                    type: "LINE"
                },
                {
                    fields: [
                        {
                            id: "lat_long_id_",
                            properties: {
                                datatype: "string",
                                label: "lat_long_id_",
                                type: "string"
                            }
                        },
                        {
                            id: "latitude_",
                            properties: {
                                datatype: "real8",
                                label: "latitude_",
                                type: "real8"
                            }
                        },
                        {
                            id: "longitude_",
                            properties: {
                                datatype: "real8",
                                label: "longitude_",
                                type: "real8"
                            }
                        },
                        {
                            id: "full_address_",
                            properties: {
                                datatype: "string",
                                label: "full_address_",
                                type: "string"
                            }
                        },
                        {
                            id: "Base_COUNT",
                            properties: {
                                datatype: "integer",
                                type: "integer"
                            }
                        }
                    ],
                    id: "TopLocations",
                    label: [
                        "lat_long_id_",
                        "latitude_",
                        "longitude_",
                        "full_address_",
                        "rowcount"
                    ],
                    properties: {
                        charttype: "TABLE"
                    },
                    source: {
                        first: "200",
                        id: "Ins109_dsOutput4",
                        mappings: {
                            value: [
                                "lat_long_id_",
                                "latitude_",
                                "longitude_",
                                "full_address_",
                                "Base_COUNT"
                            ]
                        },
                        output: "View_TopLocations",
                        sort: [
                            "-Base_COUNT"
                        ]
                    },
                    title: "Top Locations",
                    type: "TABLE"
                },
                {
                    events: {
                        click: {
                            updates: [
                                {
                                    datasource: "Ins109_dsOutput1",
                                    instance: "Ins109",
                                    mappings: {
                                        customer_id_: "customer_id_",
                                        industry_type_: "industry_type_",
                                        source_customer_: "source_customer_"
                                    },
                                    merge: false,
                                    visualization: "CustomerIdentityStats"
                                },
                                {
                                    datasource: "Ins109_dsOutput2",
                                    instance: "Ins109",
                                    mappings: {
                                        customer_id_: "customer_id_",
                                        industry_type_: "industry_type_",
                                        source_customer_: "source_customer_"
                                    },
                                    merge: false,
                                    visualization: "AddressIdentityCountDistribution"
                                },
                                {
                                    datasource: "Ins109_dsOutput3",
                                    instance: "Ins109",
                                    mappings: {
                                        customer_id_: "customer_id_",
                                        industry_type_: "industry_type_",
                                        source_customer_: "source_customer_"
                                    },
                                    merge: false,
                                    visualization: "CalendarHeatmap"
                                },
                                {
                                    datasource: "Ins109_dsOutput3",
                                    instance: "Ins109",
                                    mappings: {
                                        customer_id_: "customer_id_",
                                        industry_type_: "industry_type_",
                                        source_customer_: "source_customer_"
                                    },
                                    merge: false,
                                    visualization: "EventTrend"
                                },
                                {
                                    datasource: "Ins109_dsOutput4",
                                    instance: "Ins109",
                                    mappings: {
                                        customer_id_: "customer_id_",
                                        industry_type_: "industry_type_",
                                        source_customer_: "source_customer_"
                                    },
                                    merge: false,
                                    visualization: "TopLocations"
                                }
                            ]
                        }
                    },
                    fields: [
                        {
                            id: "customer_id_",
                            properties: {
                                datatype: "string",
                                default: [
                                    "247949891"
                                ],
                                label: "customer_id_",
                                type: "string"
                            }
                        },
                        {
                            id: "industry_type_",
                            properties: {
                                datatype: "string",
                                default: [
                                    "0"
                                ],
                                label: "industry_type_",
                                type: "string"
                            }
                        },
                        {
                            id: "source_customer_",
                            properties: {
                                datatype: "string",
                                default: [
                                    "272"
                                ],
                                label: "source_customer_",
                                type: "string"
                            }
                        }
                    ],
                    id: "govottocustomerstatsFORM",
                    properties: {
                        allowEmptyRequest: true,
                        flyout: true
                    },
                    title: "GOV-Otto-CustomerStats Filter",
                    type: "FORM"
                }
            ]
        }
    ],
    datasources: [
        {
            URL: "http://10.241.100.159:8002/WsEcl/submit/query/roxie/prichajx_govottocustomerstats.Ins109_Service_1/json",
            filter: [
                {
                    fieldid: "customer_id_",
                    nullable: false,
                    rule: "=="
                },
                {
                    fieldid: "industry_type_",
                    nullable: false,
                    rule: "=="
                },
                {
                    fieldid: "source_customer_",
                    nullable: false,
                    rule: "=="
                },
                {
                    fieldid: "event_year_month_",
                    nullable: false,
                    rule: "=="
                }
            ],
            id: "Ins109_dsOutput4",
            outputs: [
                {
                    filter: [
                        {
                            fieldid: "customer_id_",
                            nullable: false,
                            rule: "=="
                        },
                        {
                            fieldid: "industry_type_",
                            nullable: false,
                            rule: "=="
                        },
                        {
                            fieldid: "source_customer_",
                            nullable: false,
                            rule: "=="
                        },
                        {
                            fieldid: "event_year_month_",
                            nullable: false,
                            rule: "=="
                        }
                    ],
                    from: "View_TopLocations",
                    id: "View_TopLocations",
                    notify: [
                        "TopLocations"
                    ]
                }
            ]
        },
        {
            URL: "http://10.241.100.159:8002/WsEcl/submit/query/roxie/prichajx_govottocustomerstats.Ins109_Service_1/json",
            filter: [
                {
                    fieldid: "customer_id_",
                    nullable: false,
                    rule: "=="
                },
                {
                    fieldid: "industry_type_",
                    nullable: false,
                    rule: "=="
                },
                {
                    fieldid: "source_customer_",
                    nullable: false,
                    rule: "=="
                }
            ],
            id: "Ins109_dsOutput3",
            outputs: [
                {
                    filter: [
                        {
                            fieldid: "customer_id_",
                            nullable: false,
                            rule: "=="
                        },
                        {
                            fieldid: "industry_type_",
                            nullable: false,
                            rule: "=="
                        },
                        {
                            fieldid: "source_customer_",
                            nullable: false,
                            rule: "=="
                        }
                    ],
                    from: "View_CalendarHeatmap",
                    id: "View_CalendarHeatmap",
                    notify: [
                        "CalendarHeatmap"
                    ]
                },
                {
                    filter: [
                        {
                            fieldid: "customer_id_",
                            nullable: false,
                            rule: "=="
                        },
                        {
                            fieldid: "industry_type_",
                            nullable: false,
                            rule: "=="
                        },
                        {
                            fieldid: "source_customer_",
                            nullable: false,
                            rule: "=="
                        }
                    ],
                    from: "View_EventTrend",
                    id: "View_EventTrend",
                    notify: [
                        "EventTrend"
                    ]
                }
            ]
        },
        {
            URL: "http://10.241.100.159:8002/WsEcl/submit/query/roxie/prichajx_govottocustomerstats.Ins109_Service_1/json",
            filter: [
                {
                    fieldid: "customer_id_",
                    nullable: false,
                    rule: "=="
                },
                {
                    fieldid: "industry_type_",
                    nullable: false,
                    rule: "=="
                },
                {
                    fieldid: "source_customer_",
                    nullable: false,
                    rule: "=="
                }
            ],
            id: "Ins109_dsOutput2",
            outputs: [
                {
                    filter: [
                        {
                            fieldid: "customer_id_",
                            nullable: false,
                            rule: "=="
                        },
                        {
                            fieldid: "industry_type_",
                            nullable: false,
                            rule: "=="
                        },
                        {
                            fieldid: "source_customer_",
                            nullable: false,
                            rule: "=="
                        }
                    ],
                    from: "View_AddressIdentityCountDistribution",
                    id: "View_AddressIdentityCountDistribution",
                    notify: [
                        "AddressIdentityCountDistribution"
                    ]
                }
            ]
        },
        {
            URL: "http://10.241.100.159:8002/WsEcl/submit/query/roxie/prichajx_govottocustomerstats.Ins109_Service_1/json",
            filter: [
                {
                    fieldid: "customer_id_",
                    nullable: false,
                    rule: "=="
                },
                {
                    fieldid: "industry_type_",
                    nullable: false,
                    rule: "=="
                },
                {
                    fieldid: "source_customer_",
                    nullable: false,
                    rule: "=="
                }
            ],
            id: "Ins109_dsOutput1",
            outputs: [
                {
                    filter: [
                        {
                            fieldid: "customer_id_",
                            nullable: false,
                            rule: "=="
                        },
                        {
                            fieldid: "industry_type_",
                            nullable: false,
                            rule: "=="
                        },
                        {
                            fieldid: "source_customer_",
                            nullable: false,
                            rule: "=="
                        }
                    ],
                    from: "View_CustomerIdentityStats",
                    id: "View_CustomerIdentityStats",
                    notify: [
                        "CustomerIdentityStats"
                    ]
                }
            ]
        }
    ],
    hipieversion: "1.10.1.1",
    visualizationversion: "v1.18.2"
};
