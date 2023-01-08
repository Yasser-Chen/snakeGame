const   resolusion = 10 ,
        speed = 100 ,
        game = document.getElementById('game');

var majNextMove = function (e) {
    switch (e.key) {
        case 'ArrowRight':
            if(direction!=3){
                direction = 1 ;
            }
            break;
        case 'ArrowDown':
            if(direction!=4){
                direction = 2 ;
            }
            break;
        case 'ArrowLeft':
            if(direction!=1){
                direction = 3 ;
            }
            break;
        case 'ArrowUp':
            if(direction!=2){
                direction = 4 ;
            }
            break;
    }
    document.querySelector('body').onkeydown = ()=>{};
};

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const rndInt = () =>  randomIntFromInterval(0, resolusion-1) ;

var gameCashedSquares = new Array() ;
for (let i = 0; i < resolusion ; i++) {

    let row = document.createElement('div'),
    miniArray = [];
    
    for (let j = 0; j < resolusion ; j++) {
        let column = document.createElement('div');
        column.classList.add("square");
        row.appendChild(column);
        miniArray [j] = column ;
    }
    gameCashedSquares[i] = miniArray;
    game.appendChild(row);
}

var snake = [] ,
    x = parseInt(resolusion/2)  ,
    y = x                       ,
    foodX = 1                   ,
    foodY = 1                   ,
    direction = 1               ; // 1 - 2 - 3 - 4 | 'right' | 'down' | 'left' | 'top'


function draw() {
    for (let i = 0; i < resolusion ; i++) {
        for (let j = 0; j < resolusion ; j++) {
            gameCashedSquares[i][j].classList.remove('food');
            gameCashedSquares[i][j].classList.remove('snake');
            gameCashedSquares[i][j].classList.remove('snake-head');
        }
    }

    for (const square of snake) {
        gameCashedSquares[square.x][square.y].classList.add('snake');
    }

    gameCashedSquares[foodX][foodY].classList.add('food');
    gameCashedSquares[x][y].classList.add('snake-head');
}

function isautoDestruct(){
    for (const square of snake) {
        if(square.x == x && square.y == y){
            return true ;
        }
    }
    return false ;   
}


const frames = setInterval(() => {

    if(foodX==x&&foodY==y){
        gameCashedSquares[foodX][foodY].classList.remove('food');
        foodX = rndInt();
        foodY = rndInt();
    }else{
        snake.pop();
    }
    
    snake.filter(n => n)     ;
    snake.unshift({x:x,y:y}) ;

    switch (direction) {
        case 1:
            x = (x+1)%resolusion ;
            break;
        case 2:
            y = (y+1)%resolusion ;
            break;
        case 3:
            x = (resolusion + x-1)%resolusion ;
            break;
        case 4:
            y = (resolusion + y-1)%resolusion ;
            break;
    }

    document.querySelector('body').onkeydown = majNextMove ;

    
    if(isautoDestruct()){
        clearInterval(frames);
        alert("GAME OVER");
        window.location.reload();
    }
    draw();

}, speed);
