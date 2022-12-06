const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const line = inputLines[0];
  const n = 4;

  const charBuff = {};
  for(let i=0; i<n-1; i++) {
    let curr = line[i];
    if(!charBuff[curr]) {
      charBuff[curr] = 1;
    } else {
      charBuff[curr]++;
    }
  }

  for(let i=n-1; i<line.length; i++) {
    let curr = line[i];
    if(!charBuff[curr]) {
      charBuff[curr] = 1;
    } else {
      charBuff[curr]++;
    }

    if(!hasDups(charBuff)) {
      console.log(i+1);
      return;
    }

    const firstInBuff = line[i-n+1];
    charBuff[firstInBuff]--;
    if(charBuff[firstInBuff] === 0) {
      delete charBuff[firstInBuff];
    }
  }

}

function hasDups(map) {
  for(key in map) {
    if(map[key] > 1) {
      return true;
    }
  }
  return false;
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