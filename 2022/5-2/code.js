const fs = require('fs');

main();

function main() {
  const stacks = makeStacks();
  const instr = readInputAsLines('input-2');

  for(let i=0; i<instr.length; i++) {
    const instruction = instr[i].trim();
    const [_move, n, _f, from, _t, to] = instruction.split(" ");
    
    let temp = [];
    for(let j=0; j<n; j++) {
      temp.push(stacks[from-1].pop());
    }
    
    while(temp.length > 0) {
      stacks[to-1].push(temp.pop());
    }
  }

  let res = "";
  for(let i=0; i<stacks.length; i++) {
    let stack = stacks[i];
    if(stack.length > 0) {
      res += stack[stack.length - 1];
    }
  }

  console.log(res);
}

function makeStacks() {
  const lines = readInputAsLines('input-1').map(line => line.match(/.{1,4}/g).map(word => word.trim().replace("[", "").replace("]", "")));
  const stacks = [];
  for(let i=0; i<lines.length; i++) {
    for(let j=0; j<lines[i].length; j++) {
      if(!stacks[j]) {
        stacks[j] = [];
      }

      if(lines[i][j] != "") {
        stacks[j][i] = lines[i][j];
      }
    }
  }
  
  return stacks.map(stack => stack.reverse().filter(a => a!= null));
}


function readInputAsLines(filename) {
  try {
    const data = fs.readFileSync(__dirname+'\\'+filename, 'utf8');
    const lines = data.split("\n");
    return lines;
  } catch (err) {
    console.error(err);
  }
  return [];
}