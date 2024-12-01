const fs = require("fs")

const example = fs.readFileSync("eg.txt", { encoding: "utf8" }).trim()
const input = fs.readFileSync("in.txt", { encoding: "utf8" }).trim()

function parser(str) {
    const lines = str.split("\n").filter(f => f !== "")
    const path = lines[0]
    const groups = lines.slice(1)
    const nodes = {}
    groups.forEach(s => {
        const parent = s.split(" = ")[0]
        const temp = s.split(" = ")[1].replace(/[()]/g, "")
        const children = temp.split(", ")
        nodes[parent] = children
    })
    
    return {path, nodes}
}

const dirc = letter => letter === "L" ? 0 : 1
const last = str => str.charAt(str.length - 1)
const gcd = (a, b) => b === 0 ? a : gcd(b, a%b)
const lcm = (a,b) => (a*b)/gcd(a,b)

function walk(walk, nodes, lookup) {
    console.log("walking for", lookup)
    let inc = 0
    while(1) {
        lookup = nodes[lookup][dirc(walk.charAt(inc % walk.length))]
        if(last(lookup) === "Z"){
            break
        }
        inc++
    }
    return inc + 1
}

function main(str) {
    const {path, nodes} = parser(str)
    const starts = Object.keys(nodes).filter(f => last(f) === "A")
    console.log({starts})
    const indv = starts.map(start => {
        return walk(path, nodes, start)
    })
    console.log(indv)
    let ans = indv[0]
    for (let i = 1; i < indv.length; i++) {
        ans = lcm(ans, indv[i]);
    }
    return ans
}

console.log(main(example))
console.log(main(input))
