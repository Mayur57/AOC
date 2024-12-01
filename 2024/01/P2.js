const fs = require("fs");

const example = fs.readFileSync("./eg.dat", { encoding: "utf8" }).trim();
const input = fs.readFileSync("./in.dat", { encoding: "utf8" }).trim();

function main(str) {
    let result = 0;
    const arr = str.replaceAll("   ", "\n").split("\n");
    const arrEven = [];
    const arrOdd = [];
    for (let i = 0; i < arr.length; i++) {
      if (i % 2 == 0) {
        arrEven.push(parseInt(arr[i]));
      } else {
        arrOdd.push(parseInt(arr[i]));
      }
    }

    const freq = new Map();
     for(let i = 0; i < arrEven.length; i++) {
        if(!freq.has(arrEven[i])) {
            freq.set(arrEven[i], 1)
        } else {
            freq.set(arrEven[i], freq.get(arrEven[i]) + 1)
        }
     }

     for(let i = 0; i < arrOdd.length; i++) {
        const multiplier = freq.get(arrOdd[i]) || 0;
        result += multiplier * arrOdd[i];
     }

     return result;
}

console.log(main(example));
console.log(main(input));
