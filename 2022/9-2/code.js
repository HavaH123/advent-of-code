const fs = require('fs');
const mabs = Math.abs;

main();

function main() {
  const inputLines = readInputAsLines();
  const visited = {
    '0,0': true,
  };
  let total = 1;

  let snake = [];
  for(let i=0; i<10; i++) {
    snake[i] = [0, 0];
  }

  const move = {
    "D": [1, 0],
    "U": [-1, 0],
    "L": [0, -1],
    "R": [0, 1],
  };

  for(let i=0; i<inputLines.length; i++) {
    let line = inputLines[i];
    let [dir, steps] = line.split(" ");
    steps = parseInt(steps);

    const toMove = move[dir];
    for(let j=0; j<steps; j++) {
      snake[0][0] += toMove[0];
      snake[0][1] += toMove[1];

      for(let k=1; k<10; k++) {
        let [hx, hy] = snake[k-1];
        let [tx, ty] = snake[k];

        if(mabs(hx-tx) > 1 && hy === ty) {
          snake[k][0] += (hx-tx)/mabs(hx-tx);
        } else if(mabs(hy-ty) > 1 && hx === tx) {
          snake[k][1] += (hy-ty)/mabs(hy-ty);
        } else if(mabs(hx-tx) > 1 || mabs(hy-ty) > 1) {
          const [towardsHx, towardsHy] = [(hx-tx)/mabs(hx-tx), (hy-ty)/mabs(hy-ty)];
          snake[k][0] += towardsHx;
          snake[k][1] += towardsHy;
        }
      }
      
      let [tx, ty] = snake[9];
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