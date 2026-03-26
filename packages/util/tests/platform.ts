
import { isBrowser, isNode, isCI } from "../src/index.ts";

console.log(`isBrowser:  ${isBrowser}`);
console.log(`isNode:  ${isNode}`);
console.log(`isTavis:  ${isCI}`);
