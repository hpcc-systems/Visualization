/* tslint:disable */
export const ddlSchema =  
{
    "type": "object",
    "properties": {
        "dashboards": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/IDashboard"
            }
        },
        "datasources": {
            "type": "array",
            "items": {
                "anyOf": [
                    {
                        "$ref": "#/definitions/IWorkunitDatasource"
                    },
                    {
                        "$ref": "#/definitions/IDatabombDatasource"
                    },
                    {
                        "$ref": "#/definitions/IHipieDatasource"
                    }
                ]
            }
        },
        "hipieversion": {
            "type": "string"
        },
        "visualizationversion": {
            "type": "string"
        }
    },
    "additionalProperties": false,
    "required": [
        "dashboards",
        "datasources",
        "hipieversion",
        "visualizationversion"
    ],
    "definitions": {
        "IDashboard": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "enable": {
                    "type": "string"
                },
                "label": {
                    "type": "string"
                },
                "primary": {
                    "type": "boolean"
                },
                "visualizations": {
                    "type": "array",
                    "items": {
                        "anyOf": [
                            {
                                "$ref": "#/definitions/IPieVisualization"
                            },
                            {
                                "$ref": "#/definitions/ILineVisualization"
                            },
                            {
                                "$ref": "#/definitions/IChoroVisualization"
                            },
                            {
                                "$ref": "#/definitions/ITableVisualization"
                            },
                            {
                                "$ref": "#/definitions/ISliderVisualization"
                            },
                            {
                                "$ref": "#/definitions/IGraphVisualization"
                            },
                            {
                                "$ref": "#/definitions/IHeatMapVisualization"
                            },
                            {
                                "$ref": "#/definitions/IFormVisualization"
                            }
                        ]
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "visualizations"
            ]
        },
        "IPieVisualization": {
            "type": "object",
            "properties": {
                "type": {
                    "enum": [
                        "BAR",
                        "PIE"
                    ],
                    "type": "string"
                },
                "source": {
                    "$ref": "#/definitions/IPieSource"
                },
                "id": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    }
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {},
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    }
                },
                "events": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    }
                },
                "onSelect": {},
                "color": {}
            },
            "additionalProperties": false,
            "required": [
                "id",
                "source",
                "title",
                "type"
            ]
        },
        "IPieSource": {
            "type": "object",
            "properties": {
                "mappings": {
                    "$ref": "#/definitions/IPieMapping"
                },
                "id": {
                    "type": "string"
                },
                "output": {
                    "type": "string"
                },
                "sort": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "first": {
                    "type": "number"
                },
                "reverse": {
                    "type": "boolean"
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "id",
                "mappings",
                "output"
            ]
        },
        "IPieMapping": {
            "type": "object",
            "properties": {
                "label": {
                    "type": "string"
                },
                "weight": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "label",
                "weight"
            ]
        },
        "IVisualizationField": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "properties": {
                    "type": "object",
                    "properties": {
                        "label": {
                            "type": "string"
                        },
                        "datatype": {
                            "$ref": "#/definitions/VisualizationFieldDataType"
                        },
                        "default": {
                            "type": "array",
                            "items": {}
                        },
                        "function": {
                            "$ref": "#/definitions/VisualizationFieldFuncitonType"
                        },
                        "params": {
                            "type": "object",
                            "properties": {
                                "param1": {
                                    "type": "string"
                                },
                                "param2": {
                                    "type": "string"
                                }
                            },
                            "additionalProperties": false,
                            "required": [
                                "param1",
                                "param2"
                            ]
                        },
                        "type": {
                            "$ref": "#/definitions/VisualizationFieldType"
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "datatype",
                        "type"
                    ]
                }
            },
            "additionalProperties": false,
            "required": [
                "id",
                "properties"
            ]
        },
        "VisualizationFieldDataType": {
            "enum": [
                "bool",
                "boolean",
                "dataset",
                "date",
                "double",
                "float",
                "geohash",
                "integer",
                "real",
                "string",
                "time",
                "unsigned",
                "visualization"
            ],
            "type": "string"
        },
        "VisualizationFieldFuncitonType": {
            "enum": [
                "AVE",
                "MAX",
                "MIN",
                "SCALE",
                "SUM"
            ],
            "type": "string"
        },
        "VisualizationFieldType": {
            "enum": [
                "bool",
                "boolean",
                "dataset",
                "date",
                "double",
                "float",
                "geohash",
                "integer",
                "range",
                "real",
                "string",
                "time",
                "unsigned",
                "visualization"
            ],
            "type": "string"
        },
        "IEvent": {
            "type": "object",
            "properties": {
                "mappings": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                },
                "updates": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IEventUpdate"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "updates"
            ]
        },
        "IEventUpdate": {
            "type": "object",
            "properties": {
                "visualization": {
                    "type": "string"
                },
                "instance": {
                    "type": "string"
                },
                "datasource": {
                    "type": "string"
                },
                "col": {
                    "type": "string"
                },
                "merge": {
                    "type": "boolean"
                },
                "mappings": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "datasource",
                "merge",
                "visualization"
            ]
        },
        "ILineVisualization": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "LINE"
                    ]
                },
                "source": {
                    "$ref": "#/definitions/ILineSource"
                },
                "id": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    }
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {},
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    }
                },
                "events": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    }
                },
                "onSelect": {},
                "color": {}
            },
            "additionalProperties": false,
            "required": [
                "id",
                "source",
                "title",
                "type"
            ]
        },
        "ILineSource": {
            "type": "object",
            "properties": {
                "mappings": {
                    "$ref": "#/definitions/ILineMapping"
                },
                "id": {
                    "type": "string"
                },
                "output": {
                    "type": "string"
                },
                "sort": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "first": {
                    "type": "number"
                },
                "reverse": {
                    "type": "boolean"
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "id",
                "mappings",
                "output"
            ]
        },
        "ILineMapping": {
            "type": "object",
            "properties": {
                "x": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "y": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "x",
                "y"
            ]
        },
        "IChoroVisualization": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "CHORO"
                    ]
                },
                "source": {
                    "$ref": "#/definitions/IChoroSource"
                },
                "visualizations": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IChoroVisualization"
                    }
                },
                "color": {
                    "$ref": "#/definitions/ChoroColor"
                },
                "id": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    }
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {},
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    }
                },
                "events": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    }
                },
                "onSelect": {}
            },
            "additionalProperties": false,
            "required": [
                "id",
                "source",
                "title",
                "type"
            ]
        },
        "IChoroSource": {
            "type": "object",
            "properties": {
                "mappings": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/IChoroUSStateMapping"
                        },
                        {
                            "$ref": "#/definitions/IChoroUSCountyMapping"
                        },
                        {
                            "$ref": "#/definitions/IChoroGeohashMapping"
                        }
                    ]
                },
                "id": {
                    "type": "string"
                },
                "output": {
                    "type": "string"
                },
                "sort": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "first": {
                    "type": "number"
                },
                "reverse": {
                    "type": "boolean"
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "id",
                "mappings",
                "output"
            ]
        },
        "IChoroUSStateMapping": {
            "type": "object",
            "properties": {
                "state": {
                    "type": "string"
                },
                "weight": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        {
                            "type": "string"
                        }
                    ]
                }
            },
            "additionalProperties": false,
            "required": [
                "state",
                "weight"
            ]
        },
        "IChoroUSCountyMapping": {
            "type": "object",
            "properties": {
                "county": {
                    "type": "string"
                },
                "weight": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        {
                            "type": "string"
                        }
                    ]
                }
            },
            "additionalProperties": false,
            "required": [
                "county",
                "weight"
            ]
        },
        "IChoroGeohashMapping": {
            "type": "object",
            "properties": {
                "geohash": {
                    "type": "string"
                },
                "weight": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        {
                            "type": "string"
                        }
                    ]
                }
            },
            "additionalProperties": false,
            "required": [
                "geohash",
                "weight"
            ]
        },
        "ChoroColor": {
            "enum": [
                "Blues",
                "BrBG",
                "BuGn",
                "BuPu",
                "GnBu",
                "Greens",
                "Greys",
                "OrRd",
                "Oranges",
                "PRGn",
                "PiYG",
                "PuBu",
                "PuBuGn",
                "PuOr",
                "PuRd",
                "Purples",
                "RdBu",
                "RdGy",
                "RdPu",
                "RdWhGr",
                "RdYlBu",
                "RdYlGn",
                "Reds",
                "Spectral",
                "YlGn",
                "YlGnBu",
                "YlOrBr",
                "YlOrRd",
                "default"
            ],
            "type": "string"
        },
        "ITableVisualization": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "TABLE"
                    ]
                },
                "label": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "source": {
                    "$ref": "#/definitions/ITableSource"
                },
                "id": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    }
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {},
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    }
                },
                "events": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    }
                },
                "onSelect": {},
                "color": {}
            },
            "additionalProperties": false,
            "required": [
                "id",
                "label",
                "source",
                "title",
                "type"
            ]
        },
        "ITableSource": {
            "type": "object",
            "properties": {
                "mappings": {
                    "$ref": "#/definitions/ITableMapping"
                },
                "id": {
                    "type": "string"
                },
                "output": {
                    "type": "string"
                },
                "sort": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "first": {
                    "type": "number"
                },
                "reverse": {
                    "type": "boolean"
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "id",
                "mappings",
                "output"
            ]
        },
        "ITableMapping": {
            "type": "object",
            "properties": {
                "value": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "value"
            ]
        },
        "ISliderVisualization": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "SLIDER"
                    ]
                },
                "range": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    }
                },
                "id": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    }
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {},
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    }
                },
                "events": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    }
                },
                "onSelect": {},
                "color": {}
            },
            "additionalProperties": false,
            "required": [
                "id",
                "title",
                "type"
            ]
        },
        "IGraphVisualization": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "GRAPH"
                    ]
                },
                "source": {
                    "$ref": "#/definitions/IGraphSource"
                },
                "label": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "icon": {
                    "$ref": "#/definitions/IVisualizationIcon"
                },
                "flag": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IVisualizationIcon"
                    }
                },
                "id": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    }
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {},
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    }
                },
                "events": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    }
                },
                "onSelect": {},
                "color": {}
            },
            "additionalProperties": false,
            "required": [
                "flag",
                "icon",
                "id",
                "label",
                "source",
                "title",
                "type"
            ]
        },
        "IGraphSource": {
            "type": "object",
            "properties": {
                "mappings": {
                    "$ref": "#/definitions/IGraphMapping"
                },
                "link": {
                    "$ref": "#/definitions/IGraphLink"
                },
                "id": {
                    "type": "string"
                },
                "output": {
                    "type": "string"
                },
                "sort": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "first": {
                    "type": "number"
                },
                "reverse": {
                    "type": "boolean"
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "id",
                "link",
                "mappings",
                "output"
            ]
        },
        "IGraphMapping": {
            "type": "object",
            "properties": {
                "uid": {
                    "type": "string"
                },
                "label": {
                    "type": "string"
                },
                "weight": {
                    "type": "string"
                },
                "flags": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "flags",
                "label",
                "uid",
                "weight"
            ]
        },
        "IGraphLink": {
            "type": "object",
            "properties": {
                "mappings": {
                    "$ref": "#/definitions/IGraphLinkMapping"
                },
                "childfile": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "childfile",
                "mappings"
            ]
        },
        "IGraphLinkMapping": {
            "type": "object",
            "properties": {
                "uid": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "uid"
            ]
        },
        "IVisualizationIcon": {
            "type": "object",
            "properties": {
                "faChar": {
                    "type": "string"
                },
                "fieldid": {
                    "type": "string"
                },
                "valuemappings": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "faChar"
            ]
        },
        "IHeatMapVisualization": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "HEAT_MAP"
                    ]
                },
                "source": {
                    "$ref": "#/definitions/IHeatMapSource"
                },
                "id": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    }
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {},
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    }
                },
                "events": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    }
                },
                "onSelect": {},
                "color": {}
            },
            "additionalProperties": false,
            "required": [
                "id",
                "source",
                "title",
                "type"
            ]
        },
        "IHeatMapSource": {
            "type": "object",
            "properties": {
                "mappings": {
                    "$ref": "#/definitions/IHeatMapMapping"
                },
                "id": {
                    "type": "string"
                },
                "output": {
                    "type": "string"
                },
                "sort": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "first": {
                    "type": "number"
                },
                "reverse": {
                    "type": "boolean"
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "id",
                "mappings",
                "output"
            ]
        },
        "IHeatMapMapping": {
            "type": "object",
            "properties": {
                "x": {
                    "type": "string"
                },
                "y": {
                    "type": "string"
                },
                "weight": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "weight",
                "x",
                "y"
            ]
        },
        "IFormVisualization": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "FORM"
                    ]
                },
                "id": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    }
                },
                "properties": {
                    "type": "object",
                    "additionalProperties": {},
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    }
                },
                "events": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    }
                },
                "onSelect": {},
                "color": {}
            },
            "additionalProperties": false,
            "required": [
                "id",
                "title",
                "type"
            ]
        },
        "IWorkunitDatasource": {
            "type": "object",
            "properties": {
                "WUID": {
                    "type": "boolean"
                },
                "id": {
                    "type": "string"
                },
                "filter": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IFilter"
                    }
                },
                "outputs": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IOutput"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "WUID",
                "id",
                "outputs"
            ]
        },
        "IFilter": {
            "type": "object",
            "properties": {
                "fieldid": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean"
                },
                "rule": {
                    "$ref": "#/definitions/IFilterRule"
                },
                "minid": {
                    "type": "string"
                },
                "maxid": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "fieldid",
                "nullable",
                "rule"
            ]
        },
        "IFilterRule": {
            "enum": [
                "!=",
                "<",
                "<=",
                "==",
                ">",
                ">=",
                "notequals",
                "set"
            ],
            "type": "string"
        },
        "IOutput": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "from": {
                    "type": "string"
                },
                "filter": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IFilter"
                    }
                },
                "notify": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "from",
                "id"
            ]
        },
        "IDatabombDatasource": {
            "type": "object",
            "properties": {
                "databomb": {
                    "type": "boolean",
                    "enum": [
                        true
                    ]
                },
                "id": {
                    "type": "string"
                },
                "filter": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IFilter"
                    }
                },
                "outputs": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IOutput"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "databomb",
                "id",
                "outputs"
            ]
        },
        "IHipieDatasource": {
            "type": "object",
            "properties": {
                "URL": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "filter": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IFilter"
                    }
                },
                "outputs": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IOutput"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "URL",
                "id",
                "outputs"
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-04/schema#"
};
