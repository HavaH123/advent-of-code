const fs = require('fs');
main();

function main() {
  const inputLines = readInputAsLines();
  const data = makeData(inputLines);

  let weCareAboutY = 2000000;
  let couldAffectBeacons = [];

  for(let i=0; i<data.length; i++) {
    let [sx, sy, bx, by] = data[i];
    let maxDist = manhattanDist(sx, sy, bx, by);

    let [minY, maxY] = [sy - maxDist, sy + maxDist];
    if(minY <= weCareAboutY && maxY >= weCareAboutY) {
      couldAffectBeacons.push([sx, sy, maxDist]);
    }
  }

  let cannotIntervals = [];
  for(let i=0; i<couldAffectBeacons.length; i++) {
    let [sx, sy, maxDist] = couldAffectBeacons[i];
    let diffHeight = Math.abs(sy - weCareAboutY);
    let lenOfCannot = 2*maxDist + 1 - 2*diffHeight;
    let startCannot = sx - maxDist + diffHeight;

    cannotIntervals.push([startCannot, startCannot+lenOfCannot-1]);
  }

  cannotIntervals = cannotIntervals.sort((a, b) => a[0] - b[0]);
  mergedIntervals = mergeIntervals(cannotIntervals);

  let totCannot = 0;
  for(let i=0; i<mergedIntervals.length; i++) {
    totCannot += (mergedIntervals[i][1] - mergedIntervals[i][0]);
  }

  console.log(totCannot);
}

function mergeIntervals(arr) {
  let merArr = [...arr];
  for(let i=0; i<merArr.length-1; ) {
    let a = merArr[i];
    let b = merArr[i+1];

    if(b[0] > a[1]) {
      i++;
      continue;
    }
    merArr[i] = [a[0], Math.max(a[1], b[1])];
    merArr.splice(i+1, 1);
  }
  return merArr;
}

function manhattanDist(x, y, x1, y1) {
  return Math.abs(x-x1) + Math.abs(y-y1);
}

function makeData(lines) {
  return lines.map(line => {
    let match = line.match(/.*=(-?\d+),.*=(-?\d+):.*=(-?\d+).*=(-?\d+)/);
    const sx = parseInt(match[1]);
    const sy = parseInt(match[2]);
    const bx = parseInt(match[3]);
    const by = parseInt(match[4]);

    return [sx, sy, bx, by];
  });
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