const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const lines = inputLines.map(line => line.split("\t")).map(line => line.map(n => parseInt(n)));
  
  let sum = 0;
  for(let i=0; i<lines.length; i++) {
    const line = lines[i];
    let curr = 0;
    for(let j=0; j<line.length; j++) {
      for(k=0; k<line.length; k++) {
        if(j === k) {
          continue;
        }
        let [min, max] = [line[j], line[k]].sort((a,b) => a-b);
        if(max % min === 0) {
          curr = max / min;
          break;
        }
      }
      if(curr) {
        break;
      }
    }
    sum += curr;
  }

  console.log(sum);
  
}

function isInbounds(x, y) {
  if(x >= 0 && x < 3 && y >= 0 && y < 3) {
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