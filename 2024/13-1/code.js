const { match } = require('assert');
const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let a=[], b=[], prize=[];
  for(let i=0; i<inputLines.length;) {
    if(inputLines[i] === "") {
      i++;
      continue;
    }
    a.push(getMove(inputLines[i]));
    b.push(getMove(inputLines[i+1]));
    prize.push(getMove(inputLines[i+2]));
    i=i+3;
  }

  let ans = 0;
  for(let i=0; i<a.length; i++) {
    let minTokens = getMinTokens(a[i], b[i], prize[i]);
    if(minTokens < Infinity) {
      ans += minTokens;
    }
  }

  console.log(ans);
}

function getMinTokens(aMove, bMove, prizeLoc) {
  let minTokens = Infinity;

  for(let i=0; i<=100; i++) {
    for(let j=0; j<=100; j++) {
      if((prizeLoc[0] === i*aMove[0] + j*bMove[0]) && (prizeLoc[1] === i*aMove[1] + j*bMove[1])) {
        let tokens = i*3 + j;
        if(tokens < minTokens) {
          minTokens = tokens;
        }
      }
    }
  }

  return minTokens;
}

function getMove(str) {
  matches = str.match(/[XY][\+\=](\d+)/g);
  return matches.map(m => parseInt(m.slice(2)));
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
