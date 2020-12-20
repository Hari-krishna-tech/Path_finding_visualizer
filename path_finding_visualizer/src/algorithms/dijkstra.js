


export const dijkstra = (grid,startNode,finishNode) => {
    const visitedNodesInOrder = []
    
    startNode.distance = 0
    const unVisitedNodes = getAllNodes(grid)
    
    while(!!unVisitedNodes.length) {
        sortUnVisitedNodes(unVisitedNodes)
        const curNode = unVisitedNodes.shift()
        
        if(curNode.isWall) continue
        if(curNode.distance === Infinity) return visitedNodesInOrder
        curNode.isVisited = true;
        visitedNodesInOrder.push(curNode)
        if(curNode.isFinish) return visitedNodesInOrder
        addUnVisitedNeighborDistance(grid,curNode)
    }
}
const addUnVisitedNeighborDistance = (grid,node) => {
    const unVisitedNeighbors = getAllUnvisitedNeighbors(grid,node)
    for(const neighbor of unVisitedNeighbors){
        neighbor.distance = node.distance + 1
        neighbor.previousNode = node
    }
    
}
const getAllUnvisitedNeighbors = (grid,node) => {
    const neighbors = []
    const {col, row} = node
    if (row > 0) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
    return neighbors.filter(neighbor => !neighbor.isVisited)
}


const sortUnVisitedNodes = (unVisitedNodes) => {
    unVisitedNodes.sort((node1,nodes2) => node1.distance - nodes2.distance)
}


const getAllNodes = (grid) => {
    const nodes = [];
    for(const row of grid){
        for(const node of row) {
            nodes.push(node)
        }
    }
   
    return nodes;
}


export const getNodesInSortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}