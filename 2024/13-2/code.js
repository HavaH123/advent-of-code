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
    prize.push(getMove(inputLines[i+2]).map(a=>a+10000000000000));
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
  let [xa, ya] = aMove;
  let [xb, yb] = bMove;
  let [px, py] = prizeLoc;

  let j = (py*xa-ya*px)/(-ya*xb+xa*yb);
  let i = (px-j*xb)/xa;

  if(i===Math.floor(i) && j===Math.floor(j)) {
    return 3*i+j;
  }
  return Infinity;
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
