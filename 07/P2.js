const fs = require("fs");

const example = fs.readFileSync("eg", { encoding: "utf8" }).trim();
const input = fs.readFileSync("in", { encoding: "utf8" }).trim();

function cardMap(value) {
  return { A: "E", K: "D", Q: "C", J: "1", T: "A" }[value] || value;
}

function countCards(cards) {
  return cards.reduce((counts, card) => {
    if (counts[card] === undefined) counts[card] = 1;
    else counts[card]++;
    return counts;
  }, {});
}

function parser(line) {
  const cards = line[0].split("").map(cardMap);
  const count = parseInt(line[1]);
  const cardCounts = countCards(cards);

  const wild = cardCounts["1"] || 0;
  delete cardCounts["1"];

  const sortedValues = Object.values(cardCounts).sort((a, b) => b - a);

  let transformedLine;
  if (wild === 5) {
    transformedLine = [cards.join(""), count, "5"];
  } else {
    const [first, ...rest] = sortedValues;
    transformedLine = [cards.join(""), count, [first + wild, ...rest].join("")];
  }

  return [
    {
      5: "Z",
      41: "Y",
      32: "X",
      311: "W",
      221: "V",
      2111: "U",
      11111: "T",
    }[transformedLine[2]] + transformedLine[0],
    transformedLine[1],
  ];
}

function main(str) {
  const lines = str.split("\n");
  const parsedLines = lines.map((line) => line.split(" ")).map(parser);
  const sortedLines = parsedLines.sort((a, b) => a[0].localeCompare(b[0]));
  const score = sortedLines.reduce(
    (totalScore, line, idx) => totalScore + line[1] * (idx + 1),
    0
  );
  return score;
}

console.log(main(example));
console.log(main(input));
