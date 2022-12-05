const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let sum = 0;
  let visited = {};
  for(let i=0; i<inputLines.length; i++) {
    sum += parseInt(inputLines[i]);
    if(visited[sum]) {
      console.log(sum);
      return;
    }
    visited[sum] = true;
    if(i === inputLines.length-1) {
      i=-1;
    }
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