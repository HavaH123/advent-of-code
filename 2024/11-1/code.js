const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let array;
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    array = inputLines[i].split(" ").map(a => parseInt(a));
  }

  for(let i=0; i<25; i++) {
    let temp = [];
    for(let i=0; i<array.length; i++) {
      let arrayStr = ""+array[i];
      if(array[i] === 0) {
        temp.push(1);
      } else if((arrayStr.length % 2) === 0) {
        temp.push(parseInt(arrayStr.slice(0, arrayStr.length/2)));
        temp.push(parseInt(arrayStr.slice(arrayStr.length/2)));
      } else {
        temp.push(array[i]*2024);
      }
    }
    array = temp;
  }

  console.log(array.length);
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
