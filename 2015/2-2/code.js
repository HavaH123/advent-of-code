const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let total = 0;
  for(let i=0; i<inputLines.length; i++) {
    const [s1, s2, s3] = inputLines[i].split('x').map(a => parseInt(a)).sort((a, b) => a-b);
    total += 2*s1 + 2*s2 + s1*s2*s3;
  }

  console.log(total);
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