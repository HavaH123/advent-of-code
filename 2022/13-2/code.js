const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  let input = [];
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i].length === 0) {
      continue;
    }
    input.push(JSON.parse(inputLines[i]));
  }
  input.push([[2]]);
  input.push([[6]]);

  input = input.sort(isInOrder);
  
  let prod = 1;
  for(let i=0; i<input.length; i++) {
    if(JSON.stringify(input[i]) == "[[2]]" || JSON.stringify(input[i]) == "[[6]]") {
      prod *= (i+1);
    }
  }

  console.log(prod);
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