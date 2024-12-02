const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function parseFilesystem(output) {
  const lines = output.trim().split('\n')
  const root = { name: '/', type: 'dir', children: [] }
  const pathStack = [root]

  lines.forEach(line => {
    if (line.startsWith('$ cd ')) {
      const command = line.slice(5).trim()
      if (command === '/') {
        while (pathStack.length > 1) pathStack.pop()
      } else if (command === '..') {
        pathStack.pop()
      } else {
        const currentDir = pathStack[pathStack.length - 1]
        const targetDir = currentDir.children.find(
          child => child.name === command && child.type === 'dir'
        )
        if (targetDir) pathStack.push(targetDir)
      }
    } else if (line.startsWith('$ ls')) {
      // do nothing
    } else {
      const currentDir = pathStack[pathStack.length - 1]
      const [sizeOrType, name] = line.split(' ')
      if (sizeOrType === 'dir') {
        currentDir.children.push({ name, type: 'dir', children: [] })
      } else {
        currentDir.children.push({ name, type: 'file', size: parseInt(sizeOrType, 10) })
      }
    }
  })

  return root
}

function calculateSizes(node) {
  if (node.type === 'file') {
    return node.size
  }
  const totalSize = node.children.reduce((sum, child) => sum + calculateSizes(child), 0)
  node.totalSize = totalSize
  return totalSize
}

function findAndSumSmallDirs(node, maxSize) {
  if (node.type === 'file') return 0

  let sum = 0
  if (node.totalSize <= maxSize) {
    sum += node.totalSize
  }
  for (const child of node.children) {
    sum += findAndSumSmallDirs(child, maxSize)
  }
  return sum
}

function main(str) {
  const filesystem = parseFilesystem(str)
  calculateSizes(filesystem)
  return findAndSumSmallDirs(filesystem, 100000)
}

console.log(main(example))
console.log(main(input))
