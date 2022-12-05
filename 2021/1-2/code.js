const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const arr = inputLines.map(i => parseInt(i.trim()));

  let res = 0;
  for(let i=0; i<arr.length-3; i++) {
    const firstSum = arr[i]+arr[i+1]+arr[i+2];
    const nextSum = arr[i+1]+arr[i+2]+arr[i+3];
    if(firstSum < nextSum) {
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