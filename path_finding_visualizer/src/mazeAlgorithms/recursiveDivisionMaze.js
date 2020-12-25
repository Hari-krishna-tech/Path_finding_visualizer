

const walls = []
let grid = []

export const recursiveDivisionMaze = (board) => {
  walls.splice(0,walls.length)
  console.log(board)
    
    grid = board

    addOuterWalls(grid);
    
    addInnerWalls(false, 1, grid[0].length - 2, 1, grid.length - 2);
    return walls;
}

function addOuterWalls(grid) {
    for (var i = 0; i < grid.length; i++) {
        if (i == 0 || i == (grid.length - 1)) {
            for (var j = 0; j < grid[0].length; j++) {
                walls.push(grid[i][j])
            }
        } else {
            if(!grid[i][0].isStart && !grid[i][0].isFinish) walls.push(grid[i][0]);
            if(!grid[i][grid[0].length - 1].isStart && !grid[i][grid[0].length - 1].isFinish) walls.push(grid[i][grid[0].length - 1]) 
        }
    }
}



function addInnerWalls(h, minX, maxX, minY, maxY) {
    if (h) {

        if (maxX - minX < 2) {
            return;
        }

        var y = Math.floor(randomNumber(minY, maxY)/2)*2;
        addHWall(minX, maxX, y);

        addInnerWalls(!h, minX, maxX, minY, y-1);
        addInnerWalls(!h, minX, maxX, y + 1, maxY);
    } else {
        if (maxY - minY < 2) {
            return;
        }

        var x = Math.floor(randomNumber(minX, maxX)/2)*2;
        addVWall(minY, maxY, x);

        addInnerWalls(!h, minX, x-1, minY, maxY);
        addInnerWalls(!h, x + 1, maxX, minY, maxY);
    }
}

function addHWall(minX, maxX, y) {
    var hole = Math.floor(randomNumber(minX, maxX)/2)*2+1;

    for (var i = minX; i <= maxX; i++) {
        if (i != hole && !grid[y][i].isFinish && !grid[y][i].isStart) {
          walls.push(grid[y][i])
        }
        
    }
}

function addVWall(minY, maxY, x) {
    var hole = Math.floor(randomNumber(minY, maxY)/2)*2+1;

    for (var i = minY; i <= maxY; i++) {
        if (i != hole && !grid[i][x].isFinish && !grid[i][x].isStart ) {
          walls.push(grid[i][x]);
        }
        
    }
}

const getOreintation = (w,h) => {
  return w>h;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


    

