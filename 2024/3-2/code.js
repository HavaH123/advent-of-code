const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const input = inputLines[0];

  let res = 0;
  let mulStrs = input.match(/mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g);
  let dont = false;
  for(let i=0; i<mulStrs.length; i++) {
    if(mulStrs[i] === "don't()") {
      dont = true;
    } else if(mulStrs[i] === "do()") {
      dont = false;
    } else {
      if(dont) {
        continue;
      }
      let op = mulStrs[i];
      let [num1, num2] = op.match(/\d+/g);
      res+= parseInt(num1) * parseInt(num2);
    }
  }
  console.log(res);
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
