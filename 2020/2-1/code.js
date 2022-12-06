const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let res = 0;
  for(let i=0; i<inputLines.length; i++) {
    let line = inputLines[i];
    let [policy, pwd] = line.split(": ");
    let [range, char] = policy.split(" ");
    let [i1, i2] = range.split("-");

    if(pwd[i1-1] === char || pwd[i2-1] === char) {
      if(!(pwd[i1-1] === char && pwd[i2-1] === char)) {
        res++;
      }
    }
  }

  console.log(res);
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