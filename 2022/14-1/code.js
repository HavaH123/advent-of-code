const fs = require('fs');
const abs = Math.abs;
main();

function main() {
  const inputLines = readInputAsLines();
  let input = [];
  for(let i=0; i<inputLines.length; i++) {
    let line = inputLines[i].split(" -> ");
    let coords = line.map(c => JSON.parse(`[${c}]`));
    input.push(coords);
  }

  let [minX, maxX, minY, maxY] = [Infinity,-Infinity,Infinity,-Infinity];
  input.forEach(i => {
    i.forEach(c => {
      minY = Math.min(minY, c[0]);
      minX = Math.min(minX, c[1]);
      maxY = Math.max(maxY, c[0]);
      maxX = Math.max(maxX, c[1]);
    });
  });

  let grid = new Array(maxX+1).fill([]);
  grid.forEach((g, i) => {
    grid[i] = new Array(maxY-minY+1).fill('.');
  });

  for(let i=0; i<input.length; i++) {
    for(let j=0; j<input[i].length-1; j++) {
      let next = input[i][j+1];
      let curr = input[i][j];

      let move = [];
      let len = 0;
      if(next[0] === curr[0]) {
        move = [0, (next[1]-curr[1])/abs(next[1]-curr[1])];
        len = abs(next[1]-curr[1]);
      } else if(next[1] === curr[1]) {
        move = [(next[0]-curr[0])/abs(next[0]-curr[0]), 0];
        len = abs(next[0]-curr[0]);
      } else {
        throw "boom";
      }

      let start = [...curr];
      for(let k=0; k<=len; k++) {
        grid[start[1]][start[0]-minY] = "#";
        start = [start[0]+move[0], start[1]+move[1]];
      }
    }
  }

  let sandStart = [0, 500-minY];
  grid[sandStart[0]][sandStart[1]] = 'o';

  let totalSand = 0;
  let canPour = true;

  while(canPour) {
    let [i, j] = sandStart;
    while(true) {
      if(i<0 || i>= grid.length-1 || j <=0 || j>=grid[0].length-1) {
        canPour = false;
        break;
      }

      if(grid[i+1][j] === ".") {
        i++;
        continue;
      }
      if(j-1 >= 0 && grid[i+1][j-1] === ".") {
        i++;
        j--;
        continue;
      }
      if(j+1 < grid[0].length && grid[i+1][j+1] === ".") {
        i++;
        j++;
        continue;
      }
      break;
    }
    if(canPour) {
      totalSand++;
      grid[i][j] = "o";
    }
  }

  console.log(totalSand);
}

function printGrid(g) {
  g.forEach((gg, i) => {
    console.log([i, ...gg].join(""));
  });
  console.log();
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