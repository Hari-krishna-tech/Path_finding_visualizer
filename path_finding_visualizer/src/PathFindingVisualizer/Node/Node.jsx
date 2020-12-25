import React from 'react'
import './Node.css'

function Node(props){
    const {
        col,
        isFinish,
        isStart,
        isWall,
        onMouseDown,
        onMouseEnter,
        onMouseUp,
        row,
        weight,  
      } = props;
    const isWeight =  weight === 15
    const extraClassName = isStart?'start': isFinish?'finish':isWall?'wall':isWeight?'weight':''
    return (
        <div 
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        
        >

        </div>
    )
}

export default Node
