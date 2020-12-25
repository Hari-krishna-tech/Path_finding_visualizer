import React,{useState,useEffect} from 'react'
import './PathFindingVisualizer.css'
import Node from './Node/Node'
import {dijkstra, getNodesInSortestPathOrder} from '../algorithms/dijkstra'
import {recursiveDivisionMaze} from '../mazeAlgorithms/recursiveDivisionMaze'
import useKey from "@rooks/use-key";

const START_NODE_ROW = 10
const START_NODE_COL = 15
const FINISH_NODE_ROW = 10
const FINISH_NODE_COL = 35



const PathFindingVisualizer = () => {
    const [grid,setGrid] = useState([])
    const [mouseIsPressed, setMouseIsPressed] = useState(false)
    const [visitedNodes, setVisitedNodes] = useState([])
    const [wall, setWall] = useState([])
    const [wIsPressed,setWIsPressed] = useState(false)
    const [weight,setWeight] = useState([])
    const [addWeight,setAddWeight] = useState([])


    
    useEffect(() => {
        setGrid(createGrid())
        
        
    }, [])

    const handleWPress = (e) => {
        if(e.type === 'keyup') {
            setWIsPressed(false)
        }else{
            setWIsPressed(true)
        }
    }
    useKey(['w'],handleWPress,{
        eventTypes: ["keypress", "keydown", "keyup"]
    })

    // const handleKeyDown = (row, col) => {
        
        
    //     const newGrid = getNewGridWithWeightToggled(grid, row, col,weight,setWeight)
    //     setGrid(newGrid)
    //     setWIsPressed(true)
    
    //   }
    
    //   const handleKeyEnter = (row, col) => {
    //     if (!wIsPressed) return;
        
    //     const newGrid = getNewGridWithWeightToggled(grid, row, col,weight,setWeight);
    //     setGrid(newGrid)
    
    //   }
    
    //   const handleKeyUp =() =>{
        
    //     setWIsPressed(false)
        
    //   }
    
    
    const handleMouseDown = (row, col) => {
        if(wIsPressed) {
            const newGrid = getNewGridWithWeightToggled(grid, row, col,weight,setWeight)
            setGrid(newGrid)
            
        } else{
        const newGrid = getNewGridWithWallToggled(grid, row, col,wall,setWall)
        setGrid(newGrid)
        setMouseIsPressed(true)}
    
      }
    
      const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        if(wIsPressed){
            const newGrid = getNewGridWithWeightToggled(grid, row, col,weight,setWeight);
            setGrid(newGrid)
        } else{
        const newGrid = getNewGridWithWallToggled(grid, row, col,wall,setWall);
        setGrid(newGrid)
    }
    
      }
    
      const handleMouseUp =() =>{
        setMouseIsPressed(false);
        
        
      }
    
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
        setVisitedNodes(visitedNodesInOrder)
        
        animateDijkstra(visitedNodesInOrder,nodesShortestPathInOrder)
    }
    const clearPath = () => {
        const walls = wall
        const newGrid = createGridWithWall(walls)
        for(const node of visitedNodes) {
            const weight = node.weight === 15
            const isStart = node.isStart
            const isFinish = node.isFinish
            const isWall = node.isWall
            const extraClassName = isStart?'start': isFinish?'finish':isWall?'wall':weight?'weight':''
            document.getElementById(`node-${node.row}-${node.col}`).className = `node ${extraClassName}`
        }
        setGrid(newGrid)
    }


    const clearGrid = () =>  {
        
       
        for(let i = 0;i<20;i++){
            
            for(let j =0;j<50;j++){
                
                const node =  grid[i][j]
                
                node.isWall = false
                
                
                const isStart = node.isStart
                const isFinish = node.isFinish
                const isWall = node.isWall
                const extraClassName = isStart?'start': isFinish?'finish':isWall?'wall':''
                document.getElementById(`node-${node.row}-${node.col}`).className = `node ${extraClassName}`
            }
            
            
        }
        setVisitedNodes([])
        setWall([])
        setGrid(createGrid())
       
    }


    const buildWall = () =>{
        clearGrid()
        const walls = recursiveDivisionMaze(grid);
        setWall(walls)
        
        const newGrid = grid.slice()
        for(let i=0;i<wall.length;i++) {
            setTimeout(() => {
            const node = wall[i]
            
            const isStart = node.isStart
            const isFinish = node.isFinish
            const newNode  = {
                ...node,
                isWall:!node.isWall,
            }
            const isWall = newNode.isWall
            newGrid[node.row][node.col] = newNode;
            const extraClassName = isStart?'start': isFinish?'finish':isWall?'wall':''
            document.getElementById(`node-${node.row}-${node.col}`).className = `node ${extraClassName}`
                
            }, 10*i);
            
        }
        setGrid(newGrid)
    }
    
    return (
        <div className="total">
        <div className="button">
        <button className="visualize-button" onClick={(e)=>visualizeDijkstra(e)
        }>
            Visualize Dijkstra
        </button>
        <button className="visualize-button" onClick={()=>buildWall()}>Create Maze</button>
        <button className="visualize-button" onClick={()=>clearGrid()}>Clear Grid</button>
        <button className="visualize-button" onClick={()=>clearPath()}>Clear Path</button>
        </div>
        <div className="grid">
        {
        grid.map( (row, rowIdx) => {
            return (
              <div key={rowIdx}>
                  
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall,weight} = node
                  return (
                      
                    <Node
                      weight={weight}
                      
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      row={row}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row,col)=>handleMouseDown(row,col)}
                      onMouseEnter={(row,col)=>handleMouseEnter(row,col)}
                      onMouseUp ={() => handleMouseUp()}
                      
                      ></Node>
                      
                  )
                })}
                
                </div>  )
        })}
        </div>
        
    </div>)
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
const createGridWithWall = (wall) => {
    const grid = []
    for(let row =0;row<20;row++){
        const currentRow = []
        for(let col=0; col<50;col++){
            currentRow.push(createNodeWithWall(row,col,wall))
        }
        grid.push(currentRow)
    }
    
    return grid;
}

