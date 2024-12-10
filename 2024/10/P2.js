const fs = require('fs')

const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()

function calculateTrailheadRatings(str) {
  const map = str
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.split('').map(Number))
  const rows = map.length
  const cols = map[0].length

  // Helper to determine if a position is within bounds and valid
  const isValid = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols

  // Directions for moving up, down, left, or right
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  // Recursive function to count all distinct trails from a given position
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

    visited[x][y] = false // Backtrack
    return trailCount
  }

  // Find all trailheads (positions with height 0)
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

console.log(calculateTrailheadRatings(example))
console.log(calculateTrailheadRatings(input))
