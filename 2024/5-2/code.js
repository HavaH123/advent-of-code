const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let rules = {}, updates = [];
  let readingRules = true;
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      readingRules = false;
      continue;
    }
    if(readingRules) {
      rules[inputLines[i]] = true;
    } else {
      updates.push(inputLines[i].split(","));
    }
  }

  let total = 0;
  for(let i=0; i<updates.length; i++) {
    let update = updates[i];

    let updateInOrder = true;
    for(let j=0; j<update.length-1; j++) {
      let inOrder = true;
      for(let k=j+1; k<updates.length; k++) {
        let curr = update[j];
        let next = update[k];

        if(rules[next+"|"+curr]) {
          inOrder = false;
          [update[j], update[k]]=[next, curr];
          break;
        }
      }
      if(!inOrder) {
        updateInOrder = false;
        j--;
      }
    }

    if(!updateInOrder) {
      total += parseInt(update[Math.floor(update.length/2)]);
    }
  }

  console.log(total);
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
