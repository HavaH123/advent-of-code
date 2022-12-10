const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  
  let tick = 1;
  let reg = 1;

  let screen = new Array(240).fill(".");

  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "noop") {
      renderScreen(tick, reg, screen);
      tick++;
    } else {
      let [instr, val] = inputLines[i].split(" ");
      val = parseInt(val);

      renderScreen(tick, reg, screen);
      tick++;
      renderScreen(tick, reg, screen);
      tick++;
      reg += val;
    }
  }

  printScreen(screen);
}

function renderScreen(tick, reg, screen) {
  let [spr1, spr2, spr3] = [reg-1, reg, reg+1];
  let rowTick = (tick-1)%40;

  if(rowTick === spr1 || rowTick === spr2 || rowTick === spr3) {
    screen[tick-1] = "#";
  }
}

function printScreen(screen) {
  let line = "";
  for(let i=0; i<240; i++) {
    if(i%40 === 0) {
      console.log(line);
      line="";
    }
    line+=screen[i];
  }
  console.log(line);
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