import { DDLEditor } from "@hpcc-js/marshaller";

new DDLEditor()
    .target("target")
    .ddl(getDDL())
    .render()
    ;

function getDDL() {
    return {
        "version": "2.0.23",
        "createdBy": {
            "name": "@hpcc-js/marshaller",
            "version": "2.14.0"
        },
        "datasources": [
            {
                "type": "databomb",
                "id": "popup",
                "format": "json",
                "payload": "[{ \"Airport\": \"\", \"Airline\": \"\" }]",
                "fields": [
                    {
                        "type": "string",
                        "id": "Airport"
                    },
                    {
                        "type": "string",
                        "id": "Airline"
                    }
                ]
            },
            {
                "type": "databomb",
                "id": "airports",
                "format": "csv",
                "payload": "code,name,count\nATL,\"Atlanta, GA: Hartsfield-Jackson Atlanta International\",1976\nBOS,\"Boston, MA: Logan International\",2019\nBWI,\"Baltimore, MD: Baltimore/Washington International Thurgood Marshall\",1824\nCLT,\"Charlotte, NC: Charlotte Douglas International\",1752\nDCA,\"Washington, DC: Ronald Reagan Washington National\",2017\nDEN,\"Denver, CO: Denver International\",2063\nDFW,\"Dallas/Fort Worth, TX: Dallas/Fort Worth International\",2026\nDTW,\"Detroit, MI: Detroit Metro Wayne County\",2050\nEWR,\"Newark, NJ: Newark Liberty International\",1860\nFLL,\"Fort Lauderdale, FL: Fort Lauderdale-Hollywood International\",1648\nIAD,\"Washington, DC: Washington Dulles International\",1840\nIAH,\"Houston, TX: George Bush Intercontinental/Houston\",1739\nJFK,\"New York, NY: John F. Kennedy International\",1485\nLAS,\"Las Vegas, NV: McCarran International\",2128\nLAX,\"Los Angeles, CA: Los Angeles International\",2141\nLGA,\"New York, NY: LaGuardia\",1987\nMCO,\"Orlando, FL: Orlando International\",1912\nMDW,\"Chicago, IL: Chicago Midway International\",1093\nMIA,\"Miami, FL: Miami International\",1485\nMSP,\"Minneapolis, MN: Minneapolis-St Paul International\",1935\nORD,\"Chicago, IL: Chicago O'Hare International\",1929\nPDX,\"Portland, OR: Portland International\",1736\nPHL,\"Philadelphia, PA: Philadelphia International\",1945\nPHX,\"Phoenix, AZ: Phoenix Sky Harbor International\",2094\nSAN,\"San Diego, CA: San Diego International\",2057\nSEA,\"Seattle, WA: Seattle/Tacoma International\",1883\nSFO,\"San Francisco, CA: San Francisco International\",1977\nSLC,\"Salt Lake City, UT: Salt Lake City International\",1741\nTPA,\"Tampa, FL: Tampa International\",1671",
                "fields": [
                    {
                        "type": "string",
                        "id": "code"
                    },
                    {
                        "type": "string",
                        "id": "name"
                    },
                    {
                        "type": "string",
                        "id": "count"
                    }
                ]
            },
            {
                "type": "databomb",
                "id": "carriers",
                "format": "csv",
                "payload": "code,name,count\nAA,American Airlines Inc.,4296\nAS,Alaska Airlines Inc.,2678\nB6,JetBlue Airways,2857\nCO,Continental Air Lines Inc.,2815\nDH,Atlantic Coast Airlines,363\nDL,Delta Air Lines Inc.,4370\nEV,Atlantic Southeast Airlines,2438\nFL,AirTran Airways Corporation,2801\nHP,America West Airlines Inc.,806\nMQ,American Eagle Airlines Inc.,2641\nNW,Northwest Airlines Inc.,2288\nOO,SkyWest Airlines Inc.,2621\nRU,ExpressJet Airlines Inc.,802\nTZ,ATA Airlines d/b/a ATA,606\nUA,United Air Lines Inc.,4219\nUS,US Airways Inc.,3918\nWN,Southwest Airlines Co.,2900\nHA,Hawaiian Airlines Inc.,1073\nOH,Comair Inc.,1671\nF9,Frontier Airlines Inc.,2821\nYV,Mesa Airlines Inc.,1682\nAQ,Aloha Airlines Inc.,46\nXE,ExpressJet Airlines Inc.,1394\n9E,Pinnacle Airlines Inc.,920\nVX,Virgin America,740\nNK,Spirit Air Lines,247",
                "fields": [
                    {
                        "type": "string",
                        "id": "code"
                    },
                    {
                        "type": "string",
                        "id": "name"
                    },
                    {
                        "type": "string",
                        "id": "count"
                    }
                ]
            }
        ],
        "dataviews": [
            {
                "id": "e_3",
                "datasource": {
                    "id": "popup"
                },
                "activities": [],
                "visualization": {
                    "id": "cp_3",
                    "title": "Global Filter",
                    "visibility": "flyout",
                    "chartType": "FieldForm",
                    "__class": "form_FieldForm",
                    "mappings": {
                        "type": "mappings",
                        "transformations": [
                            {
                                "fieldID": "fields",
                                "type": "multi",
                                "transformations": [
                                    {
                                        "fieldID": "Airport",
                                        "type": "=",
                                        "sourceFieldID": "Airport"
                                    },
                                    {
                                        "fieldID": "Airline",
                                        "type": "=",
                                        "sourceFieldID": "Airline"
                                    }
                                ]
                            }
                        ]
                    },
                    "properties": {
                        "__class": "marshaller_VizChartPanel",
                        "title": "Global Filter",
                        "widget": {
                            "__class": "form_FieldForm",
                            "validate": false,
                            "allowEmptyRequest": true
                        }
                    }
                }
            },
            {
                "id": "e_4",
                "datasource": {
                    "id": "airports"
                },
                "activities": [
                    {
                        "type": "filter",
                        "conditions": [
                            {
                                "viewID": "e_3",
                                "mappings": [
                                    {
                                        "remoteFieldID": "Airport",
                                        "localFieldID": "code",
                                        "condition": "==",
                                        "nullable": true
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "project",
                        "transformations": [
                            {
                                "fieldID": "Code",
                                "type": "=",
                                "sourceFieldID": "code"
                            },
                            {
                                "fieldID": "Airport",
                                "type": "=",
                                "sourceFieldID": "name"
                            },
                            {
                                "fieldID": "Count",
                                "type": "scale",
                                "sourceFieldID": "count",
                                "factor": 1
                            }
                        ]
                    },
                    {
                        "type": "sort",
                        "conditions": [
                            {
                                "fieldID": "Count",
                                "descending": true
                            }
                        ]
                    }
                ],
                "visualization": {
                    "id": "cp_4",
                    "title": "Airports",
                    "description": "code == undefined",
                    "visibility": "normal",
                    "chartType": "Table",
                    "__class": "dgrid_Table",
                    "mappings": {
                        "type": "mappings",
                        "transformations": []
                    },
                    "properties": {
                        "__class": "marshaller_VizChartPanel",
                        "title": "Airports",
                        "description": "code == undefined",
                        "widget": {
                            "__class": "dgrid_Table",
                            "columnFormats": []
                        }
                    }
                }
            },
            {
                "id": "e_5",
                "datasource": {
                    "id": "carriers"
                },
                "activities": [
                    {
                        "type": "filter",
                        "conditions": [
                            {
                                "viewID": "e_3",
                                "mappings": [
                                    {
                                        "remoteFieldID": "Airline",
                                        "localFieldID": "code",
                                        "condition": "==",
                                        "nullable": true
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "project",
                        "transformations": [
                            {
                                "fieldID": "Code",
                                "type": "=",
                                "sourceFieldID": "code"
                            },
                            {
                                "fieldID": "Airline",
                                "type": "=",
                                "sourceFieldID": "name"
                            },
                            {
                                "fieldID": "Count",
                                "type": "scale",
                                "sourceFieldID": "count",
                                "factor": 1
                            }
                        ]
                    },
                    {
                        "type": "sort",
                        "conditions": [
                            {
                                "fieldID": "Count",
                                "descending": true
                            }
                        ]
                    }
                ],
                "visualization": {
                    "id": "cp_5",
                    "title": "Airlines",
                    "description": "code == undefined",
                    "visibility": "normal",
                    "chartType": "Table",
                    "__class": "dgrid_Table",
                    "mappings": {
                        "type": "mappings",
                        "transformations": []
                    },
                    "properties": {
                        "__class": "marshaller_VizChartPanel",
                        "title": "Airlines",
                        "description": "code == undefined",
                        "widget": {
                            "__class": "dgrid_Table",
                            "columnFormats": []
                        }
                    }
                }
            }
        ],
        "properties": {
            "name": "@hpcc-js/marshaller",
            "version": "2.14.0",
            "buildVersion": "2.7.1",
            "layout": {
                "main": {
                    "type": "split-area",
                    "orientation": "vertical",
                    "children": [
                        {
                            "type": "tab-area",
                            "widgets": [
                                {
                                    "__id": "cp_4"
                                }
                            ],
                            "currentIndex": 0
                        },
                        {
                            "type": "tab-area",
                            "widgets": [
                                {
                                    "__id": "cp_5"
                                }
                            ],
                            "currentIndex": 0
                        }
                    ],
                    "sizes": [
                        0.523870861033399,
                        0.476129138966601
                    ]
                }
            }
        }
    };
}
