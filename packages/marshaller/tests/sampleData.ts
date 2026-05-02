import { DDL2 } from "@hpcc-js/ddl-shim";

export const payload = [
    { "id": "1", "firstname": "Bugs", "lastname": "Bunny", "email": "bugs.bunny@looneytunes.com", "gender": "Male", "ipaddress": "10.0.0.1", "ssn": "000-00-0001", "dob": "1940-07-27" },
    { "id": "2", "firstname": "Daffy", "lastname": "Duck", "email": "daffy.duck@looneytunes.com", "gender": "Male", "ipaddress": "10.0.0.2", "ssn": "000-00-0002", "dob": "1937-04-17" },
    { "id": "3", "firstname": "Wilma", "lastname": "Flintstone", "email": "wilma.f@bedrock.com", "gender": "Female", "ipaddress": "10.0.0.3", "ssn": "000-00-0003", "dob": "1960-09-30" },
    { "id": "4", "firstname": "Betty", "lastname": "Rubble", "email": "betty.rubble@bedrock.com", "gender": "Female", "ipaddress": "10.0.0.4", "ssn": "000-00-0004", "dob": "1960-09-30" },
    { "id": "5", "firstname": "Scooby", "lastname": "Doo", "email": "scooby.doo@mysterymachine.com", "gender": "Male", "ipaddress": "10.0.0.5", "ssn": "000-00-0005", "dob": "1969-09-13" }
];

export const sample2: DDL2.Schema = {
    "createdBy": {
        "name": "@hpcc-js/marshaller",
        "version": "2.28.11"
    },
    "datasources": [
        {
            "fields": [
                { "id": "id", "type": "number" },
                { "id": "firstname", "type": "string" },
                { "id": "lastname", "type": "string" },
                { "id": "email", "type": "string" },
                { "id": "gender", "type": "string" },
                { "id": "ipaddress", "type": "string" },
                { "id": "ssn", "type": "string" },
                { "id": "dob", "type": "string" }
            ],
            "format": "json",
            "id": "Ins002_dsOutput1",
            "payload": JSON.stringify(payload),
            "type": "databomb"
        }
    ],
    "dataviews": [
        {
            "activities": [
                {
                    "conditions": [
                        {
                            "mappings": [
                                {
                                    "condition": "==",
                                    "localFieldID": "gender",
                                    "nullable": false,
                                    "remoteFieldID": "gender"
                                }
                            ],
                            "viewID": "e_11"
                        }
                    ],
                    "type": "filter"
                }
            ],
            "datasource": { "id": "Ins002_dsOutput1" },
            "id": "e_10",
            "visualization": {
                "__class": "chart_Pie",
                "chartType": "Pie",
                "description": "gender == Female",
                "id": "cp_10",
                "mappings": {
                    "transformations": [
                        { "fieldID": "label", "sourceFieldID": "firstname", "type": "=" },
                        { "fieldID": "value", "sourceFieldID": "id", "type": "=" }
                    ],
                    "type": "mappings"
                },
                "properties": {
                    "__class": "marshaller_VizChartPanel",
                    "description": "gender == Female",
                    "title": "Element 10",
                    "widget": { "__class": "chart_Pie" }
                },
                "title": "Element 10",
                "visibility": "normal"
            }
        },
        {
            "activities": [
                {
                    "aggregates": [],
                    "groupByIDs": ["gender"],
                    "type": "groupby"
                }
            ],
            "datasource": { "id": "Ins002_dsOutput1" },
            "id": "e_11",
            "visualization": {
                "__class": "dgrid_Table",
                "chartType": "Table",
                "id": "cp_11",
                "mappings": {
                    "transformations": [],
                    "type": "mappings"
                },
                "properties": {
                    "__class": "marshaller_VizChartPanel",
                    "title": "Element 11",
                    "widget": { "__class": "dgrid_Table", "columnFormats": [] }
                },
                "title": "Element 11",
                "visibility": "normal"
            }
        }
    ],
    "properties": {
        "buildVersion": "2.108.11",
        "layout": {
            "main": {
                "children": [
                    { "currentIndex": 0, "type": "tab-area", "widgets": [{ "__id": "cp_10" }] },
                    { "currentIndex": 0, "type": "tab-area", "widgets": [{ "__id": "cp_11" }] }
                ],
                "orientation": "vertical",
                "sizes": [0.5755627009646301, 0.42443729903536975],
                "type": "split-area"
            }
        },
        "name": "@hpcc-js/marshaller",
        "version": "2.28.11"
    },
    "version": "2.2.1"
};
