import { expect } from "chai";

import { locateClientTools, Version, Workunit } from "@hpcc-js/comms";
import { isBrowser } from "@hpcc-js/util";
import { isTravis } from "../testLib";

function test(build: string, prefix: string, major: number, minor: number, patch: number, postfix: string): boolean {
    const version = new Version(build);
    return version.prefix === prefix && version.major === major && version.minor === minor && version.patch === patch && version.postfix === postfix;
}

function logVersion(build: string): Promise<void> {
    return locateClientTools("", build).then(ct => {
        return ct.version().then(version => {
            console.log(`${build} => ${version.toString()}`);
        });
    });
}

describe("eclcc", function () {
    if (!isBrowser) {
        it("basic", function () {
            expect(locateClientTools).to.be.a("function");
            return locateClientTools().then(clienttools => {
            }).catch(e => {
                //  No eclcc on travis...
            });
        });

        if (!isTravis) {
            it("end2end", function () {
                return locateClientTools(undefined, undefined, ".").then((clientTools) => {
                    return clientTools.createArchive("./src/clienttools/some.ecl");
                }).then(archive => {
                    return Workunit.submit({ baseUrl: "http://52.210.14.156:8010/" }, "hthor", archive.content);
                }).then((wu) => {
                    return wu.watchUntilComplete();
                }).then((wu) => {
                    return wu.fetchResults().then((results) => {
                        return results[0].fetchRows();
                    }).then((rows) => {
                        return wu;
                    });
                }).then((wu) => {
                    return wu.delete();
                });
            });

            it("version", function () {
                expect(test("10.11.12", "", 10, 11, 12, "")).to.be.true;
                expect(test("community_4.0.0-9rc", "community", 4, 0, 0, "9rc")).to.be.true;
                expect(test("community_4.0.0-rc9", "community", 4, 0, 0, "rc9")).to.be.true;
                expect(test("community_4.0.0-rc9[abc]", "community", 4, 0, 0, "rc9[abc]")).to.be.true;
                expect(test("community_4.0.0-rc9[community_4.0.0-rc9-4-g826364-dirty]", "community", 4, 0, 0, "rc9[community_4.0.0-rc9-4-g826364-dirty]")).to.be.true;
                expect(test("community_54.10.10", "community", 54, 10, 10, "")).to.be.true;
                expect(test("6.4.14 community_6.4.14-1", "community", 6, 4, 14, "1")).to.be.true;
            });

            it("version compare", function () {
                const version5_6_8 = new Version("5.6.8");
                const version6_6_8 = new Version("6.6.8");
                expect(version5_6_8.compare(version6_6_8)).to.be.lessThan(0);
                expect(version6_6_8.compare(version5_6_8)).to.be.greaterThan(0);
                expect(version6_6_8.compare(version6_6_8)).to.equal(0);
                const version6_6_8rc1 = new Version("6.6.8-rc1");
                expect(version6_6_8.compare(version6_6_8rc1)).to.greaterThan(0);
                const version5_6_8rc1 = new Version("5.6.8-rc1");
                const version5_6_8rc2 = new Version("5.6.8-rc2");
                expect(version5_6_8rc1.compare(version5_6_8rc2)).to.lessThan(0);
            });

            it.skip("eclcc locate", function () {
                return Promise.all([
                    logVersion("comms_60.60.0"),
                    logVersion("comms_6.18.0"),
                    logVersion("comms_6.13.0"),
                    logVersion("comms_6.6.0"),
                    logVersion("comms_6.0.0"),
                    logVersion("comms_5.10.0"),
                    logVersion("comms_5.0.0")
                ]);
            });
        }
    }
});
