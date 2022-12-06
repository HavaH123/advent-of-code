const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  for(let i=0; i<inputLines.length; i++) {
    for(let j=0; j<inputLines.length; j++) {
      if(i == j) {
        continue;
      }

      if(diffByOne(inputLines[i], inputLines[j])) {
        let ans = "";
        for(let k=0; k<inputLines[i].length; k++) {
          if(inputLines[i][k] === inputLines[j][k]) {
            ans += inputLines[i][k];
          }
        }
        console.log(ans);
        return;
      }
    } 
  }
}

function diffByOne(a, b) {
  let diff = 0;
  for(let i=0; i<a.length; i++) {
    if(a[i] != b[i]) {
      diff++;
    }
    if(diff > 1) {
      return false;
    }
  }

  if(diff == 1) {
    return true;
  }
  return false;
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