const fs = require('fs')

const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  let result = 0
  const arr = str.replaceAll('   ', '\n').split('\n')
  const arrEven = []
  const arrOdd = []
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 == 0) {
      arrEven.push(parseInt(arr[i]))
    } else {
      arrOdd.push(parseInt(arr[i]))
    }
  }
  arrEven.sort((a, b) => a - b)
  arrOdd.sort((a, b) => a - b)

  for (let i = 0; i < arrEven.length; i++) {
    result += Math.abs(arrEven[i] - arrOdd[i])
  }
  return result
}

console.log(main(example))
console.log(main(input))