const createNodeWithWall = (row,col,wall)=>{
    for(let i=0;i<wall.length;i++) {
        const node = wall[i]
        if(row==node.row&& col==node.col){
            return {
                row,
                col,
                isWall:true,
                isVisited: false,
                previousNode: null,
                distance: Infinity,
                weight:1,
                isStart: row === START_NODE_ROW && col === START_NODE_COL,
                isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL
            }
        }
    }
    return createNode(row,col)
}

const createNode = (row,col) => {
    return {
        row,
        col,
        isWall:false,
        isVisited: false,
        previousNode: null,
        distance: Infinity,
        weight:1,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL
    }
}

const getNewGridWithWallToggled = (grid, row, col,wall,setWall) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    
    if(node.weight !== 15) {
    var newNode = {
        
      ...node,
      isWall: !node.isWall,
    };
}else {
    var newNode = {
        
        ...node,
    }
}
    newGrid[row][col] = newNode;
    if(!node.isWall) 
    {
        wall = wall.filter(ele => ele.row!=node.row || ele.col != node.col)
        setWall([...wall,newNode])
    }
    else{
        
        setWall(wall.filter((ele)=>ele.row!=node.row || ele.col != node.col))
        
        
    }


    return newGrid;
  };

const getNewGridWithWeightToggled = (grid, row, col,weight,setWeight) => {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    if(node.weight === 1 && !node.isWall){
    var newNode = {
        ...node,
        weight: 15,
      };
    }else {
        var newNode =  {
            ...node,
            weight: 1,
        }
    }
      newGrid[row][col] = newNode;
      if(newNode.weight === 15) 
      { 
          setWeight([...weight,newNode])
      }
      else{
          setWeight(weight.filter((ele)=> ele.row!=node.row || ele.col != node.col))
      }
  
  
      return newGrid;


}


export default PathFindingVisualizer
