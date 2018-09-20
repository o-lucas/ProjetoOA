var map = [
    [1, 2, 0, 0],
    [0, 2, 0, 0],
    [0, 2, 2, 2],
    [0, 0, 0, 3],
];

var tileSize = 32;
var rows = map.length;
var cols = map[0].length;

var width = rows * tileSize;
var height = cols * tileSize;

var TileType = {
    WALL: 0,
    START: 1,
    PATH: 2,
    FINISH: 3
};

/*
* Definitivamente não foi uma boa ideia fazer isso usando canvas
* ohwell ¯\_(ツ)_/¯
* perdoe-me por quaisquer erros bobos, culpo o cansaço
*/
function drawMap(){
    let canvas = document.getElementById('game');
    let ctx = canvas.getContext('2d');

    for(var i = 0; i < rows; ++i){
        for(var j = 0; j < cols; ++j){
            switch(map[j][i]){
                case 0:
                    ctx.fillStyle = "#2c5b19";
                    break;
                case 1:
                case 2:
                    ctx.fillStyle = "#543825";
                    break;
                case 3:
                    ctx.fillStyle = "#baa700";
                    break;
            }
            ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
    }
}

function drawPlayer(){
    let canvas = document.getElementById('game');
    let ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc((x * tileSize) + tileSize / 2, (y * tileSize) + tileSize / 2, 10, 0, 2 * Math.PI);
    ctx.stroke();
}

function getStartPosition(){
    for(var i = 0; i < rows; ++i){
        for(var j = 0; j < cols; ++j){
            if(map[i][j] === TileType.START)
                return {x: i, y: j};
        }
    }
    return -1;
}

function update(){
    drawMap();
    drawPlayer();

    if(map[y][x] === TileType.FINISH)
        alert("!!!");
}

function moveUp(){
    if(map[y - 1][x] > TileType.WALL){
        y --;
        update();
    }
}

function moveDown(){
    if(map[y + 1][x] > TileType.WALL){
        y ++;
        update();
    }
}

function moveLeft(){
    if(map[y][x - 1] > TileType.WALL){
        x --;
        update();
    }
}

function moveRight(){
    if(map[y][x + 1] > TileType.WALL){
        x ++;
        update();
    }
}

function reset(){
    x = 0;
    y = 0;
    update();
}

var startPosition = getStartPosition();
var x = startPosition.x;
var y = startPosition.y;

drawMap();
drawPlayer();
