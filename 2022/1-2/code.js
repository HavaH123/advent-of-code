const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let allCal = [];
  let currCal = 0;
  for(let i=0; i<inputLines.length; i++) {
    const cal = parseInt(inputLines[i]);
    if(isNaN(cal)) {
      allCal.push(currCal);
      currCal = 0;
    } else {
      currCal += cal;
    }
  }

  allCal = allCal.sort((a, b) => b - a);
  console.log(allCal[0]+allCal[1]+allCal[2]);
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