import { endsWith, safeEncode, trim } from "@hpcc-js/util";
import { expect } from "chai";

describe("String", function () {
    it("endsWith", function () {
        expect(endsWith("abcdef", "f")).true;
        expect(endsWith("abcdef", "ef")).true;
        expect(endsWith("abcdef", "def")).true;
        expect(endsWith("abcdef", "deff")).false;
        expect(endsWith("abcdef", "")).true;
        expect(endsWith("", "")).true;
        expect(endsWith("", "x")).false;
    });
    it("trim", function () {
        expect(trim("abcdefa", "a")).equals("bcdef");
        expect(trim("abcdefa", "b")).equals("abcdefa");
        expect(trim("abcdef", "f")).equals("abcde");
        expect(trim("abcdef", "a")).equals("bcdef");
        expect(trim("abcdef", "")).equals("abcdef");
        expect(trim("", "a")).equals("");
        expect(trim("", "")).equals("");
    });
    it("safeEncode", function () {
        expect(safeEncode(undefined)).equals(undefined);
        expect(safeEncode(1)).equals(1);
        expect(safeEncode(false)).equals(false);
        expect(safeEncode("1")).equals("1");
        expect(safeEncode("<div>1</div>")).equals("&lt;div&gt;1&lt;/div&gt;");
        expect(safeEncode('&<>"1&<>"')).equals("&amp;&lt;&gt;&quot;1&amp;&lt;&gt;&quot;");
    });
});
