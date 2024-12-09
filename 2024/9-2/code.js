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

  for(let i=disk.length-1; i>=0; i--) {
    let fileSize = 0;
    if(disk[i] === ".") {
      continue;
    }
    if(disk[i] !== ".") {
      let thisFile = disk[i];
      for(let j=i; disk[j]!="." && j>=0 && disk[j]===thisFile; j--) {
        fileSize++;
      }
    }
    let fileStart = i-fileSize+1;
    let spaceStart = -1;

    for(let k=0; k<fileStart; k++) {
      if(disk[k] === ".") {
        let freeSpace = 0, freeSpaceStart = k;
        while(disk[k] === ".") {
          freeSpace++;
          k++;
        }
        if(freeSpace >= fileSize) {
          spaceStart = freeSpaceStart;
          break;
        }
      }
    }

    if(spaceStart != -1) {
      for(let i=0; i<fileSize; i++) {
        [disk[spaceStart+i], disk[fileStart+i]] = [disk[fileStart+i], disk[spaceStart+i]];
      }
    }
    i=fileStart;
  }

  let ans = 0;
  for(let i=0; i<disk.length; i++) {
    if(disk[i] !== ".") {
      ans += i*disk[i];
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
