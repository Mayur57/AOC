const fs = require("fs");

const example = fs.readFileSync("./eg.dat", { encoding: "utf8" }).trim();
const input = fs.readFileSync("./in.dat", { encoding: "utf8" }).trim();

function isDesc(arr) {
    for(let i=0 ; i < arr.length-1; i++)
        if(Number(arr[i+1]) > Number(arr[i])) return false;
    return true;
}

function isAsc(arr) {
    for(let i=0 ; i < arr.length-1; i++)
        if(Number(arr[i+1]) < Number(arr[i])) return false;
    return true;
}

function isSafe(arr) {
    for(let i=0 ; i < arr.length-1; i++) {
        const diff = Math.abs(Number(arr[i+1]) - Number(arr[i]))
        if(diff < 1 || diff > 3) return false;
    }
    return true;
}

function isMonotonic(arr) {
    return (isDesc(arr) || isAsc(arr)) && isSafe(arr)
}

function dampener(arr) {
    if (isMonotonic(arr)) return true;

    for (let i = 0; i < arr.length; i++) {
        const temp = arr.slice(0, i).concat(arr.slice(i + 1));
        if (isMonotonic(temp)) {
            return true;
        }
    }

    return false;
}

function main(str) {
    const lines = str.split("\n")
    let ans = 0;
    lines.forEach(l => {
        const arr = l.split(" ")
        ans += (isMonotonic(arr) || dampener(arr)) ? 1 : 0
    })
    return ans
}

console.log(main(example))
console.log(main(input))
