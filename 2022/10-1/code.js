const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  
  let tick = 1;
  let reg = 1;

  let totStr = 0;

  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "noop") {
      totStr += calStr(tick, reg);
      tick++;
    } else {
      let [instr, val] = inputLines[i].split(" ");
      val = parseInt(val);

      totStr += calStr(tick, reg);
      tick++;
      totStr += calStr(tick, reg);
      tick++;
      reg += val;
    }
  }

  console.log(totStr);
}

function calStr(tick, reg) {
  if(tick === 20 || (tick-20)%40 === 0) {
    return tick * reg;
  }
  return 0;
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