import React,{useState} from 'react'
import './PathFindingVisualizer.css'
import Node from './Node/Node'
import {dijkstra, getNodesInSortestPathOrder} from '../algorithms/dijkstra'

const START_NODE_ROW = 10
const START_NODE_COL = 15
const FINISH_NODE_ROW = 10
const FINISH_NODE_COL = 35



const PathFindingVisualizer = () => {
    const [grid,setGrid] = useState(createGrid())

    const animateDijkstra = (visitedNodesInOrder,nodesShortestPathInOrder) => {
        
        for(let i = 0;i<=visitedNodesInOrder.length;i++){
            if(i === visitedNodesInOrder.length){
                setTimeout(() => {
                    animateShortestPath(nodesShortestPathInOrder)
                }, 10*i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i]
                console.log(node.row,node.col)
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node visited'
            }, 10*i);
        }
    }
    const animateShortestPath = (nodesShortestPathInOrder) => {
        for(let i =0; i<nodesShortestPathInOrder.length;i++){
            setTimeout(() => {
                const node = nodesShortestPathInOrder[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node shortest-path'
            }, 10*i);
        }
    }
    
    const visualizeDijkstra = (e) => {
        e.preventDefault()
        
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
        
        const visitedNodesInOrder = dijkstra(grid,startNode,finishNode)
        const nodesShortestPathInOrder = getNodesInSortestPathOrder(finishNode)
        
        animateDijkstra(visitedNodesInOrder,nodesShortestPathInOrder)
    }
    
    return (
        <>
        <button onClick={(e)=>visualizeDijkstra(e)
        }>
            Visualize Dijkstra
        </button>
        <div className="grid">
        {
        grid.map( (row, rowIdx) => {
            return (
              <div key={rowIdx}>
                  
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node
                  return (
                      
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      row={row}></Node>
                      
                  )
                })}
                
                </div>  )
        })}
        </div>
        
    </>)
}



const createGrid = () => {
    const grid = []
    for(let row =0;row<20;row++){
        const currentRow = []
        for(let col=0; col<50;col++){
            currentRow.push(createNode(row,col))
        }
        grid.push(currentRow)
    }
    return grid;
}


const createNode = (row,col) => {
    return {
        row,
        col,
        isWall:false,
        isVisited: false,
        previousNode: null,
        distance: Infinity,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL
    }
}

export default PathFindingVisualizer
