const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  let inputNums = inputLines.map(i => parseInt(i.trim()));
  inputNums = inputNums.sort((a, b) => a-b);

  for(let i=0; i<inputNums.length-2; i++) {
    let j = i+1;
    let k = inputNums.length-1;
    const diff = 2020 - inputNums[i];
    while(j<k) {
      if(inputNums[j] + inputNums[k] === diff) {
        console.log(inputNums[i] * inputNums[j] * inputNums[k]);
        return;
      }

      if(inputNums[j] + inputNums[k] > diff) {
        k--;
      } else {
        j++;
      }
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