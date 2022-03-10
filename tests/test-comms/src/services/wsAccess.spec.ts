import { expect } from "chai";

import { AccessService } from "@hpcc-js/comms";
import { ESP_URL } from "../testLib";

describe("WsAccess", function () {
    let hasSecMngr = false;
    it("service exists", function () {
        const service = new AccessService({ baseUrl: ESP_URL });
        expect(service).exist;
    });
    it("UserQuery NoSecMgr undefined", function () {
        const service = new AccessService({ baseUrl: ESP_URL });
        return service.UserQuery({})
            .then(response => {
                expect(response?.NoSecMngr).to.exist;
                hasSecMngr = response?.NoSecMngr !== true;
                return response;
            }).catch(e => {
                this.skip();
            });
    });
    /* Create User */
    it("Add user", function () {
        if (hasSecMngr) {
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
        if (hasSecMngr) {
            const service = new AccessService({
                baseUrl: ESP_URL,
                userID: "",
                password: ""
            });
            return service.UserQuery({ Name: "Test" })
                .then(({ Users }) => {
                    expect(Users?.User).to.exist;
                    expect(Users?.User.length).to.be.eq(1);
                    return Users;
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
