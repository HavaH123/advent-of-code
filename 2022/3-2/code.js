const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  
  let totalPrio = 0;
  for(let i=0; i<inputLines.length/3; i++) {
    let elf1 = inputLines[3*i];
    let elf2 = inputLines[3*i+1];
    let elf3 = inputLines[3*i+2];

    let charMap = {};
    for(let j=0; j<elf1.length; j++) {
        let char = elf1[j];
        charMap[char] = 1;
    }
    for(let j=0; j<elf2.length; j++) {
        let char = elf2[j];
        if(!charMap[char]) {
            charMap[char] = 2;
        } else {
            charMap[char] |= 2;
        }
    }
    for(let j=0; j<elf3.length; j++) {
        let char = elf3[j];
        if(!charMap[char]) {
            charMap[char] = 4;
        } else {
            charMap[char] |= 4;
        }
    }
    
    for(let char in charMap) {
        if(charMap[char] === 7) {
            totalPrio += getPrio(char);
            break;
        }
    }
  }

  console.log(totalPrio);
}

function getPrio(char) {
    if(char >= 'a' && char <= 'z') {
        return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    } else {
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;  
    }
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