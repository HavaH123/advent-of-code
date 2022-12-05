const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  
  let sum = 0;
  for(let i=0; i<inputLines.length; i++) {
    let moduleMass = parseInt(inputLines[i]);

    while(moduleMass > 0) {
      const fuel = Math.floor(moduleMass / 3)-2;
      moduleMass = fuel;
      if(fuel > 0) {
        sum += fuel;
      }
    }
  }

  console.log(sum);
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