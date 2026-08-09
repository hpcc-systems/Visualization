import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { Workunit } from "@hpcc-js/comms";
import { scopedLogger } from "@hpcc-js/util";
import { ESP_URL } from "./testLib.ts";

const logger = scopedLogger("test/workunit");
const WUID = "W20170510-114044";

describe("test/esp/ecl/Workunit", () => {
    describe("simple life cycle", () => {
        let wu1: Workunit;
        beforeAll(async () => {
            wu1 = await Workunit.create({
                baseUrl: ESP_URL,
                hookSend: (options, action, request, responseType, defaultSend, header?: any) => {
                    return defaultSend(options, action, request, responseType, { ...header, myCreds: "007-shhh" });
                }
            }).then(wu => {
                return wu.update({
                    QueryText: `
layout_visits := RECORD
    STRING20 User;
    STRING30 url;
    STRING5 time;
END;
visits := DATASET([ {'Bob', 'www.yahoo.com', '11:30'}, 
                    {'Fred', 'www.amazon.com', '08:30'}, 
                    {'Fred', 'www.amazon.com', '09:30'}, 
                    {'Fred', 'www.amazon.com', '10:30'}, 
                    {'Frank', 'www.amazon.com', '11:31'}, 
                    {'Fred', 'www.amazon.com', '12:30'}, 
                    {'Fred', 'www.amazon.com', '21:30'}, 
                    {'Fred', 'www.cnn.com', '01:30'}, 
                    {'Sara', 'www.yahoo.com', '23:33'}, 
                    {'Bob', 'www.amazon.com', '11:30'}, 
                    {'Bill', 'www.yahoo.com', '07:30'}], layout_visits);

layout_urlInfo := RECORD
    STRING30 url;
    STRING20 category;
    STRING3 pRank;
END;

urlInfo := DATASET([    {'www.yahoo.com', 'all', '1'}, 
                        {'www.cnn.com', 'news', '2'}, 
                        {'www.amazon.com', 'commerce', '3'}, 
                        {'www.lexisnexis.com', 'commerce', '4'}, 
                        {'www.msnbc.com', 'new', '2'}, 
                        {'www.hotwire.com', 'travel', '5'}], layout_urlInfo);

//Distribute Visits by URL, Count visits by URL
layout_visitCounts := RECORD
    visits.url;
    visits_cnt := COUNT(GROUP);
END;

visitcounts := TABLE(   DISTRIBUTE(visits, HASH32(url)), 
                        layout_visitCounts, url, LOCAL);

//Distribute Category by url, JOIN Category to URLs
visitCountsCat := JOIN( visitcounts, 
                        DISTRIBUTE(urlinfo, HASH32(url)), 
                        LEFT.URL = RIGHT.URL, LOCAL);

//Distribute and group by category, Output top 10 URLs for each category
topUrls := TOPN(    GROUP(  DISTRIBUTE(visitCountsCat, HASH32(category)), 
                            category, 
                            ALL, 
                            LOCAL), 
                    10, 
                    -visits_cnt);

OUTPUT(visits);
OUTPUT(topUrls);
`
                });
            }).then(wu => {
                return wu.submit("hthor");
            }).then(wu => {
                return wu.watchUntilComplete();
            });
        });
        afterAll(async () => {
            if (wu1 && !wu1.isDeleted()) {
                if (wu1.Protected) {
                    await wu1.unprotect();
                }
                await wu1.delete();
            }
        });
        it("creation", () => {
            expect(wu1).exist;
            expect(wu1.Wuid).exist;
        });
        it("complete", () => {
            return new Promise<void>((resolve) => {
                if (wu1.isComplete()) {
                    resolve();
                } else {
                    wu1.on("completed", () => {
                        resolve();
                    });
                }
            });
        });
        it("result schema", () => {
            return wu1.fetchResults().then((results) => {
                expect(wu1.isComplete(), "isComplete").is.true;
                expect(results.length).equals(2);
                expect(results[0].Name).to.equal("Result 1");
                expect(results[0].Sequence).to.equal(0);
                return wu1.CResults[0].fetchXMLSchema().then((schema) => {
                    expect(schema!.root).exist;
                    return schema;
                });
            });
        });
        it("results", () => {
            return wu1.fetchResults().then((results) => {
                expect(wu1.isComplete(), "isComplete").is.true;
                expect(results.length).equals(2);
                return wu1.CResults[0].fetchRows().then(response => {
                    expect(response.length).to.equal(11);
                    return response;
                });
            });
        });
        it("results filter", () => {
            return wu1.fetchResults().then((results) => {
                expect(results.length).equals(2);
                return wu1.CResults[0].fetchRows(0, 100, false, { user: "Bob" }).then(response => {
                    expect(response.length).to.equal(2);
                    return response;
                });
            });
        });
        it("WUDetails array response", async () => {
            await wu1.watchUntilComplete();
            expect(wu1.isComplete(), "isComplete").is.true;
            return wu1.fetchDetailsRaw({
                "ScopeFilter": {
                    "MaxDepth": 1,
                    "ScopeTypes": ["all"]
                },
                "NestedFilter": {
                    "Depth": 999999,
                    "ScopeTypes": []
                },
                "PropertiesToReturn": {
                    "AllScopes": true,
                    "AllAttributes": true,
                    "AllProperties": true,
                    "AllNotes": true,
                    "AllStatistics": true,
                    "AllHints": true
                },
                "ScopeOptions": {
                    "IncludeId": true,
                    "IncludeScope": true,
                    "IncludeScopeType": true,
                    "IncludeMatchedScopesInResults": true
                },
                "PropertyOptions": {
                    "IncludeName": true,
                    "IncludeRawValue": true,
                    "IncludeFormatted": true,
                    "IncludeMeasure": true,
                    "IncludeCreator": false,
                    "IncludeCreatorType": false
                }
            }).then((response) => {
                expect(response).to.be.an("array");
                expect(response.length).to.be.greaterThan(0);
            });
        });
        it("clone", async () => {
            const newWu = await wu1.clone();
            expect(newWu).to.exist;
            await newWu.watchUntilComplete();
            await newWu.fetchResults().then((results) => {
                expect(results.length).equals(2);
                return newWu.CResults[0].fetchRows(0, 100, false, { user: "Bob" }).then(response => {
                    expect(response.length).to.equal(2);
                    return response;
                });
            });
            await newWu.delete();
            expect(newWu.isDeleted(), "isDeleted").is.true;
        });
        describe("protect/unprotect", () => {
            it("protect", () => {
                return wu1.protect().then(() => {
                    expect(wu1.Protected).to.be.true;
                });
            });
            it("delete (protected - should fail)", () => {
                return wu1.delete().then(response => {
                    expect(wu1.isDeleted(), "isDeleted").is.false;
                    return response;
                });
            });
            it("unprotect", () => {
                return wu1.unprotect().then(() => {
                    expect(wu1.Protected).to.be.false;
                });
            });
        });
    }, 30000);

    describe("Syntax Error", () => {
        it("eclSubmit", () => {
            return Workunit.submit({ baseUrl: ESP_URL }, "hthor", "'Hello and Welcome!';\nSome Error;\n123;").then((wu) => {
                return wu.watchUntilComplete();
            }).then((wu) => {
                return wu.refresh(true);
            }).then((wu) => {
                expect(wu.isFailed()).to.be.true;
                expect(wu.ErrorCount).to.be.greaterThan(0);
                return wu.fetchECLExceptions().then((eclExceptions) => {
                    expect(eclExceptions.length).to.be.greaterThan(0);
                    return wu;
                });
            }).then((wu) => {
                return wu.delete();
            }).catch(e => {
                expect(true, "Syntax Error-eclSubmit-Error!").to.be.false;
            });
        });

    });

    describe("Readme quick start", () => {
        it("eclSubmit", () => {
            return Workunit.submit({ baseUrl: ESP_URL }, "hthor", "'Hello and Welcome!';").then((wu) => {
                return wu.watchUntilComplete();
            }).then((wu) => {
                return wu.fetchResults().then((results) => {
                    return results[0].fetchRows();
                }).then((rows) => {
                    logger.debug(rows);
                    return wu;
                });
            }).then((wu) => {
                return wu.delete();
            });
        });

        it("query", () => {
            return Workunit.query({ baseUrl: ESP_URL }, { State: "completed", Count: 3 }).then((wus) => {
                wus.forEach((wu) => {
                    logger.debug(`${wu.Wuid} Total Cluster Time:  ${wu.TotalClusterTime}`);
                });
            });
        });

        it("resubmit", () => {
            const eclWorkunit = Workunit.attach({ baseUrl: ESP_URL }, WUID);
            return eclWorkunit.resubmit()
                .then((wu) => {
                    return wu.watchUntilComplete()
                        .then(() => {
                            return wu.fetchResults().then((results) => {
                                return results[0].fetchRows(0, 100);
                            }).then((rows) => {
                                logger.debug(rows);
                            });
                        });
                }).catch((e) => {
                    logger.debug(e);
                });
        });
    }, 30000);

    describe("Compile + watchUntilComplete", () => {
        it("Simple", () => {
            return Workunit.compile({ baseUrl: ESP_URL }, "hthor", "'Hello and Welcome!';").then((wu) => {
                return wu.watchUntilComplete();
            }).then((wu) => {
                return wu.delete();
            }).catch((e) => {
                logger.debug(e);
            });
        });

        it("Compile + Attach", () => {
            return Workunit.compile({ baseUrl: ESP_URL }, "hthor", "'Hello and Welcome!';").then((wu) => {
                return Workunit.attach({ baseUrl: ESP_URL }, wu.Wuid);
            }).then(wu => {
                return wu.watchUntilComplete();
            }).then((wu) => {
                return wu.delete();
            }).catch((e) => {
                logger.debug(e);
            });
        });
    });
});
