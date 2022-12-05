const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const inputNums = inputLines.map(i => parseInt(i.trim()));

  let res = 0;
  for(let i=0; i<inputNums.length-1; i++) {
    if(inputNums[i] < inputNums[i+1]) {
      res++;
    }
  }

  console.log(res);
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