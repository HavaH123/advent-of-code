const fs = require('fs');
const mabs = Math.abs;

main();

function main() {
  const inputLines = readInputAsLines();
  const visited = {
    '0,0': true,
  };
  let total = 1;

  let [hx, hy] = [0, 0];
  let [tx, ty] = [0, 0];
  const move = {
    "D": [0, -1],
    "U": [0, 1],
    "L": [-1, 0],
    "R": [1, 0],
  };

  for(let i=0; i<inputLines.length; i++) {
    let line = inputLines[i];
    let [dir, steps] = line.split(" ");
    steps = parseInt(steps);

    const toMove = move[dir];
    for(let j=0; j<steps; j++) {
      hx += toMove[0];
      hy += toMove[1];

      if(mabs(hx-tx) > 1 && hy === ty) {
        tx += toMove[0];
      } else if(mabs(hy-ty) > 1 && hx === tx) {
        ty += toMove[1];
      } else if(mabs(hx-tx) > 1 || mabs(hy-ty) > 1) {
        const [towardsHx, towardsHy] = [(hx-tx)/mabs(hx-tx), (hy-ty)/mabs(hy-ty)];
        tx += towardsHx;
        ty += towardsHy;
      }
      
      if(!visited[`${tx},${ty}`]) {
        visited[`${tx},${ty}`] = true;
        total++;
      }
    }
  }

  console.log(total);

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