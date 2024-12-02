const fs = require('fs')

const example = fs.readFileSync('./eg', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in', { encoding: 'utf8' }).trim()

function processInput(str) {
  let time = ''
  let dist = ''
  str
    .split('\n')[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .filter(l => l !== '')
    .forEach(num => {
      time += num
    })
  str
    .split('\n')[1]
    .split(':')[1]
    .trim()
    .split(' ')
    .filter(l => l !== '')
    .forEach(num => {
      dist += num
    })
  return { time: parseInt(time), dist: parseInt(dist) }
}

function main(str) {
  const { time, dist } = processInput(str)
  let ans = 0
  for (let i = 1; i <= time; i++) {
    const speed = i
    const timeRemaining = time - i
    const distance = speed * timeRemaining
    if (distance > dist) ans++
  }
  return ans
}

console.log('example: ', main(example))
console.log('input: ', main(input))
