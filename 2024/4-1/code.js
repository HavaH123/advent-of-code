const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let arr = []
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    let letters = inputLines[i].split("");
    arr.push(letters);
  }

  let count = 0;
  for(let i=0; i<arr.length; i++) {
    for(let j=0; j<arr[0].length; j++) {
      count += hasXmas(arr, i, j);
    }
  }
  console.log(count);
}

function hasXmas(arr, i, j) {
  let count = 0;
  if(
    (arr[i] && arr[i][j]) === "A" &&
    (arr[i-1] && arr[i-1][j-1]) === "M" &&
    (arr[i+1] && arr[i+1][j+1]) === "S" &&
    (arr[i+1] && arr[i+1][j-1])==="M" &&
    (arr[i-1] && arr[i-1][j+1]) === "S"
  ) {
    count++;
  } else if(
    (arr[i] && arr[i][j]) === "A" &&
    (arr[i-1] && arr[i-1][j-1]) === "S" &&
    (arr[i+1] && arr[i+1][j+1]) === "M" &&
    (arr[i+1] && arr[i+1][j-1])==="M" &&
    (arr[i-1] && arr[i-1][j+1]) === "S"
  ) {
    count++;
  }
  else if(
    (arr[i] && arr[i][j]) === "A" &&
    (arr[i-1] && arr[i-1][j-1]) === "S" &&
    (arr[i+1] && arr[i+1][j+1]) === "M" &&
    (arr[i+1] && arr[i+1][j-1])==="S" &&
    (arr[i-1] && arr[i-1][j+1]) === "M"
  ) {
    count++;
  } else if(
    (arr[i] && arr[i][j]) === "A" &&
    (arr[i-1] && arr[i-1][j-1]) === "M" &&
    (arr[i+1] && arr[i+1][j+1]) === "S" &&
    (arr[i+1] && arr[i+1][j-1])==="S" &&
    (arr[i-1] && arr[i-1][j+1]) === "M"
  ) {
    count++;
  }
  return count;
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
