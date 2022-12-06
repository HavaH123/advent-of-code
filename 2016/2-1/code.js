const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const pad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  let curr = [1, 1];
  let ans = "";
  const move = {
    "R": [0, 1],
    "L": [0, -1],
    "D": [1, 0],
    "U": [-1, 0]
  };

  for(let i=0; i<inputLines.length; i++) {
    const line = inputLines[i];
    for(let j=0; j<line.length; j++) {
      const toMove = move[line[j]];
      if(isInbounds(curr[0]+toMove[0], curr[1]+toMove[1])) {
        curr = [curr[0]+toMove[0], curr[1]+toMove[1]];
      }
    }

    ans += pad[curr[0]][curr[1]];
  }

  console.log(ans);
}

function isInbounds(x, y) {
  if(x >= 0 && x < 3 && y >= 0 && y < 3) {
    return true;
  }
  return false;
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