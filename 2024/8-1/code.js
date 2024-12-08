const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let map = [];
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    map.push(inputLines[i].split(""));
  }

  let antennas = {};
  for(let i=0; i<map.length; i++) {
    for(let j=0; j<map[0].length; j++) {
      if(map[i][j] === ".") {
        continue;
      }
      key = map[i][j];
      if(antennas[key] == null) {
        antennas[key] = [];
      }
      antennas[key].push([i,j]);
    }
  }

  let antiNodes = {};
  for(let antenna in antennas) {
    let locs = antennas[antenna];

    for(let i=0; i<locs.length-1; i++) {
      for(let j=i+1; j<locs.length; j++) {
        let [x1, y1] = locs[i];
        let [x2, y2] = locs[j];

        let [xdiff, ydiff] = [x1-x2, y1-y2];
        let candidates = [[x1+xdiff, y1+ydiff], [x2-xdiff, y2-ydiff]];

        for(let i=0; i<candidates.length; i++) {
          let [x, y] = candidates[i];
          if(x>=0 && x<map.length && y>=0 && y<map[0].length) {
            antiNodes[x+"|"+y] = true;
          }
        }
      }
    }
  }

  console.log(Object.keys(antiNodes).length);
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
