const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const line = inputLines[0];
  let ops = line.split(",").map(a => parseInt(a));
  
  
  for(let i=0; i<=99; i++) {
    for(let j=0; j<=99; j++) {
      let tempOps = [...ops];
      tempOps[1] = i;
      tempOps[2] = j;

      if(runIntCodeComp(tempOps)[0] === 19690720) {
        console.log(100*i + j);
        return;
      }
    }
  }

  console.log(ops[0]);
}

function runIntCodeComp(ops) {
  for(let i=0; i<ops.length; i+=4) {
    if(ops[i] === 99) {
      break;
    }
    if(ops[i] === 1) {
      const [op1, op2, to] = [ops[i+1], ops[i+2], ops[i+3]];
      ops[to] = ops[op1]+ops[op2];
    } else if(ops[i] === 2) {
      const [op1, op2, to] = [ops[i+1], ops[i+2], ops[i+3]];
      ops[to] = ops[op1]*ops[op2];
    } else {
      throw("boom");
    }
  }

  return ops;
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