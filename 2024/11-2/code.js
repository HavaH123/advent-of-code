const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();

  let array;
  for(let i=0; i<inputLines.length; i++) {
    if(inputLines[i] === "") {
      continue;
    }
    array = inputLines[i].split(" ").map(a => parseInt(a));
  }

  let numberMap = {};
  for(let i=0; i<array.length; i++) {
    let num = array[i];
    if(numberMap[num] == null) {
      numberMap[num] = 0;
    }
    numberMap[num]++;
  }

  for(let i=0; i<75; i++) {
    let newMap = {};

    for(let key in numberMap) {
      let newKeys = becomes(parseInt(key));
      for(let j=0; j<newKeys.length; j++) {
        let newKey = newKeys[j];
        if(newMap[newKey] == null) {
          newMap[newKey] = 0;
        }
        newMap[newKey] += numberMap[key];
      }
    }
    numberMap = newMap;
  }

  let ans = 0;
  for(let key in numberMap) {
    ans += numberMap[key];
  }

  console.log(ans);
}

function becomes(number) {
  let numberStr = ""+number;
  if(number === 0) {
    return [1];
  } else if((numberStr.length % 2) === 0) {
    return [
      parseInt(numberStr.slice(0, numberStr.length/2)),
      parseInt(numberStr.slice(numberStr.length/2))
    ];
  } else {
    return [number * 2024];
  }
}

/*function whatNext(arrayMap) {
  let newMap = {};

  // 0 -> 1
  newMap[1] = arrayMap[0];

  // 1 -> 2024
  newMap[2024] = arrayMap[1];

  // 2024 -> 20 24
  newMap[20] = arrayMap[2024];
  newMap[24] = arrayMap[2024];

  // 20 -> 2 0
  newMap[2] = arrayMap[20];
  newMap[0] = arrayMap[20];

  // 24 -> 2 4
  newMap[2] += arrayMap[24];
  newMap[4] = arrayMap[24];

  // 2 -> 4048
  newMap[4048] = arrayMap[2];

  // 4 -> 8096
  newMap[8096] = arrayMap[4];

  // 4048 -> 40 48
  newMap[40] = arrayMap[4048];
  newMap[48] = arrayMap[4048];

  // 40 -> 4 0
  newMap[4] += arrayMap[40];
  newMap[0] += arrayMap[40];

  // 48 -> 4 8
  newMap[4] += arrayMap[40];
  newMap[8] = arrayMap[40];

  // 8096 -> 80 96
  newMap[80] = arrayMap[8096];
  newMap[96] = arrayMap[8096];

  // 80 -> 8 0
  newMap[8] += arrayMap[80];
  newMap[0] += arrayMap[80];

  // 96 -> 9 6
  newMap[9] = arrayMap[96];
  newMap[6] = arrayMap[96];

  // 9 -> 18216
  newMap[18216] = arrayMap[9];

  // 6 -> 12144
  newMap[12144] = arrayMap[6];

  // 18216 -> 36869184
  newMap[36869184] = arrayMap[18216]

}*/


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
