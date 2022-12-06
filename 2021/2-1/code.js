const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let coord = [0, 0];
  const move = {
    'forward': [1, 0],
    'up': [0, -1],
    'down': [0, 1],
  };

  for(let i=0; i<inputLines.length; i++) {
    let [cmd, steps] = inputLines[i].split(" ");
    steps = parseInt(steps);
    const toMove = move[cmd];
    coord = [coord[0]+steps*toMove[0], coord[1]+steps*toMove[1]];
  }

  console.log(coord[0]*coord[1]);
}


function readInputAsLines() {
  try {
    const data = fs.readFileSync(__dirname+'\\input', 'utf8');
    const lines = data.split("\n").map(a => a.trim());
    return lines;
  } catch (err) {
    console.error(err);
  }
  return [];
}