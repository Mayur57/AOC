const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function isDesc(arr) {
  for (let i = 0; i < arr.length - 1; i++) if (parseInt(arr[i + 1]) > parseInt(arr[i])) return false
  return true
}

function isAsc(arr) {
  for (let i = 0; i < arr.length - 1; i++) if (parseInt(arr[i + 1]) < parseInt(arr[i])) return false
  return true
}

function isMonotonic(arr) {
  return isDesc(arr) || isAsc(arr)
}

function isSafe(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = Math.abs(parseInt(arr[i + 1]) - parseInt(arr[i]))
    if (diff < 1 || diff > 3) return false
  }
  return true
}

function main(str) {
  const lines = str.split('\n')
  let ans = 0
  lines.forEach(l => {
    const arr = l.split(' ')
    ans += isMonotonic(arr) && isSafe(arr) ? 1 : 0
  })
  return ans
}

// main(example)
console.log(main(example))
console.log(main(input))
