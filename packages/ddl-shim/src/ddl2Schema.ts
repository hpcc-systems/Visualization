/* tslint:disable */
export const ddl2Schema =  
{
    "type": "object",
    "properties": {
        "version": {
            "type": "string",
            "enum": [
                "0.0.18"
            ]
        },
        "datasources": {
            "type": "array",
            "items": {
                "anyOf": [
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
                        "$ref": "#/definitions/IWUResult"
                    },
                    {
                        "$ref": "#/definitions/IHipieService"
                    },
                    {
                        "$ref": "#/definitions/IRoxieService"
                    }
                ]
            }
        },
        "dataviews": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/IView"
            }
        }
    },
    "additionalProperties": false,
    "required": [
        "datasources",
        "dataviews",
        "version"
    ],
    "definitions": {
        "ILogicalFile": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "logicalfile"
                    ]
                },
                "logicalFile": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IField"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "fields",
                "id",
                "logicalFile",
                "type",
                "url"
            ]
        },
        "IField": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "default": {},
                "children": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IField"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "default",
                "id",
                "type"
            ]
        },
        "IForm": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "form"
                    ]
                },
                "id": {
                    "type": "string"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IField"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "fields",
                "id",
                "type"
            ]
        },
        "IDatabomb": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "databomb"
                    ]
                },
                "id": {
                    "type": "string"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IField"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "fields",
                "id",
                "type"
            ]
        },
        "IWUResult": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "wuresult"
                    ]
                },
                "wuid": {
                    "type": "string"
                },
                "outputs": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/IOutput"
                    }
                },
                "id": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "id",
                "outputs",
                "type",
                "url",
                "wuid"
            ]
        },
        "IOutput": {
            "type": "object",
            "properties": {
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IField"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "fields"
            ]
        },
        "IHipieService": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "hipie"
                    ]
                },
                "querySet": {
                    "type": "string"
                },
                "queryID": {
                    "type": "string"
                },
                "inputs": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IField"
                    }
                },
                "outputs": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/IOutput"
                    }
                },
                "id": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "id",
                "inputs",
                "outputs",
                "queryID",
                "querySet",
                "type",
                "url"
            ]
        },
        "IRoxieService": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "roxie"
                    ]
                },
                "querySet": {
                    "type": "string"
                },
                "queryID": {
                    "type": "string"
                },
                "inputs": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IField"
                    }
                },
                "outputs": {
                    "type": "object",
                    "additionalProperties": {
                        "$ref": "#/definitions/IOutput"
                    }
                },
                "id": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "id",
                "inputs",
                "outputs",
                "queryID",
                "querySet",
                "type",
                "url"
            ]
        },
        "IView": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
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
                "activities": {
                    "type": "array",
                    "items": {
                        "anyOf": [
                            {
                                "$ref": "#/definitions/IFilter"
                            },
                            {
                                "$ref": "#/definitions/IProject"
                            },
                            {
                                "$ref": "#/definitions/IGroupBy"
                            },
                            {
                                "$ref": "#/definitions/ISort"
                            },
                            {
                                "$ref": "#/definitions/ILimit"
                            }
                        ]
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "activities",
                "datasource",
                "id"
            ]
        },
        "IDatasourceRef": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "id"
            ]
        },
        "IRoxieServiceRef": {
            "type": "object",
            "properties": {
                "request": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IRequestField"
                    }
                },
                "output": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "id",
                "output",
                "request"
            ]
        },
        "IRequestField": {
            "type": "object",
            "properties": {
                "source": {
                    "type": "string"
                },
                "remoteFieldID": {
                    "type": "string"
                },
                "localFieldID": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "localFieldID",
                "remoteFieldID",
                "source"
            ]
        },
        "IFilter": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "filter"
                    ]
                },
                "conditions": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IFilterCondition"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "conditions",
                "type"
            ]
        },
        "IFilterCondition": {
            "type": "object",
            "properties": {
                "viewID": {
                    "type": "string"
                },
                "mappings": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IMapping"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "mappings",
                "viewID"
            ]
        },
        "IMapping": {
            "type": "object",
            "properties": {
                "remoteFieldID": {
                    "type": "string"
                },
                "localFieldID": {
                    "type": "string"
                },
                "condition": {
                    "$ref": "#/definitions/IMappingConditionType"
                },
                "nullable": {
                    "type": "boolean"
                }
            },
            "additionalProperties": false,
            "required": [
                "condition",
                "localFieldID",
                "nullable",
                "remoteFieldID"
            ]
        },
        "IMappingConditionType": {
            "enum": [
                "!=",
                "<",
                "<=",
                "==",
                ">",
                ">=",
                "in"
            ],
            "type": "string"
        },
        "IProject": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "project"
                    ]
                },
                "transformations": {
                    "type": "array",
                    "items": {
                        "anyOf": [
                            {
                                "$ref": "#/definitions/ICalculated"
                            },
                            {
                                "$ref": "#/definitions/IScale"
                            },
                            {
                                "$ref": "#/definitions/ITemplate"
                            }
                        ]
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "transformations",
                "type"
            ]
        },
        "ICalculated": {
            "type": "object",
            "properties": {
                "fieldID": {
                    "type": "string"
                },
                "type": {
                    "$ref": "#/definitions/ICalculatedType"
                },
                "param1": {
                    "type": "string"
                },
                "param2": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "fieldID",
                "param1",
                "param2",
                "type"
            ]
        },
        "ICalculatedType": {
            "enum": [
                "*",
                "+",
                "-",
                "/",
                "="
            ],
            "type": "string"
        },
        "IScale": {
            "type": "object",
            "properties": {
                "fieldID": {
                    "type": "string"
                },
                "type": {
                    "type": "string",
                    "enum": [
                        "scale"
                    ]
                },
                "param1": {
                    "type": "string"
                },
                "factor": {
                    "type": "number"
                }
            },
            "additionalProperties": false,
            "required": [
                "factor",
                "fieldID",
                "param1",
                "type"
            ]
        },
        "ITemplate": {
            "type": "object",
            "properties": {
                "fieldID": {
                    "type": "string"
                },
                "type": {
                    "type": "string",
                    "enum": [
                        "template"
                    ]
                },
                "template": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "fieldID",
                "template",
                "type"
            ]
        },
        "IGroupBy": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "groupby"
                    ]
                },
                "groupByIDs": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "aggregates": {
                    "type": "array",
                    "items": {
                        "anyOf": [
                            {
                                "$ref": "#/definitions/IAggregate"
                            },
                            {
                                "$ref": "#/definitions/ICount"
                            }
                        ]
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "aggregates",
                "groupByIDs",
                "type"
            ]
        },
        "IAggregate": {
            "type": "object",
            "properties": {
                "fieldID": {
                    "type": "string"
                },
                "type": {
                    "$ref": "#/definitions/IAggregateType"
                },
                "inFieldID": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "fieldID",
                "inFieldID",
                "type"
            ]
        },
        "IAggregateType": {
            "enum": [
                "deviation",
                "max",
                "mean",
                "min",
                "sum",
                "variance"
            ],
            "type": "string"
        },
        "ICount": {
            "type": "object",
            "properties": {
                "fieldID": {
                    "type": "string"
                },
                "type": {
                    "type": "string",
                    "enum": [
                        "count"
                    ]
                }
            },
            "additionalProperties": false,
            "required": [
                "fieldID",
                "type"
            ]
        },
        "ISort": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "sort"
                    ]
                },
                "conditions": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/ISortCondition"
                    }
                }
            },
            "additionalProperties": false,
            "required": [
                "conditions",
                "type"
            ]
        },
        "ISortCondition": {
            "type": "object",
            "properties": {
                "fieldID": {
                    "type": "string"
                },
                "descending": {
                    "type": "boolean"
                }
            },
            "additionalProperties": false,
            "required": [
                "descending",
                "fieldID"
            ]
        },
        "ILimit": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "limit"
                    ]
                },
                "limit": {
                    "type": "number"
                }
            },
            "additionalProperties": false,
            "required": [
                "limit",
                "type"
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-04/schema#"
};
