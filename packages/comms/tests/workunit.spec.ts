import { describe, it, expect } from "vitest";

import { Workunit } from "@hpcc-js/comms";
import { scopedLogger } from "@hpcc-js/util";
import { ESP_URL, isCI } from "./testLib.ts";

const logger = scopedLogger("test/workunit");
const WUID = "W20170510-114044";

describe("test/esp/ecl/Workunit", () => {
    describe("simple life cycle", () => {
        let wu1: Workunit;
        it("creation", () => {
            return Workunit.create({
                baseUrl: ESP_URL,
                hookSend: (options, action, request, responseType, defaultSend, header?: any) => {
                    return defaultSend(options, action, request, responseType, { ...header, myCreds: "007-shhh" });
                }
            }).then((wu) => {
                expect(wu).exist;
                expect(wu.Wuid).exist;
                wu1 = wu;
                return wu;
            }).catch(e => {
                logger.error(e.message ?? e);
            });
        });
        it("update", () => {
            return wu1.update({
                QueryText: `
Layout_Person := RECORD
    UNSIGNED1 PersonID;
    STRING15  FirstName;
    STRING25  LastName;
END;

allPeople := DATASET([  {1,'Fred','Smith'},
                        {2,'Joe','Blow'},
                        {3,'Jane','Smith'}], Layout_Person);

allPeople;
                `
            });
        });
        it("submit", () => {
            return wu1.submit("hthor");
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
                expect(results.length).equals(1);
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
                expect(results.length).equals(1);
                return wu1.CResults[0].fetchRows().then(response => {
                    expect(response.length).to.equal(3);
                    return response;
                });
            });
        });
        it("results filter", () => {
            return wu1.fetchResults().then((results) => {
                expect(results.length).equals(1);
                return wu1.CResults[0].fetchRows(0, 100, false, { LastName: "Smith" }).then(response => {
                    expect(response.length).to.equal(2);
                    return response;
                });
            });
        });
        it.skip("clone", async () => {
            const newWu = await wu1.clone();
            expect(newWu).to.exist;
            await newWu.fetchResults().then((results) => {
                expect(results.length).equals(1);
                return newWu.CResults[0].fetchRows(0, 100, false, { LastName: "Smith" }).then(response => {
                    expect(response.length).to.equal(2);
                    return response;
                });
            });
            await newWu.delete();
            expect(newWu.isDeleted(), "isDeleted").is.true;
        });
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
        it("delete (unprotected)", () => {
            return wu1.delete().then(response => {
                expect(wu1.isDeleted(), "isDeleted").is.true;
                return response;
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

    if (!isCI) {
        describe.skip("WUDetails", () => {
            const wu = Workunit.attach({ baseUrl: ESP_URL }, WUID);
            it("WU Exists", () => {
                return wu.refresh().then(() => {
                    expect(wu.isComplete() === true);
                    expect(wu.Jobname === "GenData");
                });
            });
            /*
            it("All Props", () => {
                return wu.fetchDetails({
                    ScopeOptions: {
                        IncludeId: true,
                        IncludeScope: true,
                        IncludeScopeType: true
                    },
                    AttributeOptions: {
                        IncludeName: true,
                        IncludeRawValue: true,
                        IncludeFormatted: true,
                        IncludeMeasure: true,
                        IncludeCreator: true,
                        IncludeCreatorType: true
                    }
                }).then((scopes) => {
                    scopes.forEach((scope) => {
                        scope.CAttributes.forEach((_attr) => {
                            // logger.debug(`${scope.Wuid}:${scope.Scope} (${scope.ScopeType}) -> ${JSON.stringify(_attr.properties)}`);
                        });
                    });
                });
            });
            it("Filter.AttributeFilters", () => {
                return wu.fetchDetails({
                    Filter: {
                        AttributeFilters: {
                            AttributeFilter: [{ Name: "WhenGraphStarted" }]
                        }
                    }
                }).then((scopes) => {
                    expect(scopes.length).to.be.greaterThan(0);
                    scopes.forEach((scope) => {
                        expect(scope.hasAttr("WhenGraphStarted")).to.be.true;
                        scope.CAttributes.forEach((_attr) => {
                            logger.debug(`${scope.wu.Wuid}:${scope.Scope} (${scope.ScopeType}) -> ${JSON.stringify(_attr.properties)}`);
                        });
                    });
                });
            });
            it("Filter.AttributeFilters+AttributeToReturn.Attributes", () => {
                return wu.fetchDetails({
                    Filter: {
                        AttributeFilters: {
                            AttributeFilter: [{ Name: "WhenGraphStarted" }]
                        }
                    },
                    AttributeToReturn: {
                        Attributes: ["WhenGraphStarted"]
                    }
                }).then((scopes) => {
                    expect(scopes.length).to.be.greaterThan(0);
                    scopes.forEach((scope) => {
                        scope.CAttributes.forEach((attr) => {
                            expect(attr.Name).to.equal("WhenGraphStarted");
                        });
                    });
                });
            });
            it("Filter.AttributeFilters+AttributeToReturn.Measure", () => {
                return wu.fetchDetails({
                    Filter: {
                        AttributeFilters: {
                            WUAttributeFilter: [{ Name: "WhenGraphStarted" }]
                        }
                    },
                    AttributeToReturn: {
                        Measure: "ts"
                    }
                }).then((scopes) => {
                    expect(scopes.length).to.be.greaterThan(0);
                    scopes.forEach((scope) => {
                        scope.CAttributes.forEach((attr) => {
                            expect(attr.Measure).to.equal("ts");
                        });
                    });
                });
            });
            it("WUTimeline", () => {
                return wu.fetchDetails({ Filter: { Scopes: ["workunit"] } }).then((scopes) => {
                    expect(scopes.length).to.be.greaterThan(0);
                    scopes.forEach((scope) => {
                        expect(scope.Scope).to.equal("workunit");
                        scope.CAttributes.forEach((_attr) => {
                            logger.debug(`${scope.wu.Wuid}:${scope.Scope} (${scope.ScopeType}) -> ${JSON.stringify(_attr.properties)}`);
                        });
                    });
                });
            });
            */
        });
    }

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
