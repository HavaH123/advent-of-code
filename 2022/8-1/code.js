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

  let tot = 0;
  for(let i=1; i<map.length-1; i++) {
    for(j=1; j<map.length-1; j++) {
      if(isVisible(map, i, j)) {
        tot++;
      }
    }
  }

  console.log(tot + 2*inputLines.length + 2*(inputLines[0].length-2));
  
 
}

function isVisible(grid, i, j) {
  let isVisible = true;
  for(let x=i-1; x>=0; x--) {
    if(grid[x][j] >= grid[i][j]) {
      isVisible = false;
    }
  }
  if(isVisible) {
    return true;
  }
  isVisible = true;
  for(let x=i+1; x<grid.length; x++) {
    if(grid[x][j] >= grid[i][j]) {
      isVisible = false;
    }
  }
  if(isVisible) {
    return true;
  }
  isVisible = true;
  for(let y=j-1; y>=0; y--) {
    if(grid[i][y] >= grid[i][j]) {
      isVisible = false;
    }
  }
  if(isVisible) {
    return true;
  }
  isVisible = true;
  for(let y=j+1; y<grid[0].length; y++) {
    if(grid[i][y] >= grid[i][j]) {
      isVisible = false;
    }
  }
  if(isVisible) {
    return true;
  }
  return false;
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