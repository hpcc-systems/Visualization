import { expect } from "chai";

import { AccessService } from "@hpcc-js/comms";
import { ESP_URL, isCI } from "../testLib";

describe("WsAccess", function () {
    it("service exists", function () {
        const service = new AccessService({ baseUrl: ESP_URL });
        expect(service).exist;
    });
    it("UserQuery NoSecMgr defined", function () {
        const service = new AccessService({ baseUrl: ESP_URL });
        return service.UserQuery({})
            .then(response => {
                expect(response?.NoSecMngr).to.exist;
                return response;
            });
    });
    /* Create User */
    it("Add user", function () {
        if (!isCI) {
            const service = new AccessService({
                baseUrl: ESP_URL,
                userID: "",
                password: ""
            });
            return service.AddUser({
                username: "Test",
            })
                .then(response => {
                    expect(response?.retcode).to.be.gt(0);
                    return response;
                });
        } else {
            this.skip();
        }
    });
    /* Find User */
    it("User exists", function () {
        if (!isCI) {
            const service = new AccessService({
                baseUrl: ESP_URL,
                userID: "",
                password: ""
            });
            return service.UserQuery({ Name: "Test" })
                .then(response => {
                    expect(response?.Users?.User).to.exist;
                    expect(response?.Users?.User.length).to.be.eq(1);
                    return response;
                });
        } else {
            this.skip();
        }
    });
    /* Modify User Permissions */
    /* Create Group */
    /* Find Group */
    /* Add User to Group */
    /* Delete Group */
    /* Delete User */
});