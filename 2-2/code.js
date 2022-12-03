const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const resultScore = {
    "X": 0, // Lose
    "Y": 3, // Draw
    "Z": 6, // Win
  };
  const playScore = {
    "A X": 3, 
    "A Y": 1,
    "A Z": 2,
    "B X": 1,
    "B Y": 2,
    "B Z": 3,
    "C X": 2,
    "C Y": 3,
    "C Z": 1,
  };

  let score = 0;

  for(let i=0; i<inputLines.length; i++) {
    inputLine = inputLines[i];
    const played = inputLine.split(" ")[1];
    score += playScore[inputLine]+resultScore[played];
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