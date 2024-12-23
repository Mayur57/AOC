const fs = require('fs')

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()

// adjacency list
function parseNetworkMap(connections) {
  const graph = {}

  connections.forEach(connection => {
    const [a, b] = connection.split('-')
    if (!graph[a]) graph[a] = new Set()
    if (!graph[b]) graph[b] = new Set()
    graph[a].add(b)
    graph[b].add(a)
  })

  return graph
}

function findTriangles(graph) {
  const triangles = new Set()

  for (const node in graph) {
    const neighbors = Array.from(graph[node])

    for (let i = 0; i < neighbors.length; i++) {
      for (let j = i + 1; j < neighbors.length; j++) {
        const neighbor1 = neighbors[i]
        const neighbor2 = neighbors[j]

        if (graph[neighbor1].has(neighbor2)) {
          const triangle = [node, neighbor1, neighbor2].sort()
          triangles.add(triangle.join(','))
        }
      }
    }
  }

  return Array.from(triangles).map(triangle => triangle.split(','))
}

function main(str) {
  const connections = str.split('\n')
  const graph = parseNetworkMap(connections)
  const triangles = findTriangles(graph)
  const result = triangles.filter(triangle => triangle.some(name => name.startsWith('t')))
  return result.length
}

console.log(main(example), 7)
console.log(main(input))
