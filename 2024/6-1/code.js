const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let map = [];
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    let row = inputLines[i].split("");
    map.push(row);
  }

  let total = 0;
  let pos = [];
  for(let i=0; i<map.length; i++) {
    for(let j=0; j<map[i].length; j++) {
      if(map[i][j] === "^") {
        pos = [i,j];
        total++;
        map[i][j] = "X";
      }
    }
  }

  let dir = 0;
  while(pos[0]<map.length && pos[0] >=0 && pos[1]<map[0].length && pos[1] >= 0) {
    let [i, j] = pos;
    let nextPos = [];
    if(dir === 0) {
      nextPos = [i-1,j];
    } else if(dir === 1) {
      nextPos = [i,j+1];
    } else if(dir === 2) {
      nextPos = [i+1,j];
    } else {
      nextPos = [i, j-1];
    }

    if(map[nextPos[0]] && map[nextPos[0]][nextPos[1]] === "#") {
      dir = (dir+1)%4;
    } else {
      if(map[i][j] === ".") {
        total++;
      }
      map[i][j] = "X";
      pos = nextPos;
    }
  }

  console.log(total);
}


function readInputAsLines() {
  try {
    const data = fs.readFileSync(__dirname+'/input', 'utf8');
    const lines = data.split("\n");
    return lines;
  } catch (err) {
    console.error(err);
  }
  return [];
}
