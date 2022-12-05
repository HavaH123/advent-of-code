const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const line = inputLines[0];

  let sum = 0;
  for(let i=1; i<line.length; i++) {
    if(line[i-1] === line[i]) {
      sum += parseInt(line[i]);
    }
  }
  if(line[0] === line[line.length -1]) {
    sum += parseInt(line[0]);
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