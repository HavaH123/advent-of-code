const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  const height=103, width=101;
  // const height=7, width=11;

  let robots = [];
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    robots.push(inputLines[i].match(/-?\d+/g).map(a=>parseInt(a)));
  }

  for(let i=0; i<1000000; i++) {
    for(let j=0; j<robots.length; j++) {
      let [x, y, vx, vy] = robots[j];
      x = move(x, vx, width);
      y = move(y, vy, height);
      robots[j] = [x, y, vx, vy];
    }

    printRobots(robots, height, width, i+1);

  }
}

function printRobots(robots, height, width, second) {
  let arr = [];
  for(let i=0; i<height; i++) {
    arr.push(Array(width).fill(0));
  }

  for(let i=0; i<robots.length; i++) {
    let [x, y, vx, vy] = robots[i];
    arr[y][x]++;
  }

  let maxConsec = 0;
  for(let i=0; i<height; i++) {
    let count = arr[i].map(a=>a===0?0:1).reduce((partialSum, a) => partialSum + a, 0);;
    if(count > maxConsec) {
      maxConsec = count;
    }
  }

  if(maxConsec < 30) {
    return;
  }

  console.log("Second: ", second);
  for(let i=0; i<height; i++) {
    console.log(arr[i].map(a=>a===0?".":"*").join(""));
  }
  console.log("========================================");
  console.log("========================================");
}

function move(pos, vel, limit) {
  let newPos = pos + vel;
  if(newPos >= limit) {
    return newPos%limit;
  }
  if(newPos<0) {
    newPos = newPos%limit;
    return limit+newPos;
  }
  return newPos;
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
