const fs = require('fs');
const Table = require("cli-table");
const colors = require("colors");

const resultsFiles = fs.readdirSync(`${__dirname}/benchmark/results`);
const rawResults = resultsFiles.map(file => require(`./benchmark/results/${file}`));

const testsByName = {};
rawResults.forEach(result => {
  if (testsByName[result.name] === undefined) {
    testsByName[result.name] = [result];
  } else {
    testsByName[result.name].push(result);
  }
});

Object.keys(testsByName).forEach(testName => {
  console.log(colors.green(testName));
  console.group();

  const results = testsByName[testName];
  const name = results[0].name;
  const head = ["", ...results.map(result => result.version)];
  const tests = results[0].results.map(result => result.name);

  const table = new Table({
    head
  });

  for (let i = 0; i < tests.length; i++) {
    const resultsRow = results.map(result => result.results[i].ops);

    const fastest = resultsRow.reduce((prev, curr) => Math.max(prev, curr), 0);
    for (const i in resultsRow) {
      if (resultsRow[i] === fastest) {
        resultsRow[i] = `${resultsRow[i]}: ${colors.green("fastest")}`;
      } else {
        const slower = `${Math.floor((fastest - resultsRow[i]) / fastest * 100)}% slower`;
        resultsRow[i] = `${resultsRow[i]}: ${colors.red(slower)}`;
      }
    }

    const row = [`${name}: ${tests[i]}`, ...resultsRow];
    table.push(row);
  }

  console.log(table.toString());

  console.groupEnd();
  console.log();
});
