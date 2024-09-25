import { describe, it, expect } from "vitest";

import { DFUWorkunit, Workunit } from "@hpcc-js/comms";
import { ESP_URL } from "./testLib.ts";

const connOptions = { baseUrl: ESP_URL };
let netAddress: string;

describe("test/esp/ecl/DFUWorkunit", function () {

    describe("fixed file life cycle", function () {
        let dfuWu: DFUWorkunit;
        let wu: Workunit;
        it("get LZ IP", function () {
            return fetch(ESP_URL + "WsTopology/TpDropZoneQuery.json", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(({ TpDropZoneQueryResponse }) => {
                    const dropzone = TpDropZoneQueryResponse?.TpDropZones?.TpDropZone[0];
                    netAddress = dropzone?.TpMachines?.TpMachine[0]?.Netaddress ?? "";
                }).catch(err => console.log(err));
        });
        it("create workunit", function () {
            return Workunit.create({
                ...connOptions,
                hookSend: (options, action, request, responseType, defaultSend, header?: any) => {
                    return defaultSend(options, action, request, responseType, { ...header, myCreds: "007-shhh" });
                }
            }).then((_wu) => {
                expect(_wu).exist;
                expect(_wu.Wuid).exist;
                wu = _wu;
                return _wu;
            });
        });
        it("update", function () {
            return wu.update({
                QueryText: `
Layout_UsPresident := RECORD
    STRING FName;
    STRING LName;
    STRING9 BeginDate;
    STRING8 EndDate;
END;

usPresidents := DATASET([
    {'George								','Washington		','17890430	','17970304'},
    {'John										','Adams							','17970304	','18010304'},
    {'Thomas								','Jefferson			','18010304	','18090304'},
    {'James									','Madison					','18090304	','18170304'},
    {'James									','Monroe						','18170304	','18250304'},
    {'John Quincey		','Adams							','18250304	','18290304'}
], Layout_UsPresident);

OUTPUT(usPresidents,,'.::test::abc::123::us_presidents.txt',OVERWRITE);`
            });
        });
        it("submit", function () {
            return wu.submit("thor");
        });
        it("complete", function () {
            return new Promise<void>((resolve) => {
                if (wu.isComplete()) {
                    resolve();
                } else {
                    wu.on("completed", () => {
                        resolve();
                    });
                }
            });
        });
        it("export (despray) fixed file", function () {
            return DFUWorkunit.despray(
                connOptions,
                {
                    destGroup: "mydropzone",
                    destIP: netAddress,
                    destPath: "/var/lib/HPCCSystems/mydropzone/test/us_presidents.txt",
                    overwrite: true,
                    sourceLogicalName: "thor::test::abc::123::us_presidents.txt"
                }
            ).then(wu => {
                expect(wu).exist;
                expect(wu.ID).exist;
                dfuWu = wu;
                return wu;
            });
        });
        it("export fixed finished", function () {
            return new Promise<void>((resolve) => {
                if (dfuWu.isComplete()) {
                    resolve();
                } else {
                    dfuWu.on("finished", () => {
                        resolve();
                    });
                }
            });
        });
        it("delete DFU WU", function () {
            return dfuWu.delete().then(response => {
                expect(dfuWu.isDeleted(), "isDeleted").is.true;
                return response;
            });
        });
        it("import (spray) fixed file", function () {
            return DFUWorkunit.sprayFixed(
                connOptions,
                {
                    destGroup: "mythor",
                    DFUServerQueue: "dfuserver_queue",
                    sourceIP: netAddress,
                    sourcePath: "/var/lib/HPCCSystems/mydropzone/test/us_presidents.txt",
                    destLogicalName: "us_presidents.txt",
                    overwrite: true,
                    replicate: false,
                    nosplit: false,
                    failIfNoSourceFile: false,
                    sourceRecordSize: 51,
                }
            ).then(wu => {
                expect(wu).exist;
                expect(wu.ID).exist;
                dfuWu = wu;
                return wu;
            });
        });
        it("import fixed finished", function () {
            return new Promise<void>((resolve) => {
                if (dfuWu.isComplete()) {
                    resolve();
                } else {
                    dfuWu.on("finished", () => {
                        resolve();
                    });
                }
            });
        });
        it("delete WU", function () {
            return wu.delete().then(response => {
                expect(wu.isDeleted(), "isDeleted").is.true;
                return response;
            });
        });
        it("delete DFU WU", function () {
            return dfuWu.delete().then(response => {
                expect(dfuWu.isDeleted(), "isDeleted").is.true;
                return response;
            });
        });
    });

    describe("CSV file life cycle", function () {
        let dfuWu: DFUWorkunit;
        let wu: Workunit;
        it("create workunit", function () {
            return Workunit.create({
                ...connOptions,
                hookSend: (options, action, request, responseType, defaultSend, header?: any) => {
                    return defaultSend(options, action, request, responseType, { ...header, myCreds: "007-shhh" });
                }
            }).then((_wu) => {
                expect(_wu).exist;
                expect(_wu.Wuid).exist;
                wu = _wu;
                return _wu;
            });
        });
        it("update", function () {
            return wu.update({
                QueryText: `
Layout_FakePerson := RECORD
    STRING15  FirstName;
    STRING25  LastName;
    STRING25  Email;
    STRING12  Phone;
END;

fakePeople := DATASET([
    {'John','Doe','john.doe@email.com','212-555-2483'},
    {'David','Smith','dsmith@some-domain.net','916.555.1902'},
    {'Sara','Adams','sara888@mailman.com','636-555.1239'},
    {'Jessica','Johnson','jjohnson89@mail.com','412.555.4481'},
    {'Denise','Lipman','dlipman0@google.cn','505-551-4557'},
    {'Jervis','De Biasio','jdebiasio1@google.com.br','573-724-2522'},
    {'Broderic','Thying','bthying2@ustream.tv','911-520-3383'},
    {'Bettina','Munroe','bmunroe3@mediafire.com','958-121-3222'},
    {'Olive','Yakobowitz','oyakobowitz4@paginegialle.it','555-866-9183'},
    {'Sigmund','Bolmann','sbolmann5@fastcompany.com','275-470-0428'}
], Layout_FakePerson);

OUTPUT(fakePeople,,'.::test::abc::123::fake_people.csv',CSV(HEADING(SINGLE)),OVERWRITE);`
            });
        });
        it("submit", function () {
            return wu.submit("thor");
        });
        it("complete", function () {
            return new Promise<void>((resolve) => {
                if (wu.isComplete()) {
                    resolve();
                } else {
                    wu.on("completed", () => {
                        resolve();
                    });
                }
            });
        });
        it("export (despray) CSV file", function () {
            return DFUWorkunit.despray(
                connOptions,
                {
                    destGroup: "mydropzone",
                    destIP: netAddress,
                    destPath: "/var/lib/HPCCSystems/mydropzone/test/fake_people.csv",
                    overwrite: true,
                    sourceLogicalName: "thor::test::abc::123::fake_people.csv"
                }
            ).then(wu => {
                expect(wu).exist;
                expect(wu.ID).exist;
                dfuWu = wu;
                return wu;
            });
        });
        it("export CSV finished", function () {
            return new Promise<void>((resolve) => {
                if (dfuWu.isComplete()) {
                    resolve();
                } else {
                    dfuWu.on("finished", () => {
                        resolve();
                    });
                }
            });
        });
        it("delete DFU WU", function () {
            return dfuWu.delete().then(response => {
                expect(dfuWu.isDeleted(), "isDeleted").is.true;
                return response;
            });
        });
        it("import (spray) CSV file", function () {
            return DFUWorkunit.sprayVariable(
                connOptions,
                {
                    destGroup: "mythor",
                    DFUServerQueue: "dfuserver_queue",
                    sourceIP: netAddress,
                    sourcePath: "/var/lib/HPCCSystems/mydropzone/test/fake_people.csv",
                    sourceFormat: 1,
                    sourceCsvSeparate: ",",
                    sourceCsvTerminate: "\n,\r\n",
                    sourceCsvQuote: "\"",
                    quotedTerminator: true,
                    destLogicalName: "fake_people.csv",
                    NoSourceCsvSeparator: false,
                    overwrite: true,
                    replicate: false,
                    nosplit: false,
                    failIfNoSourceFile: false,
                    recordStructurePresent: false
                }
            ).then(wu => {
                expect(wu).exist;
                expect(wu.ID).exist;
                dfuWu = wu;
                return wu;
            });
        });
        it("import CSV finished", function () {
            return new Promise<void>((resolve) => {
                if (dfuWu.isComplete()) {
                    resolve();
                } else {
                    dfuWu.on("finished", () => {
                        resolve();
                    });
                }
            });
        });
        it("delete WU", function () {
            return wu.delete().then(response => {
                expect(wu.isDeleted(), "isDeleted").is.true;
                return response;
            });
        });
        it("delete DFU WU", function () {
            return dfuWu.delete().then(response => {
                expect(dfuWu.isDeleted(), "isDeleted").is.true;
                return response;
            });
        });
    });

    describe("JSON file life cycle", function () {
        let dfuWu: DFUWorkunit;
        let wu: Workunit;
        it("create workunit", function () {
            return Workunit.create({
                ...connOptions,
                hookSend: (options, action, request, responseType, defaultSend, header?: any) => {
                    return defaultSend(options, action, request, responseType, { ...header, myCreds: "007-shhh" });
                }
            }).then((_wu) => {
                expect(_wu).exist;
                expect(_wu.Wuid).exist;
                wu = _wu;
                return _wu;
            });
        });
        it("update", function () {
            return wu.update({
                QueryText: `
Layout_Book := RECORD
    STRING14 id;
    STRING32 title;
    STRING12 author;
END;

books := DATASET([
    {'978-0641723445', 'The Lightning Thief', 'Rick Riordan'},
    {'978-1423103349', 'The Sea of Monsters', 'Rick Riordan'}
], Layout_Book);

OUTPUT(books,,'.::test::abc::123::books.json',JSON,OVERWRITE);`
            });
        });
        it("submit", function () {
            return wu.submit("thor");
        });
        it("complete", function () {
            return new Promise<void>((resolve) => {
                if (wu.isComplete()) {
                    resolve();
                } else {
                    wu.on("completed", () => {
                        resolve();
                    });
                }
            });
        });
        it("export (despray) JSON file", function () {
            return DFUWorkunit.despray(
                connOptions,
                {
                    destGroup: "mydropzone",
                    destIP: netAddress,
                    destPath: "/var/lib/HPCCSystems/mydropzone/test/books.json",
                    overwrite: true,
                    sourceLogicalName: "thor::test::abc::123::books.json"
                }
            ).then(wu => {
                expect(wu).exist;
                expect(wu.ID).exist;
                dfuWu = wu;
                return wu;
            });
        });
        it("export JSON finished", function () {
            return new Promise<void>((resolve) => {
                if (dfuWu.isComplete()) {
                    resolve();
                } else {
                    dfuWu.on("finished", () => {
                        resolve();
                    });
                }
            });
        });
        it("delete DFU WU", function () {
            return dfuWu.delete().then(response => {
                expect(dfuWu.isDeleted(), "isDeleted").is.true;
                return response;
            });
        });
        it("import (spray) JSON file", function () {
            return DFUWorkunit.sprayVariable(
                connOptions,
                {
                    destGroup: "mythor",
                    DFUServerQueue: "dfuserver_queue",
                    sourceIP: netAddress,
                    sourcePath: "/var/lib/HPCCSystems/mydropzone/test/books.json",
                    sourceFormat: 2,
                    sourceRowPath: "/",
                    isJSON: true,
                    destLogicalName: "books.json",
                    NoSourceCsvSeparator: false,
                    overwrite: true,
                    replicate: false,
                    nosplit: false,
                    failIfNoSourceFile: false,
                    recordStructurePresent: false
                }
            ).then(wu => {
                expect(wu).exist;
                expect(wu.ID).exist;
                dfuWu = wu;
                return wu;
            });
        });
        it("import JSON finished", function () {
            return new Promise<void>((resolve) => {
                if (dfuWu.isComplete()) {
                    resolve();
                } else {
                    dfuWu.on("finished", () => {
                        resolve();
                    });
                }
            });
        });
        it("delete WU", function () {
            return wu.delete().then(response => {
                expect(wu.isDeleted(), "isDeleted").is.true;
                return response;
            });
        });
        it("delete DFU WU", function () {
            return dfuWu.delete().then(response => {
                expect(dfuWu.isDeleted(), "isDeleted").is.true;
                return response;
            });
        });
    });
});