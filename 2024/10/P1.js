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

  const calculateScore = (startX, startY) => {
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
    const queue = [[startX, startY, 0]]
    visited[startX][startY] = true
    const reachable = new Set()

    while (queue.length > 0) {
      const [x, y, height] = queue.shift()

      for (const [dx, dy] of directions) {
        const newX = x + dx
        const newY = y + dy

        if (isValid(newX, newY) && !visited[newX][newY]) {
          const newHeight = map[newX][newY]

          if (newHeight === height + 1) {
            visited[newX][newY] = true
            queue.push([newX, newY, newHeight])
            if (newHeight === 9) {
              reachable.add(`${newX},${newY}`)
            }
          }
        }
      }
    }

    return reachable.size
  }

  let totalScore = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (map[i][j] === 0) {
        totalScore += calculateScore(i, j)
      }
    }
  }

  return totalScore
}

console.log(main(example))
console.log(main(input))
