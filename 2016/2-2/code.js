const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const pad = [
    [0, 0, 1, 0, 0],
    [0, 2, 3, 4, 0],
    [5, 6, 7, 8, 9],
    [0, 'A', 'B', 'C', 0],
    [0, 0, 'D', 0, 0],
  ];

  let curr = [2, 0];
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
      if(isInbounds(pad, curr[0]+toMove[0], curr[1]+toMove[1])) {
        curr = [curr[0]+toMove[0], curr[1]+toMove[1]];
      }
    }

    ans += pad[curr[0]][curr[1]];
  }

  console.log(ans);
}

function isInbounds(pad, x, y) {
  if(pad[x] && pad[x][y]) {
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