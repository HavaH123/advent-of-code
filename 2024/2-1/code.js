const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const inputs = [];
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    const input = inputLines[i].split(" ").map(a => parseInt(a));
    inputs.push(input);
  }

  let safeCount = 0;
  for(i=0; i<inputs.length; i++) {
    let report = inputs[i];
    let safe = true;
    let desc = false;

    if(report[0] == report[1]) {
      safe = false;
    }
    if(report[0] > report[1]) {
      desc = true;
    }
    for(let j=0; j<report.length-1 && safe; j++) {
      let diff = report[j] - report[j+1];
      if(Math.abs(diff) < 1 || Math.abs(diff) > 3) {
        safe = false;
      }
      if(diff < 0 && desc) {
        safe = false
      }
      if(diff > 0 && !desc) {
        safe = false;
      }
    }
    if(safe) {
      safeCount++;
    }
  }

  console.log(safeCount);
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
