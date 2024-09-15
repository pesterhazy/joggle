import assert from "node:assert";
import test from "node:test";
import { evalJoggle } from "./index.ts";

test("values evaluate to themselves", (t) => {
  let result = evalJoggle(true);
  assert.strictEqual(result, true);
});

test("or evaluates to true if either operand is true", (t) => {
  let result = evalJoggle(["or", true, false]);
  assert.strictEqual(result, true);
});

test("or evaluates to false if both operands are false", (t) => {
  let result = evalJoggle(["or", false, false]);
  assert.strictEqual(result, false);
});

test("and evaluates to true if both operands are true", (t) => {
  let result = evalJoggle(["and", true, true]);
  assert.strictEqual(result, true);
});

test("identity evaluates to the parameter", (t) => {
  let result = evalJoggle(["identity", true]);
  assert.strictEqual(result, true);
});

test("nested expressions are evaluated correctly", (t) => {
  let result = evalJoggle(["identity", ["identity", true]]);
  assert.strictEqual(result, true);
});

test("numbers are valid values", (t) => {
  let result = evalJoggle(1);
  assert.strictEqual(result, 1);
});

test("strings are valid values", (t) => {
  let result = evalJoggle("hello");
  assert.strictEqual(result, "hello");
});

test("eq evaluates to true if both operands are equal", (t) => {
  let result = evalJoggle(["eq",1,1]);
  assert.strictEqual(result, true);
});

test("Functions that aren't built-ins are taken from the environment", (t) => {
  let env = {"alwaysOne": () => 1};
  let result = evalJoggle(["alwaysOne"], env);
  assert.strictEqual(result, 1);
});

test("evaluating an empty array throws an error", (t) => {
  assert.throws(() => {
    evalJoggle([]);
  }, {
    name: 'Error',
    message: 'Invalid expression'
  });
});

