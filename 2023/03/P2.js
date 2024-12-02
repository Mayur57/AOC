const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function parseNumbers(input) {
  const numbers = []
  input.forEach((row, i) => {
    const matches = [...row.matchAll(/\d+/dg)]
    if (matches.length) {
      matches.forEach(match => {
        numbers.push({
          value: parseInt(match[0]),
          row: i,
          startIdx: match.indices[0][0],
          endIdx: match.indices[0][1],
        })
      })
    }
  })
  return numbers
}

function parseSymbols(input) {
  const symbols = []
  input.forEach((row, i) => {
    const matches = [...row.matchAll(/[^\d|.|\s]/dg)]
    if (matches.length) {
      matches.forEach(match => {
        symbols.push({
          value: match[0],
          row: i,
          index: match.index,
        })
      })
    }
  })
  return symbols
}

function main(str) {
  const split = str.split('\n')
  const nums = parseNumbers(split)
  const symbs = parseSymbols(split)
  const filtered = []
  symbs
    .filter(symbol => symbol.value === '*')
    .forEach(symbol => {
      const filteredNums = nums.filter(number => {
        const numberL = number.value.toString().length
        const inAdjacentRow = number.row >= symbol.row - 1 && number.row <= symbol.row + 1
        const presentAdjCol =
          number.startIdx >= symbol.index - numberL && number.endIdx <= symbol.index + numberL + 1
        return inAdjacentRow && presentAdjCol
      })
      if (filteredNums.length === 2) filtered.push(filteredNums[0].value * filteredNums[1].value)
    })

  const ans = filtered.reduce((acc, curr) => acc + curr, 0)
  console.log({ ans })
}

main(input)
