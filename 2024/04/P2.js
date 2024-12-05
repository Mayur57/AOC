const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  const grid = str.split('\n').map(line => line.trim())
  const rows = grid.length
  const cols = grid[0].length
  let count = 0

  const insideGrid = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols

  function isXMAS(r, c) {
    const topLeft = insideGrid(r - 1, c - 1) && grid[r - 1][c - 1]
    const topRight = insideGrid(r - 1, c + 1) && grid[r - 1][c + 1]
    const bottomLeft = insideGrid(r + 1, c - 1) && grid[r + 1][c - 1]
    const bottomRight = insideGrid(r + 1, c + 1) && grid[r + 1][c + 1]
    const middle = insideGrid(r, c) && grid[r][c] === 'A'

    if (!middle) return false

    const dia1 =
      (topLeft === 'M' && bottomRight === 'S') || (topLeft === 'S' && bottomRight === 'M')
    const dia2 =
      (topRight === 'M' && bottomLeft === 'S') || (topRight === 'S' && bottomLeft === 'M')

    return dia1 && dia2
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (isXMAS(r, c)) {
        count++
      }
    }
  }

  return count
}

console.log(main(example), 9)
console.log(main(input))
