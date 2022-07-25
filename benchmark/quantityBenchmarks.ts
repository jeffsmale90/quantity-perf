import { Quantity, JsonRpcDataInputArg } from "@ganache/utils";
import * as B from "benny";

// #region basic tests
export function newQuantityToBuffer<T extends JsonRpcDataInputArg | number | bigint>(
  name: string,
  data: T[]
) {
  let i = 0;
  const length = data.length;
  return B.add(name, () => {
    const input = data[i];
    new Quantity(input).toBuffer();
    i = (i + 1) % length;
  });
}

export function newQuantityToString<T extends JsonRpcDataInputArg | number | bigint>(
  name: string,
  data: T[]
) {
  let i = 0;
  const length = data.length;
  return B.add(name, () => {
    const input = data[i];
    new Quantity(input).toString();
    i = (i + 1) % length;
  });
}

export function staticToBuffer<T extends JsonRpcDataInputArg | number | bigint>(
  name: string,
  data: T[]
) {
  let i = 0;
  const length = data.length;
  return B.add(name, () => {
    const input = data[i];
    Quantity.toBuffer(input);
    i = (i + 1) % length;
  });
}

export function staticToString<T extends JsonRpcDataInputArg | number | bigint>(
  name: string,
  data: T[]
) {
  let i = 0;
  const length = data.length;
  return B.add(name, () => {
    const input = data[i];
    Quantity.toString(input);
    i = (i + 1) % length;
  });
}

export function newQuantityToNumber<T extends JsonRpcDataInputArg | number | bigint>(
  name: string,
  data: T[]
) {
  let i = 0;
  const length = data.length;
  return B.add(name, () => {
    const input = data[i];
    new Quantity(input).toNumber();
    i = (i + 1) % length;
  });
}

export function staticToNumber<T extends JsonRpcDataInputArg | number | bigint>(
  name: string,
  data: T[]
) {
  let i = 0;
  const length = data.length;
  return B.add(name, () => {
    const input = data[i];
    Quantity.toNumber(input);
    i = (i + 1) % length;
  });
}

export function newQuantityToBigInt<T extends JsonRpcDataInputArg | number | bigint>(
  name: string,
  data: T[]
) {
  let i = 0;
  const length = data.length;
  return B.add(name, () => {
    const input = data[i];
    new Quantity(input).toBigInt();
    i = (i + 1) % length;
  });
}

export function staticToBigInt<T extends JsonRpcDataInputArg | number | bigint>(
  name: string,
  data: T[]
) {
  let i = 0;
  const length = data.length;
  return B.add(name, () => {
    const input = data[i];
    Quantity.toBigInt(input);
    i = (i + 1) % length;
  });
}

// #endregion

export function add<T extends JsonRpcDataInputArg | number | bigint> (
  name: string,
  data: T[]
) {
  const addends = data.map(input => Quantity.from(input)).reverse();

  let i = 0;
  const length = data.length;

  return B.add(name, () => {
    const quantity: any = addends[i];
    const addend = addends[length - i - 1];
    Quantity.from(quantity.toBigInt() + addend.toBigInt()).toBuffer();
    i = (i + 1) % length;
  });
}

export function multiply<T extends JsonRpcDataInputArg | number | bigint> (
  name: string,
  data: T[]
) {
  const multipliers = data.map(input => Quantity.from(input)).reverse();

  let i = 0;
  const length = data.length;

  return B.add(name, () => {
    const quantity: any = multipliers[i];
    const multiplier: any = multipliers[length - i - 1];
    Quantity.from(quantity.toBigInt() * multiplier.toBigInt()).toBuffer;
    i = (i + 1) % length;
  });
}

export function multiplyThenAdd<T extends JsonRpcDataInputArg | number | bigint> (
  name: string,
  data: T[]
) {
  const multipliers = data.map(input => Quantity.from(input)).reverse();

  let i = 0;
  const length = data.length;

  return B.add(name, () => {
    const quantity:any = multipliers[i];
    const multiplier:any = multipliers[length - i - 1];
    const addend:any = multipliers[(length - i) % length];
    Quantity.from(quantity.toBigInt() * multiplier.toBigInt() + addend.toBigInt()).toBuffer;
    i = (i + 1) % length;
  });
}

export function helper_add<T extends JsonRpcDataInputArg | number | bigint> (
  name: string,
  data: T[]
) {
  const addends = data.map(input => Quantity.from(input)).reverse();

  let i = 0;
  const length = data.length;

  return B.add(name, () => {
    const quantity = addends[i];
    const addend = addends[length - i - 1];
    (<any>quantity).add(addend).toBuffer;
    i = (i + 1) % length;
  });
}

export function helper_multiply<T extends JsonRpcDataInputArg | number | bigint> (
  name: string,
  data: T[]
) {
  const multipliers = data.map(input => Quantity.from(input)).reverse();

  let i = 0;
  const length = data.length;

  return B.add(name, () => {
    const quantity = multipliers[i];
    const multiplier = multipliers[length - i - 1];
    (<any>quantity).multiply(multiplier).toBuffer;
    i = (i + 1) % length;
  });
}

export function helper_multiplyThenAdd<T extends JsonRpcDataInputArg | number | bigint> (
  name: string,
  data: T[]
) {
  const multipliers = data.map(input => Quantity.from(input)).reverse();

  let i = 0;
  const length = data.length;

  return B.add(name, () => {
    const quantity = multipliers[i];
    const multiplier = multipliers[length - i - 1];
    const addend = multipliers[(length - i) % length];
    (<any>quantity).multiply(multiplier).add(addend).toBuffer;
    i = (i + 1) % length;
  });
}

/*
✅ Quantity.toBuffer()
✅ Quantity.toNumber()
✅ Quantity.toBigInt()
✅ Quantity.add()
✅ Quantity.multiply()
✅ Quantity.multiply().add()
*/
