const numberGenerator = () => Math.floor(Math.random() * 10 ** Math.floor(Math.random() * 10 + 1));

const n = 100;

const numbers = [...new Array(n)].map(numberGenerator);
const bigints = [...new Array(n)].map(numberGenerator);
const strings = [...new Array(n)].map(numberGenerator);
const Buffers = [...new Array(n)].map(numberGenerator);

const code = `
const numbers = [${numbers.map(n => n.toString()).join(", ")}];
const bigints = [${numbers.map(n => n.toString() + "n").join(", ")}];
const strings = [${numbers.map(n => "\"0x" + n.toString(16) + "\"").join(", ")}];
const buffers = [${numbers.map(n => "Buffer.from(\"" + n.toString(16) + "\", \"hex\")").join(", ")}];
`;

console.log(code);
