const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  const grid = str.split('\n').map(line => line.trim())
  const directions = [
    [-1, 0],     // N
    [-1, 1],     // NE
    [0, 1],      // E
    [1, 1],      // SE
    [1, 0],      // S
    [1, -1],     // SW
    [0, -1],     // W
    [-1, -1],    // NW
  ]
  const word = 'XMAS'
  let count = 0

  const rows = grid.length
  const cols = grid[0].length

  const insideGrid = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [dr, dc] of directions) {
        let match = true
        for (let k = 0; k < word.length; k++) {
          const nr = r + k * dr
          const nc = c + k * dc
          if (!insideGrid(nr, nc) || grid[nr][nc] !== word[k]) {
            match = false
            break
          }
        }
        if (match) count++
      }
    }
  }

  return count
}

console.log(main(example), 18)
console.log(main(input))
