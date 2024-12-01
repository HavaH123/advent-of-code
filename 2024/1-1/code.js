const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let arr1 = [], arr2 = {};
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    let [num1, num2] = inputLines[i].split("   ");
    arr1.push(parseInt(num1));
    num2 = parseInt(num2);

    if(arr2[num2] == null) {
      arr2[num2] = 0;
    }
    arr2[num2]++;
  }

  let score = 0;
  for(let i=0; i<arr1.length; i++) {
    let num = arr1[i];
    if(arr2[num] == null) {
      continue;
    }
    score += (num * arr2[num]);
  }

  console.log(score);
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
