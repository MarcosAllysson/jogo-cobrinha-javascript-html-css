let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; // 32 pixels cada quadrado
let snake = [];

snake[0] = {
    x: 8*box, //8 pra começar no meio
    y: 8*box
}

let direction = "right";
let food = {
    // comida vai aparecer em pontos aleatórios do quadrado do jogo
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// começar jogo
function criarBG(){
    context.fillStyle = "white"; //estilo
    context.fillRect(0, 0, 16*box, 16*box); //desenhar o tabuleiro do jogo
}

function criarCobrinha(){
    for (let i = 0; i < snake.length; i+=1){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// desenhando comida
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// evento ouvindo movimento 
document.addEventListener('keydown', update);

// movimento de direção da cobrinha
function update(event){
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

// funcao pra começar e atualizar jogo em interval
function iniciarJogo(){
    // nao permitir que a cobrinha atravesse parede
    if (snake[0].x > 15 * box && direction == "right"){
        snake[0].x = 0;
    }
    if (snake[0].x < 0 && direction == "left"){
        snake[0].x = 16*box;
    }
    if(snake[0].y > 15 * box && direction == "down"){
        snake[0].y = 0;
    }
    if(snake[0].y < 0 && direction == "up"){
        snake[0].y = 16*box;
    }

    // para jogo quando cobra se choca com proprio corpo
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            answer = prompt("Vixe, game over!\n Vou ser bonzinho, quer continuar jogando ainda (SIM ou NAO)?");
            if (answer == 'SIM' || answer == 'sim'){
                setInterval(iniciarJogo, 100);
            }
            // else{
            //     clearInterval(jogo);
            //     alert("Ok, se quiser reiniciar o jogo basta atualizar a página :D");
            // }
        }        
    }

    criarBG();
    criarCobrinha();
    drawFood();

    //setando posição X e Y pra cobrinha ter ponto de partida
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // várias condicionais pra locomoção da cobrinha
    if(direction == "right"){
        snakeX += box; // se for pra direita, adicionar 1 quadrado a mais
    }
    if(direction == "left"){
        snakeX -= box; // para esquerda, diminui
    }
    if(direction == "up"){
        snakeY -= box; // pra cima
    }
    if(direction == "down"){
        snakeY += box; //pra baixo
    }

    // aumentar cobrinha quando comer 
    if (snakeX != food.x || snakeY != food.y){
        // função pop() pra retirar último elemento do array
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// jogo renovado a cada 100 mili segundos
let jogo = setInterval(iniciarJogo, 100);