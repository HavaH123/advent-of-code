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

  for(let i=0; i<100; i++) {
    for(let j=0; j<robots.length; j++) {
      let [x, y, vx, vy] = robots[j];
      x = move(x, vx, width);
      y = move(y, vy, height);
      robots[j] = [x, y, vx, vy];
    }
  }

  let q1 = 0, q2 = 0, q3 = 0, q4 = 0;
  let midHt = Math.floor(height/2);
  let midWd = Math.floor(width/2);

  for(let i=0; i<robots.length; i++) {
    let [x,y,vx, vy] = robots[i];
    if(y<midHt) {
      if(x<midWd) {
        q1++;
      } else if(x>midWd) {
        q2++;
      }
    } else if(y>midHt) {
      if(x<midWd) {
        q3++;
      } else if(x>midWd) {
        q4++;
      }
    }
  }

  console.log(q1*q2*q3*q4);
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
