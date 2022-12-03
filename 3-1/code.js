const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  
  let totalPrio = 0;
  for(let i=0; i<inputLines.length; i++) {
    let line = inputLines[i];
    const mid = Math.floor(line.length/2);
    let part1 = line.slice(0, mid);
    let part2 = line.slice(mid);
    let charMap = {};
    for(let j=0; j<part1.length; j++) {
        charMap[part1[j]] = true;
    }
    for(let j=0; j<part2.length; j++) {
        if(charMap[part2[j]] === true) {
            let prio = 0;
            let char = part2[j];
            if(char >= 'a' && char <= 'z') {
                prio = char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
            } else {
                prio = char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;  
            }
            
            totalPrio += prio;
            break;
        }
    }
  }

  console.log(totalPrio);
}


function readInputAsLines() {
  try {
    const data = fs.readFileSync(__dirname+'\\input', 'utf8');
    const lines = data.split("\n").map(line => line.trim());
    return lines;
  } catch (err) {
    console.error(err);
  }
  return [];
}