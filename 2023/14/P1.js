const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function readAsColumns(str) {
  let line = ''
  let arr = []
  for (let col = 0; col < str[0].length; col++) {
    for (let row = 0; row < str.length; row++) {
      line += str[row][col]
    }
    arr.push(line)
    line = ''
  }
  return arr
}

function sortLine(line) {
  return line
    .split('#')
    .map(group => group.split('').sort().reverse().join(''))
    .join('#')
}

function main(str) {
  const lines = str.split('\n')
  const columns = readAsColumns(lines)
  const processed = readAsColumns(columns.map(sortLine))
  let ans = 0
  for (let i = 0; i < processed.length; i++) {
    for (let j = 0; j < processed[i].length; j++) {
      if (processed[i][j] === 'O') {
        ans += processed.length - i
      }
    }
  }
  return ans
}

console.log(main(example))
console.log(main(input))
