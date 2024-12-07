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
  let [pi, pj] = [0,0];
  for(let i=0; i<map.length; i++) {
    for(let j=0; j<map[i].length; j++) {
      if(map[i][j] === "^") {
        [pi, pj] = [i,j];
        total++;
      }
    }
  }

  let candidates = stepsTraversed(map, [pi,pj]);
  let res = 0;
  for(let i=0; i<candidates.length; i++) {
    let [x, y] = candidates[i];
    map[x][y] = "#";
    let newCandidates = stepsTraversed(map, [pi,pj]);
    if(newCandidates.length === 0) {
      res++;
    }
    map[x][y] = ".";
  }

  console.log(res);
}

function stepsTraversed(map, pos) {
  let candidates = [];
  let dir = 0;
  let visited = {};
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
      let key = i+"|"+j;
      if(visited[key] == null) {
        candidates.push([i,j]);
        visited[key] = [];
      } else if(visited[key].includes(dir)) {
        return [];
      }
      visited[key].push(dir);
      pos = nextPos;
    }
  }

  return candidates;
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
