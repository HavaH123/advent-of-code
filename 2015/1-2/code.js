const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const line = inputLines[0];

  let currFloor = 0;
  for(let i=0; i<line.length; i++) {
    if(line[i] === "(") {
      currFloor++;
    } else {
      currFloor--;
    }

    if(currFloor === -1) {
        console.log(i+1);
        break;
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