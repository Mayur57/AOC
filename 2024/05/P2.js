const fs = require('fs')

const example = fs.readFileSync('./eg.dat', { encoding: 'utf8' }).trim()
const input = fs.readFileSync('./in.dat', { encoding: 'utf8' }).trim()

function main(str) {
  const [rulesSection, updatesSection] = str.trim().split('\n\n')
  const rules = rulesSection.split('\n').map(rule => rule.split('|').map(Number))
  const updates = updatesSection.split('\n').map(update => update.split(',').map(Number))

  const orderMap = new Map()
  rules.forEach(([before, after]) => {
    if (!orderMap.has(before)) orderMap.set(before, new Set())
    orderMap.get(before).add(after)
  })

  function isValidOrder(update) {
    const indexMap = new Map()
    update.forEach((page, index) => indexMap.set(page, index))

    for (let [before, after] of rules) {
      if (indexMap.has(before) && indexMap.has(after)) {
        if (indexMap.get(before) > indexMap.get(after)) {
          return false
        }
      }
    }
    return true
  }

  function reorderUpdate(update) {
    const graph = new Map()
    const inDegree = new Map()
    const pagesSet = new Set(update)

    pagesSet.forEach(page => {
      graph.set(page, [])
      inDegree.set(page, 0)
    })

    rules.forEach(([before, after]) => {
      if (pagesSet.has(before) && pagesSet.has(after)) {
        graph.get(before).push(after)
        inDegree.set(after, inDegree.get(after) + 1)
      }
    })

    const queue = []
    inDegree.forEach((degree, page) => {
      if (degree === 0) queue.push(page)
    })

    const sorted = []
    while (queue.length > 0) {
      const current = queue.shift()
      sorted.push(current)
      ;(graph.get(current) || []).forEach(next => {
        inDegree.set(next, inDegree.get(next) - 1)
        if (inDegree.get(next) === 0) {
          queue.push(next)
        }
      })
    }

    return sorted
  }

  let totalSum = 0
  updates.forEach(update => {
    if (!isValidOrder(update)) {
      const reordered = reorderUpdate(update)
      const middleIndex = Math.floor(reordered.length / 2)
      totalSum += reordered[middleIndex]
    }
  })

  return totalSum
}

console.log(main(example), 123)
console.log(main(input))
