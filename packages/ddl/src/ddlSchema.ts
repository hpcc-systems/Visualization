export const ddlSchema =  
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {
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
        "IChoroGeohashMapping": {
            "additionalProperties": false,
            "properties": {
                "geohash": {
                    "type": "string"
                },
                "weight": {
                    "anyOf": [
                        {
                            "items": {
                                "type": "string"
                            },
                            "type": "array"
                        },
                        {
                            "type": "string"
                        }
                    ]
                }
            },
            "required": [
                "geohash",
                "weight"
            ],
            "type": "object"
        },
        "IChoroSource": {
            "additionalProperties": false,
            "properties": {
                "first": {
                    "type": "number"
                },
                "id": {
                    "type": "string"
                },
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
                "output": {
                    "type": "string"
                },
                "properties": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "type": "object"
                },
                "reverse": {
                    "type": "boolean"
                },
                "sort": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "id",
                "mappings",
                "output"
            ],
            "type": "object"
        },
        "IChoroUSCountyMapping": {
            "additionalProperties": false,
            "properties": {
                "county": {
                    "type": "string"
                },
                "weight": {
                    "anyOf": [
                        {
                            "items": {
                                "type": "string"
                            },
                            "type": "array"
                        },
                        {
                            "type": "string"
                        }
                    ]
                }
            },
            "required": [
                "county",
                "weight"
            ],
            "type": "object"
        },
        "IChoroUSStateMapping": {
            "additionalProperties": false,
            "properties": {
                "state": {
                    "type": "string"
                },
                "weight": {
                    "anyOf": [
                        {
                            "items": {
                                "type": "string"
                            },
                            "type": "array"
                        },
                        {
                            "type": "string"
                        }
                    ]
                }
            },
            "required": [
                "state",
                "weight"
            ],
            "type": "object"
        },
        "IChoroVisualization": {
            "additionalProperties": false,
            "properties": {
                "color": {
                    "$ref": "#/definitions/ChoroColor"
                },
                "events": {
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    },
                    "type": "object"
                },
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "onSelect": {
                },
                "properties": {
                    "additionalProperties": false,
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "charttype"
                    ],
                    "type": "object"
                },
                "source": {
                    "$ref": "#/definitions/IChoroSource"
                },
                "title": {
                    "type": "string"
                },
                "type": {
                    "$ref": "#/definitions/VisualizationType"
                },
                "visualizations": {
                    "items": {
                        "$ref": "#/definitions/IChoroVisualization"
                    },
                    "type": "array"
                }
            },
            "required": [
                "id",
                "source",
                "title",
                "type"
            ],
            "type": "object"
        },
        "IDashboard": {
            "additionalProperties": false,
            "properties": {
                "datasources": {
                    "items": {
                        "$ref": "#/definitions/IDatasource"
                    },
                    "type": "array"
                },
                "enable": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "label": {
                    "type": "string"
                },
                "primary": {
                    "type": "boolean"
                },
                "title": {
                    "type": "string"
                },
                "visualizations": {
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
                                "$ref": "#/definitions/IGraphVisualization"
                            },
                            {
                                "$ref": "#/definitions/IHeatMapVisualization"
                            }
                        ]
                    },
                    "type": "array"
                }
            },
            "required": [
                "datasources",
                "visualizations"
            ],
            "type": "object"
        },
        "IDatasource": {
            "additionalProperties": false,
            "properties": {
                "URL": {
                    "type": "string"
                },
                "WUID": {
                    "type": "boolean"
                },
                "databomb": {
                    "type": "boolean"
                },
                "filter": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "outputs": {
                    "items": {
                        "$ref": "#/definitions/IOutput"
                    },
                    "type": "array"
                }
            },
            "required": [
                "id",
                "outputs"
            ],
            "type": "object"
        },
        "IEvent": {
            "additionalProperties": false,
            "properties": {
                "mappings": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "type": "object"
                },
                "updates": {
                    "items": {
                        "$ref": "#/definitions/IEventUpdate"
                    },
                    "type": "array"
                }
            },
            "required": [
                "mappings",
                "updates"
            ],
            "type": "object"
        },
        "IEventUpdate": {
            "additionalProperties": false,
            "properties": {
                "col": {
                    "type": "string"
                },
                "datasource": {
                    "type": "string"
                },
                "instance": {
                    "type": "string"
                },
                "mappings": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "type": "object"
                },
                "merge": {
                    "type": "boolean"
                },
                "visualization": {
                    "type": "string"
                }
            },
            "required": [
                "datasource",
                "instance",
                "merge",
                "visualization"
            ],
            "type": "object"
        },
        "IGraphLink": {
            "additionalProperties": false,
            "properties": {
                "childfile": {
                    "type": "string"
                },
                "mappings": {
                    "$ref": "#/definitions/IGraphLinkMapping"
                }
            },
            "required": [
                "childfile",
                "mappings"
            ],
            "type": "object"
        },
        "IGraphLinkMapping": {
            "additionalProperties": false,
            "properties": {
                "uid": {
                    "type": "string"
                }
            },
            "required": [
                "uid"
            ],
            "type": "object"
        },
        "IGraphMapping": {
            "additionalProperties": false,
            "properties": {
                "flags": {
                    "type": "string"
                },
                "label": {
                    "type": "string"
                },
                "uid": {
                    "type": "string"
                },
                "weight": {
                    "type": "string"
                }
            },
            "required": [
                "flags",
                "label",
                "uid",
                "weight"
            ],
            "type": "object"
        },
        "IGraphSource": {
            "additionalProperties": false,
            "properties": {
                "first": {
                    "type": "number"
                },
                "id": {
                    "type": "string"
                },
                "link": {
                    "$ref": "#/definitions/IGraphLink"
                },
                "mappings": {
                    "$ref": "#/definitions/IGraphMapping"
                },
                "output": {
                    "type": "string"
                },
                "properties": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "type": "object"
                },
                "reverse": {
                    "type": "boolean"
                },
                "sort": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "id",
                "link",
                "mappings",
                "output"
            ],
            "type": "object"
        },
        "IGraphVisualization": {
            "additionalProperties": false,
            "properties": {
                "color": {
                },
                "events": {
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    },
                    "type": "object"
                },
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    },
                    "type": "array"
                },
                "flag": {
                    "items": {
                        "$ref": "#/definitions/IVisualizationIcon"
                    },
                    "type": "array"
                },
                "icon": {
                    "$ref": "#/definitions/IVisualizationIcon"
                },
                "id": {
                    "type": "string"
                },
                "label": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "onSelect": {
                },
                "properties": {
                    "additionalProperties": false,
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "charttype"
                    ],
                    "type": "object"
                },
                "source": {
                    "$ref": "#/definitions/IGraphSource"
                },
                "title": {
                    "type": "string"
                },
                "type": {
                    "$ref": "#/definitions/VisualizationType"
                }
            },
            "required": [
                "flag",
                "icon",
                "id",
                "label",
                "source",
                "title",
                "type"
            ],
            "type": "object"
        },
        "IHeatMapMapping": {
            "additionalProperties": false,
            "properties": {
                "weight": {
                    "type": "string"
                },
                "x": {
                    "type": "string"
                },
                "y": {
                    "type": "string"
                }
            },
            "required": [
                "weight",
                "x",
                "y"
            ],
            "type": "object"
        },
        "IHeatMapSource": {
            "additionalProperties": false,
            "properties": {
                "first": {
                    "type": "number"
                },
                "id": {
                    "type": "string"
                },
                "mappings": {
                    "$ref": "#/definitions/IHeatMapMapping"
                },
                "output": {
                    "type": "string"
                },
                "properties": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "type": "object"
                },
                "reverse": {
                    "type": "boolean"
                },
                "sort": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "id",
                "mappings",
                "output"
            ],
            "type": "object"
        },
        "IHeatMapVisualization": {
            "additionalProperties": false,
            "properties": {
                "color": {
                },
                "events": {
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    },
                    "type": "object"
                },
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "onSelect": {
                },
                "properties": {
                    "additionalProperties": false,
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "charttype"
                    ],
                    "type": "object"
                },
                "source": {
                    "$ref": "#/definitions/IHeatMapSource"
                },
                "title": {
                    "type": "string"
                },
                "type": {
                    "$ref": "#/definitions/VisualizationType"
                }
            },
            "required": [
                "id",
                "source",
                "title",
                "type"
            ],
            "type": "object"
        },
        "ILineMapping": {
            "additionalProperties": false,
            "properties": {
                "x": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "y": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "x",
                "y"
            ],
            "type": "object"
        },
        "ILineSource": {
            "additionalProperties": false,
            "properties": {
                "first": {
                    "type": "number"
                },
                "id": {
                    "type": "string"
                },
                "mappings": {
                    "$ref": "#/definitions/ILineMapping"
                },
                "output": {
                    "type": "string"
                },
                "properties": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "type": "object"
                },
                "reverse": {
                    "type": "boolean"
                },
                "sort": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "id",
                "mappings",
                "output"
            ],
            "type": "object"
        },
        "ILineVisualization": {
            "additionalProperties": false,
            "properties": {
                "color": {
                },
                "events": {
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    },
                    "type": "object"
                },
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "onSelect": {
                },
                "properties": {
                    "additionalProperties": false,
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "charttype"
                    ],
                    "type": "object"
                },
                "source": {
                    "$ref": "#/definitions/ILineSource"
                },
                "title": {
                    "type": "string"
                },
                "type": {
                    "$ref": "#/definitions/VisualizationType"
                }
            },
            "required": [
                "id",
                "source",
                "title",
                "type"
            ],
            "type": "object"
        },
        "IOutput": {
            "additionalProperties": false,
            "properties": {
                "filter": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "from": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "notify": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "from",
                "id"
            ],
            "type": "object"
        },
        "IPieMapping": {
            "additionalProperties": false,
            "properties": {
                "label": {
                    "type": "string"
                },
                "weight": {
                    "type": "string"
                }
            },
            "required": [
                "label",
                "weight"
            ],
            "type": "object"
        },
        "IPieSource": {
            "additionalProperties": false,
            "properties": {
                "first": {
                    "type": "number"
                },
                "id": {
                    "type": "string"
                },
                "mappings": {
                    "$ref": "#/definitions/IPieMapping"
                },
                "output": {
                    "type": "string"
                },
                "properties": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "type": "object"
                },
                "reverse": {
                    "type": "boolean"
                },
                "sort": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "id",
                "mappings",
                "output"
            ],
            "type": "object"
        },
        "IPieVisualization": {
            "additionalProperties": false,
            "properties": {
                "color": {
                },
                "events": {
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    },
                    "type": "object"
                },
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "onSelect": {
                },
                "properties": {
                    "additionalProperties": false,
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "charttype"
                    ],
                    "type": "object"
                },
                "source": {
                    "$ref": "#/definitions/IPieSource"
                },
                "title": {
                    "type": "string"
                },
                "type": {
                    "enum": [
                        "PIE"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "id",
                "source",
                "title",
                "type"
            ],
            "type": "object"
        },
        "ITableMapping": {
            "additionalProperties": false,
            "properties": {
                "value": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "value"
            ],
            "type": "object"
        },
        "ITableSource": {
            "additionalProperties": false,
            "properties": {
                "first": {
                    "type": "number"
                },
                "id": {
                    "type": "string"
                },
                "mappings": {
                    "$ref": "#/definitions/ITableMapping"
                },
                "output": {
                    "type": "string"
                },
                "properties": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "type": "object"
                },
                "reverse": {
                    "type": "boolean"
                },
                "sort": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "id",
                "mappings",
                "output"
            ],
            "type": "object"
        },
        "ITableVisualization": {
            "additionalProperties": false,
            "properties": {
                "color": {
                },
                "events": {
                    "additionalProperties": {
                        "$ref": "#/definitions/IEvent"
                    },
                    "type": "object"
                },
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IVisualizationField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "label": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "onSelect": {
                },
                "properties": {
                    "additionalProperties": false,
                    "properties": {
                        "charttype": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "charttype"
                    ],
                    "type": "object"
                },
                "source": {
                    "$ref": "#/definitions/ITableSource"
                },
                "title": {
                    "type": "string"
                },
                "type": {
                    "$ref": "#/definitions/VisualizationType"
                }
            },
            "required": [
                "id",
                "label",
                "source",
                "title",
                "type"
            ],
            "type": "object"
        },
        "IVisualizationField": {
            "additionalProperties": false,
            "properties": {
                "id": {
                },
                "label": {
                    "type": "string"
                },
                "properties": {
                    "additionalProperties": false,
                    "properties": {
                        "charttype": {
                            "type": "string"
                        },
                        "default": {
                            "type": "string"
                        },
                        "enumvals": {
                            "items": {
                                "type": "string"
                            },
                            "type": "array"
                        },
                        "label": {
                            "type": "string"
                        },
                        "localVisualizationID": {
                            "type": "string"
                        },
                        "type": {
                            "$ref": "#/definitions/VisualizationFieldType"
                        }
                    },
                    "required": [
                        "charttype",
                        "default",
                        "enumvals",
                        "label",
                        "localVisualizationID",
                        "type"
                    ],
                    "type": "object"
                }
            },
            "required": [
                "id",
                "properties"
            ],
            "type": "object"
        },
        "IVisualizationIcon": {
            "additionalProperties": false,
            "properties": {
                "faChar": {
                    "type": "string"
                },
                "fieldid": {
                    "type": "string"
                },
                "valuemappings": {
                    "additionalProperties": {
                        "type": "string"
                    },
                    "type": "object"
                }
            },
            "required": [
                "faChar"
            ],
            "type": "object"
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
                "time",
                "unsigned",
                "visualization"
            ],
            "type": "string"
        },
        "VisualizationType": {
            "enum": [
                "2DCHART",
                "BAR",
                "BUBBLE",
                "CHORO",
                "FORM",
                "GRAPH",
                "HEAT_MAP",
                "LINE",
                "PIE",
                "SLIDER",
                "TABLE",
                "WORD_CLOUD"
            ],
            "type": "string"
        }
    },
    "items": {
        "$ref": "#/definitions/IDashboard"
    },
    "type": "array"
}

; 
