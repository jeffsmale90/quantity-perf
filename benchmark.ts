import * as B from "benny";
import {
  newQuantityToBigInt,
  newQuantityToBuffer,
  newQuantityToNumber,
  newQuantityToString,
  staticToBigInt,
  staticToBuffer,
  staticToNumber,
  staticToString,
  add,
  multiply,
  multiplyThenAdd,
  helper_add,
  helper_multiply,
  helper_multiplyThenAdd,
} from "./benchmark/quantityBenchmarks";

const version: "perf_quantity-math"|"develop" = "develop";
import {strings, numbers, buffers, bigints} from "./data";

[
  staticToBuffer,
  newQuantityToBuffer,
  staticToString,
  newQuantityToString,
  staticToNumber,
  newQuantityToNumber,
  staticToBigInt,
  newQuantityToBigInt,
  add,
  multiply,
  multiplyThenAdd,
  //helper_add,
  //helper_multiply,
  //helper_multiplyThenAdd
].forEach((testFunc) => {
  return B.suite(
    testFunc.name,
    testFunc("string", strings),
    testFunc("number", numbers),
    testFunc("buffer", buffers),
    testFunc("bigint", bigints),
    B.cycle(),
    B.save({ file: `${testFunc.name}.${version}`, version: version })
  );
});


/*
todo:
- test against current tip, and the revision _before_ I added lazy and raw numeric values
- add tests for addition / multiplication with _and_ without the helper functions
- consider adding comparisions with different ranges of values (ie 2 bytes long, vs 10 bytes long) 
*/