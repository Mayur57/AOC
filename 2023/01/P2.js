const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function isCharNum(char) {
  return char.charCodeAt(0) > 47 && char.charCodeAt(0) < 58
}

function replacer(str) {
  const stringToNum = {
    zero: 'z0o',
    one: 'o1e',
    two: 't2o',
    three: 't3e',
    four: 'f4r',
    five: 'f5e',
    six: 's6x',
    seven: 's7n',
    eight: 'e8t',
    nine: 'n9e',
  }

  Object.entries(stringToNum).forEach(set => {
    str = str.replaceAll(set[0], set[1])
    console.log(str)
  })

  return str
}

function main(str) {
  let ans = 0
  str.split('\n').forEach(line => {
    line = replacer(line)
    console.log(line)
    let begin = ''
    let end = ''
    for (let i = 0; i < line.length; i++) {
      if (isCharNum(line[i])) {
        // console.log(line[i])
        begin = line[i]
        break
      }
    }
    for (let i = 0; i < line.length; i++) {
      if (isCharNum(line[line.length - i - 1])) {
        // console.log(line[line.length - i - 1])
        end = line[line.length - i - 1]
        break
      }
    }
    console.log({ begin, end, int: parseInt(begin.concat(end[0])) })
    ans += parseInt(begin.concat(end[0]))
  })
  console.log(ans) // 53348
}

main(example)
main(input)
