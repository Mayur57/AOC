const fs = require('fs')

const input = fs.readFileSync('in.dat', { encoding: 'utf8' }).trim()
const example = fs.readFileSync('eg.dat', { encoding: 'utf8' }).trim()

// adjacency list
function parseNetworkMap(line) {
  const graph = {}

  line.forEach(l => {
    const [a, b] = l.split('-')
    if (!graph[a]) graph[a] = new Set()
    if (!graph[b]) graph[b] = new Set()
    graph[a].add(b)
    graph[b].add(a)
  })

  return graph
}

function findCliques(graph, minSize = 1, maxSize = Infinity) {
  const nodes = Object.keys(graph)
  const cliques = []

  function bronKerbosch(R, P, X) {
    if (P.length === 0 && X.length === 0) {
      if (R.length >= minSize && R.length <= maxSize) {
        cliques.push([...R])
      }
      return
    }

    const pivot = P.concat(X)[0]
    const pivotNeighbors = graph[pivot]

    for (const node of P.filter(n => !pivotNeighbors.has(n))) {
      bronKerbosch(
        [...R, node],
        P.filter(n => graph[node].has(n)),
        X.filter(n => graph[node].has(n))
      )
      P = P.filter(n => n !== node)
      X.push(node)
    }
  }

  bronKerbosch([], nodes, [])
  return cliques
}

function main(str) {
  const connections = str.split('\n')
  const graph = parseNetworkMap(connections)
  const cliques = findCliques(graph)
  const largestClique = cliques.reduce(
    (max, clique) => (clique.length > max.length ? clique : max),
    []
  )
  const largestCliqueNames = largestClique.sort()
  const result = largestCliqueNames.join(',')
  return result
}

console.log(main(example), "co,de,ka,ta")
console.log(main(input))
