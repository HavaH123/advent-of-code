const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  let inputNums = inputLines.map(i => parseInt(i.trim()));

  let numMap = {};
  for(let i=0; i<inputNums.length; i++) {
    numMap[inputNums[i]] = true;
  }

  for(let i=0; i<inputNums.length; i++) {
    const diff = 2020 - inputNums[i];
    if(numMap[diff]) {
      console.log(diff * inputNums[i]);
      return;
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