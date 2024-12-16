const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let grid = [];
  let input = [];
  let readingGrid = true;
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "" && readingGrid) {
      readingGrid = false;
      continue;
    }
    if(readingGrid) {
      grid.push(inputLines[i].split(""));
    }
    else {
      input.push(...inputLines[i].split(""));
    }
  }

  let curr = [];

  for(let i=0; i<grid.length; i++) {
    for(let j=0; j<grid[0].length; j++) {
      if(grid[i][j] === "@") {
        curr = [i,j];
        grid[i][j] = ".";
      }
    }
  }

  const next = {
    "<": [0, -1],
    "^": [-1, 0],
    ">": [0, 1],
    "v": [1, 0],
  }

  for(let i=0; i<input.length; i++) {
    let [incrX, incrY] = next[input[i]];
    let [currX, currY] = curr;
    let [nextX, nextY] = [currX+incrX, currY+incrY];

    let nextElem = grid[nextX][nextY];
    if(nextElem === "#") {
      continue;
    } else if(nextElem === ".") {
      curr = [nextX, nextY];
    } else if(nextElem === "O") {
      let [tx, ty] = [nextX, nextY];
      while(grid[tx][ty] === "O") {
        tx += incrX;
        ty += incrY;
      }
      if(grid[tx][ty] === ".") {
        grid[tx][ty] = "O";
        grid[nextX][nextY] = ".";
        curr = [nextX, nextY];
      }
    }
  }

  let gpsTotal = 0;
  for(let i=0; i<grid.length; i++) {
    for(let j=0; j<grid[0].length; j++) {
      if(grid[i][j] === "O") {
        gpsTotal += 100*i + j;
      }
    }
  }

  console.log(gpsTotal);
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
