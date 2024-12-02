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
    let safe = isSafe(report, false);

    if(safe) {
      safeCount++;
    }
  }

  console.log(safeCount);
}

function isSafe(report, skip) {
  let safe = true;
  let desc = false;
  if(report[0] > report[1]) {
    desc = true;
  }

  for(let j=0, k=1; k<report.length && safe; j++, k++) {
    let diff = report[j] - report[k];
    if(Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      safe = false;
    }
    if(diff < 0 && desc) {
      safe = false
    }
    if(diff > 0 && !desc) {
      safe = false;
    }
    if(!safe && !skip) {
      for(let itr = 0; itr < report.length; itr++) {
        let sliceArr = [...report.slice(0, itr), ...report.slice(itr+1)];
        if(isSafe(sliceArr, true)) {
          return true;
        }
      }
      return false;
    }
  }
  return safe;
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
