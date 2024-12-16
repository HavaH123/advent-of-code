const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let grid = [];
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    grid.push(inputLines[i].split(""));
  }

  let visited = {};
  let ans = 0;

  for(let i=0; i<grid.length; i++) {
    for(let j=0; j<grid[0].length; j++) {
      if(visited[i+"|"+j] == null) {
        let [area, perimeter] = calcRegion(grid, i, j, visited);
        // console.log(grid[i][j], area, perimeter);
        ans += (area * perimeter);
      }
    }
  }

  console.log(ans);
}

function calcRegion(grid, i, j, visited) {
  let letter = grid[i][j];
  let stack = [[i,j]];
  let perimeter = 0;
  let area = 0;

  while(stack.length > 0) {
    let [ci, cj] = stack.shift();
    //console.log(letter, ci, cj, visited);
    area++;
    visited[ci+"|"+cj] = true;

    let top = grid[ci-1] != null ? grid[ci-1][cj]:null;
    let bot = grid[ci+1] != null ? grid[ci+1][cj]:null;
    let left = grid[ci] != null ? grid[ci][cj-1]:null;
    let right = grid[ci] != null ? grid[ci][cj+1]:null;
    perimeter += 4;
    if(top === letter) {
      let x = ci-1, y = cj;
      perimeter--;
      if(visited[x+"|"+y] == null) {
        stack.unshift([x, y]);
        visited[x+"|"+y] = true;
      }
    }
    if(bot === letter) {
      let x = ci+1, y = cj;
      perimeter--;
      if(visited[x+"|"+y] == null) {
        stack.unshift([x, y]);
        visited[x+"|"+y] = true;
      }
    }
    if(left === letter) {
      let x = ci, y = cj-1;
      perimeter--;
      if(visited[x+"|"+y] == null) {
        stack.unshift([x, y]);
        visited[x+"|"+y] = true;
      }
    }
    if(right === letter) {
      let x = ci, y = cj+1;
      perimeter--;
      if(visited[x+"|"+y] == null) {
        stack.unshift([x, y]);
        visited[x+"|"+y] = true;
      }
    }
  }

  return [area, perimeter];
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
