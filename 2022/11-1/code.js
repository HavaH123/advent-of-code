const fs = require('fs');
const mabs = Math.abs;

main();

function main() {
  const inputLines = readInputAsLines();
  const input = [];
  for(let i=0; i<inputLines.length; i++) {
    let it = inputLines[i].split("\n").map(a => a.trim());
    let items = it[1].split(":")[1].trim().split(", ");
    let op = it[2].split("=")[1].trim();
    let test = it[3].split("by")[1].trim();
    let tr = it[4].split("monkey")[1].trim();
    let fa = it[5].split("monkey")[1].trim();

    input.push({
      items: items.map(a => parseInt(a)),
      op,
      test: parseInt(test),
      trDest: parseInt(tr),
      fDest: parseInt(fa),
      inspected: 0,
    });
  }

  for(let i=0; i<20; i++) {
    for(let j=0; j<input.length; j++) {
      let monkey = input[j];
      let insp = 0;
      let items = monkey.items;
      for(let item in items) {
        insp++;
        let worry = items[item];
        let newWorry = eval(monkey.op.replaceAll("old", worry));
        newWorry = Math.floor(newWorry/3);
        if(newWorry%monkey.test === 0) {
          input[monkey.trDest].items.push(newWorry);
        } else {
          input[monkey.fDest].items.push(newWorry);
        }
      }
      monkey.items = [];
      monkey.inspected += insp;
    }
  }

  let ins = input.map(i => i.inspected).sort((a, b) => b-a);
  console.log(ins[0]*ins[1]);
}


function readInputAsLines() {
  try {
    const data = fs.readFileSync(__dirname+'\\input', 'utf8');
    const lines = data.split("\r\n\r\n").map(a => a.trim());
    return lines;
  } catch (err) {
    console.error(err);
  }
  return [];
}