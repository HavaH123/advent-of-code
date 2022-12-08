const fs = require('fs');
var util = require('util')


main();

function main() {
  const inputLines = readInputAsLines();
  let map = [];

  for(let i=0; i<inputLines.length; i++) {
    let line = inputLines[i].split("");
    map[i] = line;
  }

  let maxTot = 0;
  for(let i=0; i<map.length; i++) {
    for(j=0; j<map.length; j++) {
      const score = totVisible(map, i, j);
      if(score > maxTot) {
        maxTot = score;
      }
    }
  }

  console.log(maxTot);
 
}

function totVisible(grid, i, j) {
  let totMul = 1;
  let tot = 0;
  for(let x=i-1; x>=0; x--) {
    tot++;
    if(grid[x][j] >= grid[i][j]) {
      break;
    }
  }
  totMul *= tot;
  tot=0;
  for(let x=i+1; x<grid.length; x++) {
    tot++;
    if(grid[x][j] >= grid[i][j]) {
      break;
    }
  }
  totMul *= tot;
  tot=0;
  for(let y=j-1; y>=0; y--) {
    tot++;
    if(grid[i][y] >= grid[i][j]) {
      break;
    }
  }
  totMul *= tot;
  tot=0;
  for(let y=j+1; y<grid[0].length; y++) {
    tot++;
    if(grid[i][y] >= grid[i][j]) {
      break;
    }
  }
  totMul *= tot;
  return totMul;
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