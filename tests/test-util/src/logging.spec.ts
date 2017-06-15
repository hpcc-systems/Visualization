import { expect } from "chai";

import { Level, scopedLogger } from "@hpcc-js/util";

const logger = scopedLogger("test/util/logging.ts");

describe("util/logging.ts", function () {
    it("basic", function () {
        expect(logger).exist;
        logger.debug("debug test");
        logger.info("info test");
        logger.notice("notice test");
        logger.warning("warning test");
        logger.error("error test");
        logger.critical("critical test");
        logger.alert("alert test");
        logger.emergency("emergency test");
    });
    it("basic", function () {
        expect(logger).exist;
        logger.pushLevel(Level.error);
        logger.debug("should not show");
        logger.warning("should not show");
        logger.error("should show");
        logger.emergency("should show");
        logger.popLevel();
        logger.debug("should show");
        logger.warning("should show");
        logger.error("should show");
        logger.emergency("should show");
    });
});
