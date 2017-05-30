/* tslint:disable */  
export const ddl2Schema =  
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "additionalProperties": false,
    "definitions": {
        "IAggregate": {
            "additionalProperties": false,
            "properties": {
                "fieldID": {
                    "type": "string"
                },
                "label": {
                    "type": "string"
                },
                "type": {
                    "enum": [
                        "deviation",
                        "max",
                        "mean",
                        "min",
                        "sum",
                        "variance"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "fieldID",
                "label",
                "type"
            ],
            "type": "object"
        },
        "ICalculated": {
            "additionalProperties": false,
            "properties": {
                "fieldID": {
                    "type": "string"
                },
                "param1": {
                    "type": "string"
                },
                "param2": {
                    "type": "string"
                },
                "type": {
                    "enum": [
                        "*",
                        "+",
                        "-",
                        "/",
                        "="
                    ],
                    "type": "string"
                }
            },
            "required": [
                "fieldID",
                "param1",
                "param2",
                "type"
            ],
            "type": "object"
        },
        "ICount": {
            "additionalProperties": false,
            "properties": {
                "label": {
                    "type": "string"
                },
                "type": {
                    "enum": [
                        "count"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "label",
                "type"
            ],
            "type": "object"
        },
        "IDatabomb": {
            "additionalProperties": false,
            "properties": {
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "type": {
                    "enum": [
                        "databomb"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "fields",
                "id",
                "type"
            ],
            "type": "object"
        },
        "IDatasourceRef": {
            "additionalProperties": false,
            "properties": {
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                }
            },
            "required": [
                "fields",
                "id"
            ],
            "type": "object"
        },
        "IField": {
            "additionalProperties": false,
            "properties": {
                "children": {
                    "items": {
                        "$ref": "#/definitions/IField"
                    },
                    "type": "array"
                },
                "default": {
                },
                "id": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "default",
                "id",
                "type"
            ],
            "type": "object"
        },
        "IFilter": {
            "additionalProperties": false,
            "properties": {
                "conditions": {
                    "items": {
                        "$ref": "#/definitions/IFilterCondition"
                    },
                    "type": "array"
                },
                "type": {
                    "enum": [
                        "filter"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "conditions",
                "type"
            ],
            "type": "object"
        },
        "IFilterCondition": {
            "additionalProperties": false,
            "properties": {
                "mappings": {
                    "items": {
                        "$ref": "#/definitions/IMapping"
                    },
                    "type": "array"
                },
                "nullable": {
                    "type": "boolean"
                },
                "viewID": {
                    "type": "string"
                }
            },
            "required": [
                "mappings",
                "nullable",
                "viewID"
            ],
            "type": "object"
        },
        "IForm": {
            "additionalProperties": false,
            "properties": {
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "type": {
                    "enum": [
                        "form"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "fields",
                "id",
                "type"
            ],
            "type": "object"
        },
        "IGroupBy": {
            "additionalProperties": false,
            "properties": {
                "aggregates": {
                    "items": {
                        "anyOf": [
                            {
                                "$ref": "#/definitions/IAggregate"
                            },
                            {
                                "$ref": "#/definitions/ICount"
                            }
                        ]
                    },
                    "type": "array"
                },
                "groupByIDs": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "type": {
                    "enum": [
                        "groupby"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "aggregates",
                "groupByIDs",
                "type"
            ],
            "type": "object"
        },
        "IHipieService": {
            "additionalProperties": false,
            "properties": {
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "type": {
                    "enum": [
                        "hipieservice"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "fields",
                "id",
                "type"
            ],
            "type": "object"
        },
        "ILimit": {
            "additionalProperties": false,
            "properties": {
                "limit": {
                    "type": "number"
                },
                "type": {
                    "enum": [
                        "limit"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "limit",
                "type"
            ],
            "type": "object"
        },
        "ILogicalFile": {
            "additionalProperties": false,
            "properties": {
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "logicalFile": {
                    "type": "string"
                },
                "type": {
                    "enum": [
                        "logicalfile"
                    ],
                    "type": "string"
                },
                "url": {
                    "type": "string"
                }
            },
            "required": [
                "fields",
                "id",
                "logicalFile",
                "type",
                "url"
            ],
            "type": "object"
        },
        "IMapping": {
            "additionalProperties": false,
            "properties": {
                "condition": {
                    "$ref": "#/definitions/IMappingConditionType"
                },
                "localFieldID": {
                    "type": "string"
                },
                "remoteFieldID": {
                    "type": "string"
                }
            },
            "required": [
                "condition",
                "localFieldID",
                "remoteFieldID"
            ],
            "type": "object"
        },
        "IMappingConditionType": {
            "enum": [
                "!=",
                "<",
                "<=",
                "==",
                ">",
                ">=",
                "contains"
            ],
            "type": "string"
        },
        "IProject": {
            "additionalProperties": false,
            "properties": {
                "transformations": {
                    "items": {
                        "anyOf": [
                            {
                                "$ref": "#/definitions/IScale"
                            },
                            {
                                "$ref": "#/definitions/ICalculated"
                            }
                        ]
                    },
                    "type": "array"
                },
                "type": {
                    "enum": [
                        "project"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "transformations",
                "type"
            ],
            "type": "object"
        },
        "IRequestField": {
            "additionalProperties": false,
            "properties": {
                "localFieldID": {
                    "type": "string"
                },
                "remoteFieldID": {
                    "type": "string"
                },
                "source": {
                    "type": "string"
                }
            },
            "required": [
                "localFieldID",
                "remoteFieldID",
                "source"
            ],
            "type": "object"
        },
        "IRoxieService": {
            "additionalProperties": false,
            "properties": {
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "queryID": {
                    "type": "string"
                },
                "querySet": {
                    "type": "string"
                },
                "resultName": {
                    "type": "string"
                },
                "type": {
                    "enum": [
                        "roxieservice"
                    ],
                    "type": "string"
                },
                "url": {
                    "type": "string"
                }
            },
            "required": [
                "fields",
                "id",
                "queryID",
                "querySet",
                "resultName",
                "type",
                "url"
            ],
            "type": "object"
        },
        "IRoxieServiceRef": {
            "additionalProperties": false,
            "properties": {
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "request": {
                    "items": {
                        "$ref": "#/definitions/IRequestField"
                    },
                    "type": "array"
                }
            },
            "required": [
                "fields",
                "id",
                "request"
            ],
            "type": "object"
        },
        "IScale": {
            "additionalProperties": false,
            "properties": {
                "factor": {
                    "type": "number"
                },
                "fieldID": {
                    "type": "string"
                },
                "param1": {
                    "type": "string"
                },
                "type": {
                    "enum": [
                        "scale"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "factor",
                "fieldID",
                "param1",
                "type"
            ],
            "type": "object"
        },
        "ISort": {
            "additionalProperties": false,
            "properties": {
                "conditions": {
                    "items": {
                        "$ref": "#/definitions/ISortCondition"
                    },
                    "type": "array"
                },
                "type": {
                    "enum": [
                        "sort"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "conditions",
                "type"
            ],
            "type": "object"
        },
        "ISortCondition": {
            "additionalProperties": false,
            "properties": {
                "descending": {
                    "type": "boolean"
                },
                "fieldID": {
                    "type": "string"
                }
            },
            "required": [
                "descending",
                "fieldID"
            ],
            "type": "object"
        },
        "IView": {
            "additionalProperties": false,
            "properties": {
                "computed": {
                    "$ref": "#/definitions/IProject"
                },
                "datasource": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/IDatasourceRef"
                        },
                        {
                            "$ref": "#/definitions/IRoxieServiceRef"
                        }
                    ]
                },
                "filter": {
                    "$ref": "#/definitions/IFilter"
                },
                "groupBy": {
                    "$ref": "#/definitions/IGroupBy"
                },
                "id": {
                    "type": "string"
                },
                "limit": {
                    "$ref": "#/definitions/ILimit"
                },
                "mappings": {
                    "$ref": "#/definitions/IProject"
                },
                "sort": {
                    "$ref": "#/definitions/ISort"
                }
            },
            "required": [
                "datasource",
                "id"
            ],
            "type": "object"
        },
        "IWUResult": {
            "additionalProperties": false,
            "properties": {
                "fields": {
                    "items": {
                        "$ref": "#/definitions/IField"
                    },
                    "type": "array"
                },
                "id": {
                    "type": "string"
                },
                "resultName": {
                    "type": "string"
                },
                "type": {
                    "enum": [
                        "wuresult"
                    ],
                    "type": "string"
                },
                "url": {
                    "type": "string"
                },
                "wuid": {
                    "type": "string"
                }
            },
            "required": [
                "fields",
                "id",
                "resultName",
                "type",
                "url",
                "wuid"
            ],
            "type": "object"
        }
    },
    "properties": {
        "datasources": {
            "items": {
                "anyOf": [
                    {
                        "$ref": "#/definitions/IWUResult"
                    },
                    {
                        "$ref": "#/definitions/ILogicalFile"
                    },
                    {
                        "$ref": "#/definitions/IForm"
                    },
                    {
                        "$ref": "#/definitions/IDatabomb"
                    },
                    {
                        "$ref": "#/definitions/IRoxieService"
                    },
                    {
                        "$ref": "#/definitions/IHipieService"
                    }
                ]
            },
            "type": "array"
        },
        "dataviews": {
            "items": {
                "$ref": "#/definitions/IView"
            },
            "type": "array"
        }
    },
    "required": [
        "datasources",
        "dataviews"
    ],
    "type": "object"
}

; 
