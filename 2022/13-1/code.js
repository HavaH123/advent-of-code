const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  let tot = 0;
  for(let i=0; i<inputLines.length; i+=3) {
    let left = JSON.parse(inputLines[i]);
    let right = JSON.parse(inputLines[i+1]);

    let res = isInOrder(left, right);

    if(res < 0) {
      tot+=(i/3)+1;
    }
  }
  console.log(tot);
}

function isInOrder(left, right) {
  if(isNum(left) && isNum(right)) {
    return left - right;
  } else if(isArray(left) && isArray(right)) {
    for(let i=0; i<left.length; i++) {
      if(i >= right.length) {
        return 1;
      }
      let inOrd = isInOrder(left[i], right[i]);
      if(inOrd < 0) {
        return -1;
      } else if(inOrd > 0) {
        return 1;
      }
    }
    if(left.length < right.length) {
      return -1;
    }
    if(left.length > right.length) {
      return 1;
    }
    return 0;
  } else if(isNum(left) && isArray(right)) {
    return isInOrder([left], right);
  } else if(isArray(left) && isNum(right)) {
    return isInOrder(left, [right]);
  }

  throw('boom');
}

function isNum(a) {
  return typeof(a) === "number";
}

function isArray(a) {
  return typeof(a) === "object";
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