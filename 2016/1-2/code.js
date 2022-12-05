const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const line = inputLines[0];
  const instr = line.split(",").map(l => l.trim());

  const incr = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let coord = [0, 0];
  let curFacing = 0;
  let visited = {};

  for(let i=0; i<instr.length; i++) {
    let [dir, steps] = [instr[i][0], parseInt(instr[i].slice(1))];

    if(dir === "R") {
      curFacing = (curFacing + 1) % 4;
    } else {
      if(curFacing === 0) {
        curFacing = 4;
      }
      curFacing = curFacing - 1;
    }

    const dirIncr = incr[curFacing];
    for(let j=1; j<=steps; j++) {
      const x = coord[0] + dirIncr[0]*j;
      const y = coord[1] + dirIncr[1]*j;

      const mergeCoord = x+","+y;
      if(visited[mergeCoord]) {
        console.log(Math.abs(x)+Math.abs(y));
        return;
      }
      visited[mergeCoord] = true;
    }
    
    coord = [coord[0]+dirIncr[0]*steps, coord[1]+dirIncr[1]*steps];
  }
}


function readInputAsLines() {
  try {
    const data = fs.readFileSync(__dirname+'\\input', 'utf8');
    const lines = data.split("\n");
    return lines;
  } catch (err) {
    console.error(err);
  }
  return [];
}