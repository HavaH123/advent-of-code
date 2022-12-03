const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const playScore = {
    "X": 1,
    "Y": 2,
    "Z": 3,
  };
  const resultScore = {
    "A X": 3,
    "A Y": 6,
    "A Z": 0,
    "B X": 0,
    "B Y": 3,
    "B Z": 6,
    "C X": 6,
    "C Y": 0,
    "C Z": 3,
  };

  let score = 0;

  for(let i=0; i<inputLines.length; i++) {
    inputLine = inputLines[i];
    const played = inputLine.split(" ")[1];
    score += playScore[played]+resultScore[inputLine];
  }

  console.log(score);
}


function readInputAsLines() {
  try {
    const data = fs.readFileSync(__dirname+'\\input', 'utf8');
    const lines = data.split("\n").map(line => line.trim());
    return lines;
  } catch (err) {
    console.error(err);
  }
  return [];
}