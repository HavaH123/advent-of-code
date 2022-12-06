const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let coord = [0, 0];
  let aim = 0;

  for(let i=0; i<inputLines.length; i++) {
    let [cmd, steps] = inputLines[i].split(" ");
    steps = parseInt(steps);
    if(cmd === 'up') {
      aim -= steps;
    } else if(cmd === 'down') {
      aim += steps;
    } else {
      coord = [coord[0]+steps, coord[1]+aim*steps];
    }
  }

  console.log(coord[0]*coord[1]);
}


function readInputAsLines() {
  try {
    const data = fs.readFileSync(__dirname+'\\input', 'utf8');
    const lines = data.split("\n").map(a => a.trim());
    return lines;
  } catch (err) {
    console.error(err);
  }
  return [];
}