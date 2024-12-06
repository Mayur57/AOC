const fs = require('fs')

const example = fs.readFileSync('eg.dat', 'utf-8').trim()
const input = fs.readFileSync('in.dat', 'utf-8').trim()

function main(str) {
  const input = str.split('\n')
  const rows = input.length
  const cols = input[0].length

  const dirVectors = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  let startRow, startCol, startDir
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if ('^>v<'.includes(input[r][c])) {
        startRow = r
        startCol = c
        startDir = '^>v<'.indexOf(input[r][c])
        break
      }
    }
  }

  // Function to simulate guard movement with an possible obstacle
  const simulateWithObstacle = (obstacleRow, obstacleCol) => {
    let guardRow = startRow
    let guardCol = startCol
    let guardDir = startDir
    const visited = new Set()

    visited.add(`${guardRow},${guardCol},${guardDir}`)

    while (true) {
      const [dr, dc] = dirVectors[guardDir]
      const nextRow = guardRow + dr
      const nextCol = guardCol + dc
      const outsideGrid = nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols
      // Check if the next position is outside the grid
      if (outsideGrid) {
        return false
      }

      const nextCell =
        nextRow === obstacleRow && nextCol === obstacleCol ? '#' : input[nextRow][nextCol]
      if (nextCell === '#') {
        guardDir = (guardDir + 1) % 4
      } else {
        guardRow = nextRow
        guardCol = nextCol
      }

      const state = `${guardRow},${guardCol},${guardDir}`
      if (visited.has(state)) {
        return true
      }
      visited.add(state)
    }
  }

  let validPositions = 0

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (input[r][c] === '#' || (r === startRow && c === startCol)) {
        continue
      }

      if (simulateWithObstacle(r, c)) {
        validPositions++
      }
    }
  }

  return validPositions
}

console.log(main(example), 6)
console.log(main(input))
