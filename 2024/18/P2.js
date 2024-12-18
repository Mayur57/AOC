const fs = require('fs')

const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()

function BFS(grid) {
  const rows = grid.length
  const cols = grid[0].length

  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ]

  const queue = [[0, 0, 0]]

  const visited = new Set()
  visited.add(`0,0`)
  grid[0][0] = '█'

  while (queue.length > 0) {
    const [row, col, steps] = queue.shift()
    if (row === rows - 1 && col === cols - 1) {
      return steps
    }

    for (const [dr, dc] of directions) {
      const newRow = row + dr
      const newCol = col + dc

      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < cols &&
        grid[newRow][newCol] !== '█' &&
        !visited.has(`${newRow},${newCol}`)
      ) {
        grid[newRow][newCol] = 'O'
        visited.add(`${newRow},${newCol}`)
        queue.push([newRow, newCol, steps + 1])
      }
    }
  }

  return -1
}

function main(str, example = false) {
  const GRID_WIDTH = example ? 6 : 70
  const GRID_HEIGHT = example ? 6 : 70
  const BYTE_THRESHOLD = example ? 12 : 1024

  const coords = str.split('\n')

  let grid = Array.from({ length: GRID_HEIGHT + 1 }, () => Array(GRID_WIDTH + 1).fill('.'))
  for (let j = BYTE_THRESHOLD + 1; j < coords.length; j++) {
    for (let i = 0; i < j; i++) {
      let [x, y] = coords[i].split(',')
      grid[y][x] = '█'
    }
    const ans = BFS(grid)
    if (ans === -1) return coords[j - 1]
  }
}

console.log(main(example, true), '6,1')
console.log(main(input))
