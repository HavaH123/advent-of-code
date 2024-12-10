const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let topo=[];
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    topo.push(inputLines[i].split("").map(a => parseInt(a)));
  }

  let heads = [];
  for(let i=0; i<topo.length; i++) {
    for(let j=0; j<topo[0].length; j++) {
      if(topo[i][j] === 0) {
        heads.push([i, j]);
      }
    }
  }

  let ans = 0;
  for(let i=0; i<heads.length; i++) {
    ans += findTrailsFromHead(topo, heads[i]);
  }



  console.log(ans);
}

function findTrailsFromHead(topo, head) {
  let curr = [head];
  let trails = {};
  while(curr.length > 0) {
    let [i, j] = curr.shift();
    let ele = topo[i][j];

    if(ele == 9) {
      trails[i+"|"+j]=true;
      continue;
    }

    if(isValid(topo, i-1, j, ele)) {
      curr.unshift([i-1, j]);
    }
    if(isValid(topo, i+1, j, ele)) {
      curr.unshift([i+1, j]);
    }
    if(isValid(topo, i, j-1, ele)) {
      curr.unshift([i, j-1]);
    }
    if(isValid(topo, i, j+1, ele)) {
      curr.unshift([i, j+1]);
    }
  }

  return Object.keys(trails).length;
}

function isValid(topo, i, j, ele) {
  return i>=0 && j>=0 && i<topo.length && j<topo[0].length && topo[i][j] == ele+1;
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
