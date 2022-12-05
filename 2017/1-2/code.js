const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const line = inputLines[0];

  let sum = 0;
  let half = Math.floor(line.length / 2);
  for(let i=0; i<line.length; i++) {
    if(line[i] === line[(i+half)%line.length]) {
      sum += parseInt(line[i]);
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