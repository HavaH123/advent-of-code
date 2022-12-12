const fs = require('fs');
const { off } = require('process');
const mabs = Math.abs;

main();

function main() {
  const inputLines = readInputAsLines();
  let input = [];
  let end = [];
  let allStart = [];
  for(let i=0; i<inputLines.length; i++) {
    input[i] = [];
    let line = inputLines[i].split("");
    for(let j=0; j<line.length; j++) {
      if(line[j] === "S") {
        line[j] = 'a';
      } else if(line[j] === "E") {
        end = [i, j];
        line[j] = 'z';
      }
      if(line[j] === "a") {
        allStart.push([i,j]);
      }
      input[i].push({val: line[j].charCodeAt(0) - 'a'.charCodeAt(0), visited: false});
    }
  }
  
  let minSteps = Infinity;
  allStart.forEach((start) => {
    let grid = JSON.parse(JSON.stringify(input));
    let total = grid.length * grid[0].length;

    grid[start[0]][start[1]].visited = true;
    let stack = [[start, 0]];
    while(stack.length > 0) {
      let [curr, steps] = stack.shift();
      let [x, y] = curr;
      let currHt = grid[x][y].val;
      grid[x][y].minSteps = steps;

      if(steps > total) {
        continue;
      }

      if(x === end[0] && y === end[1]) {
        continue;
      }

      if(x-1>=0 && grid[x-1][y].val <= currHt + 1 && !grid[x-1][y].visited) {
        grid[x-1][y].visited = true;
        stack.push([[x-1, y], steps+1]);
      }
      if(y-1>=0 && grid[x][y-1].val <= currHt + 1 && !grid[x][y-1].visited) {
        grid[x][y-1].visited = true;
        stack.push([[x, y-1], steps+1]);
      }
      if(x+1<grid.length && grid[x+1][y].val <= currHt + 1 && !grid[x+1][y].visited) {
        grid[x+1][y].visited = true;
        stack.push([[x+1, y], steps+1]);
      }
      if(y+1<grid[0].length && grid[x][y+1].val <= currHt + 1 && !grid[x][y+1].visited) {
        grid[x][y+1].visited = true;
        stack.push([[x, y+1], steps+1]);
      }
    }

    if(grid[end[0]][end[1]].minSteps < minSteps) {
      minSteps = grid[end[0]][end[1]].minSteps;
    }
  });

  console.log(minSteps);
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