const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let array = [];
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    const [result, rest] = inputLines[i].split(": ");
    const restArr = rest.split(" ");
    array.push([result, ...restArr].map(num => parseInt(num)));
  }

  let ans = 0;
  for(let i=0; i<array.length; i++) {
    let [result, ...rest] = array[i];
    let numOps = rest.length-1;
    for(let i=0; i<Math.pow(3, numOps); i++) {
      let binary = i.toString(3).padStart(numOps, '0');

      let res = rest[0];
      for(let j=0; j<binary.length; j++) {
        // let op = binary[j] === '0' ? '+' : '*';
        let op;
        if(binary[j] === '0') {
          op = '+';
        } else if(binary[j] === '1') {
          op = '*';
        } else {
          op = '||'
        }

        if(op === '+') {
          res += rest[j+1];
        } else if(op === '*') {
          res *= rest[j+1];
        } else if(op === '||') {
          res = parseInt(res+""+rest[j+1]);
        }
      }
      if(res === result) {
        //console.log(result);
        ans += result;
        break;
      }
    }
  }
  console.log(ans);
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
