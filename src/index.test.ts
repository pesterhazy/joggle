import assert from "node:assert";
import test from "node:test";
import { evalJoggle } from "./index.ts";

test("simple test", (t) => {
  let result = evalJoggle(true);
  assert.strictEqual(result, true);
});

