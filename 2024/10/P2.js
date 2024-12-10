const fs = require('fs')

const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  const map = str
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.split('').map(Number))
  const rows = map.length
  const cols = map[0].length

  const isValid = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  const countTrails = (x, y, height, visited) => {
    if (map[x][y] !== height) return 0
    if (height === 9) return 1

    let trailCount = 0
    visited[x][y] = true

    for (const [dx, dy] of directions) {
      const newX = x + dx
      const newY = y + dy
      if (isValid(newX, newY) && !visited[newX][newY]) {
        trailCount += countTrails(newX, newY, height + 1, visited)
      }
    }

    visited[x][y] = false
    return trailCount
  }

  let totalRating = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (map[i][j] === 0) {
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
        totalRating += countTrails(i, j, 0, visited)
      }
    }
  }

  return totalRating
}

console.log(main(example))
console.log(main(input))
