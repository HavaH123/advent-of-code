const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let arr1 = [], arr2 = [];
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    let [num1, num2] = inputLines[i].split("   ");
    arr1.push(parseInt(num1));
    arr2.push(parseInt(num2));
  }

  arr1 = arr1.sort((a, b) => a-b);
  arr2 = arr2.sort((a, b) => a-b);

  let diff = 0;
  for(let i=0; i<arr1.length; i++) {
    diff += Math.abs(arr1[i] - arr2[i]);
  }

  console.log(diff);
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
