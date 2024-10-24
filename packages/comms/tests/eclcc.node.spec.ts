import { describe, it, expect } from "vitest";

import { EclccErrors, locateClientTools, Version, Workunit } from "@hpcc-js/comms";
import { isBrowser } from "@hpcc-js/util";
import { ESP_URL, isCI } from "./testLib.ts";

import { access, unlink } from "fs/promises";
import * as path from "path";

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

function hasError(errStr: string): boolean {
    const err = new EclccErrors(errStr, []);
    return err.hasError();
}

describe("eclcc", function () {
    it("basic", function () {
        expect(locateClientTools).to.be.a("function");
        return locateClientTools().then(clienttools => {
        }).catch(e => {
            //  No eclcc on travis...
        });
    });

    if (!isCI) {
        it("end2end", function () {
            return locateClientTools(undefined, undefined, __dirname).then((clientTools) => {
                console.log("__dirname", __dirname);
                console.log("import.meta.url", import.meta?.url);
                console.log(path.join(__dirname, "some.ecl"));
                return clientTools.createArchive(path.join(__dirname, "some.ecl"));
            }).then(archive => {
                console.log(archive)
                return Workunit.submit({ baseUrl: ESP_URL }, "hthor", archive.content);
            }).then((wu) => {
                return wu.watchUntilComplete();
            }).then((wu) => {
                return wu.fetchResults().then((results) => {
                    expect(results.length).to.be.greaterThan(0);
                    return results[0].fetchRows();
                }).then((rows) => {
                    expect(rows.length).to.be.greaterThan(0);
                    return wu;
                });
            }).then((wu) => {
                return wu.delete();
            }).catch(e => {
                console.error(e.message ?? e);
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

        it("eclcc locate", function () {
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

        it("Syntax Error", function () {
            expect(hasError(`c:\\Users\\gordon\\Downloads\\VS\\SomeFolder\\VS\\BWR\\BWR_welcome.ecl(1,7): error C3002: syntax error near "'Welcome'" : expected ANY, ASCII, ASSERT, BIG_ENDIAN, CONST, DATASET, DICTIONARY, EBCDIC, GROUPED, IF, LITTLE_ENDIAN, NOCONST, OPT, OUT, PACKED, PATTERN, RECORD, ROW, RULE, SET, type-name, TOKEN, TYPEOF, UNSIGNED, VIRTUAL, <?>, <??>, dataset, identifier, identifier, type name, type name, type name, type name, datarow, function-name, function-name, action, pattern, event, transform-name, '^', '$'`)).to.be.true;
            expect(hasError(`c:\\Users\\gordon\\Down-loads\\VS\\Some Folder\\VS\\BWR\\BWR_welcome.ecl(1,7): error C3002: syntax error near "'Welcome'" : expected ANY, ASCII, ASSERT, BIG_ENDIAN, CONST, DATASET, DICTIONARY, EBCDIC, GROUPED, IF, LITTLE_ENDIAN, NOCONST, OPT, OUT, PACKED, PATTERN, RECORD, ROW, RULE, SET, type-name, TOKEN, TYPEOF, UNSIGNED, VIRTUAL, <?>, <??>, dataset, identifier, identifier, type name, type name, type name, type name, datarow, function-name, function-name, action, pattern, event, transform-name, '^', '$'`)).to.be.true;
            expect(hasError("c:\\temp\\test.ecl(7,13) : error C007 : Hello and Welcome")).to.be.true;
        });

        async function exists(filePath: string) {
            try {
                await access(filePath);
                return true;
            } catch (e) {
                return false;
            }
        }

        it("eclcclog", async () => {
            const tmpFile = path.join(__dirname, "my log file.txt");
            await unlink(tmpFile).catch(e => { });
            expect(await exists(tmpFile)).to.be.false;
            const clientTools = await locateClientTools(undefined, undefined, __dirname, undefined, undefined, [`--logfile=${tmpFile}`]);
            expect(await exists(tmpFile)).to.be.false;
            const archive = await clientTools.createArchive(path.join(__dirname, "some.ecl"));
            expect(await exists(tmpFile)).to.be.true;
            const wu = await Workunit.submit({ baseUrl: ESP_URL }, "hthor", archive.content);
            await wu.watchUntilComplete();
            const results = await wu.fetchResults();
            expect(results.length).to.be.greaterThan(0);
            const rows = await results[0].fetchRows();
            expect(rows.length).to.be.greaterThan(0);
            await wu.delete();
            await unlink(tmpFile);
        });
    }
}, 30000);
