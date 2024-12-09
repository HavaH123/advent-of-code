const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let array;
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    array = inputLines[i].split("").map(a => parseInt(a));
  }

  let disk = [];
  let file = 0;
  let readingFile = true;
  for(let i=0; i<array.length; i++) {
    if(readingFile) {
      disk = disk.concat(Array(array[i]).fill(file));
      file++;
    } else {
      disk = disk.concat(Array(array[i]).fill("."));
    }

    readingFile = !readingFile;
  }

  let left = 0, right = disk.length-1;
  while(left < right) {
    if(disk[left] != ".") {
      left++;
    }
    if(disk[right] === ".") {
      right--;
    }
    if(disk[left] === "." && disk[right] !== ".") {
      [disk[left], disk[right]] = [disk[right], disk[left]];
      left++;
      right--;
    }
  }

  let ans = 0;
  for(let i=0; i<disk.length; i++) {
    if(disk[i] === ".") {
      break;
    }
    ans += i*disk[i];
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
