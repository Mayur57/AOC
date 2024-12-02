const fs = require('fs')

const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  let floor = 0
  for (let c = 0; c < str.length; c++) {
    if (str[c] === ')') {
      floor -= 1
    } else if (str[c] === '(') {
      floor += 1
    }
  }
  return floor
}

console.log(main(input))
