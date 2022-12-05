const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let maxCal = 0;
  let currCal = 0;
  for(let i=0; i<inputLines.length; i++) {
    const cal = parseInt(inputLines[i]);
    if(isNaN(cal)) {
      if(currCal > maxCal) {
        maxCal = currCal;
      }
      currCal = 0;
    } else {
      currCal += cal;
    }
  }

  console.log(maxCal);
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