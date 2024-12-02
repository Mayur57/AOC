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

function findSmallestDeletableDir(node, requiredFreeSpace, currentFreeSpace) {
  if (node.type === 'file') return Infinity

  const neededSpace = requiredFreeSpace - currentFreeSpace
  let smallestDirSize = node.totalSize >= neededSpace ? node.totalSize : Infinity

  for (const child of node.children) {
    smallestDirSize = Math.min(
      smallestDirSize,
      findSmallestDeletableDir(child, requiredFreeSpace, currentFreeSpace)
    )
  }

  return smallestDirSize
}

function main(str) {
  const filesystem = parseFilesystem(str)
  const TOTAL_DISK_SPACE = 70000000
  const REQUIRED_SPACE = 30000000

  const usedSpace = calculateSizes(filesystem)
  const currentFreeSpace = TOTAL_DISK_SPACE - usedSpace
  return findSmallestDeletableDir(filesystem, REQUIRED_SPACE, currentFreeSpace)
}

console.log(main(example))
console.log(main(input))
