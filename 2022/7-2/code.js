const fs = require('fs');
var util = require('util')


main();

function main() {
  const inputLines = readInputAsLines();
  
  let fileTree = {
    size: 0,
    type: "dir",
    name: "/",
    parent: null,
    children: [],
  };
  let currPtr = fileTree;

  for(let i=0; i<inputLines.length; i++) {
    const line = inputLines[i];
    if(line[0] === '$') {
      const [st, cmd, arg] = line.split(" ");
      if(cmd === "cd") {
        if(arg === "/") {
          currPtr = fileTree;
        } else if(arg === "..") {
          currPtr = currPtr.parent;
        } else {
          currPtr = currPtr.children.find(e => e.name === arg);
        }
      }
    } else {
      const [size, name] = line.split(" ");
      let newNode = {
        size: 0,
        type: "",
        name: name,
        parent: currPtr,
        children: [],
      }

      if(size === "dir") {
        newNode.type = "dir";
      } else {
        newNode.size = parseInt(size);
        newNode.type = "file";
      }

      currPtr.children.push(newNode);
    }
  }

  calcSize(fileTree);
  
  let stack = [fileTree];
  let req = 30000000 - (70000000 - fileTree.size);
  let ans = 70000000;
  while(stack.length > 0) {
    let elem = stack.pop();
    if(elem.type === "dir") {
      if(elem.size >= req && elem.size < ans) {
        ans = elem.size;
      }
      
      stack.push(...elem.children);
    }
  }
  console.log(ans);
}

function calcSize(start) {
  if(start.type === 'dir') {
    const childrenSizes = start.children.map(child => calcSize(child));
    let total = 0;
    childrenSizes.forEach(size => {total += size;});
    start.size = total;
    return total;
  }
  return start.size;
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