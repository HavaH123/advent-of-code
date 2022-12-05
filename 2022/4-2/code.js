const fs = require('fs');

main();

function main() {
  const inputLines = readInputAsLines();
  
  let res = 0;
  for(let i=0; i<inputLines.length; i++) {
    let line = inputLines[i];
    let pairs = line.split(",");
    const [start1, end1] = pairs[0].split("-").map(a => parseInt(a));
    const [start2, end2] = pairs[1].split("-").map(a => parseInt(a));

    
    if(
      (start2 >= start1 && start2 <= end1) || 
      (end2 >= start1 && end2 <= end1) 
    ) {
      res++;
    } else if(
      (start1 >= start2 && start1 <= end2) || 
      (end1 >= start2 && end1 <= end2) 
    ) {
      res++;
    }
  }
  
  console.log(res);
}


function readInputAsLines() {
  try {
    const data = fs.readFileSync(__dirname+'\\input', 'utf8');
    const lines = data.split("\n").map(line => line.trim());
    return lines;
  } catch (err) {
    console.error(err);
  }
  return [];
}