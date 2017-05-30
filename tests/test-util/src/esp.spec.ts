import { expect } from "chai";

import { espTime2Seconds } from "@hpcc-js/util";

describe("ESPConnection", function () {
    it("espTime2SecondsTests", function () {
        expect(espTime2Seconds("1.1s")).to.equals(1.1);
        expect(espTime2Seconds("2.2ms")).to.equals(0.0022);
        expect(espTime2Seconds("3.3ns")).to.be.closeTo(0.0000000033, 0.00000000001);
        expect(espTime2Seconds("4.4")).to.equals(4.4);
        expect(espTime2Seconds("5:55.5")).to.equals(355.5);
        expect(espTime2Seconds("6:06:06.6")).to.equals(21966.6);
        expect(espTime2Seconds("6:06:6.6")).to.equals(21966.6);
        expect(espTime2Seconds("6:6:6.6")).to.equals(21966.6);
        expect(espTime2Seconds("7 days 7:07:7.7")).to.equals(630427.7);
    });
});
