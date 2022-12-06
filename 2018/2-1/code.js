const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let two = 0;
  let three = 0;

  for(let i=0; i<inputLines.length; i++) {
    let line = inputLines[i].split("");
    let charMap = {};
    line.forEach(letter => {
      if(!charMap[letter]) {
        charMap[letter] = 0;
      }
      charMap[letter]++;
    });

    for(k in charMap) {
      if(charMap[k] === 2) {
        two++;
        break;
      }
    }

    for(k in charMap) {
      if(charMap[k] === 3) {
        three++;
        break;
      }
    }
  }

  console.log(two * three);
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