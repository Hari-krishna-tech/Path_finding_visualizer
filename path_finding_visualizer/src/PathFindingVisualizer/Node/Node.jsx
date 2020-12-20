import React from 'react'
import './Node.css'

function Node(props){
    const {row, col, isFinish, isStart, isWall} = props
    const extraClassName = isStart?'start': isFinish?'finish':''
    return (
        <div 
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}>
            
        </div>
    )
}

export default Node
