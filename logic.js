console.log("starts");
const currentPlayer = document.querySelector(".current-player");
const boxContainer = document.querySelector(".box-container");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".new-game");
const winningTxt = document.querySelector("#winnerTxt");


let cPlayer;
let gameGrid;
function initGame(){
    //initial player
    cPlayer="X";
    // game entering posiitions data 
    gameGrid =["","","","","","","","",""];
    //winning possitions
    // const winningPositions = [
    //     [1,2,3],
    //     [4,5,6],
    //     [7,8,9],
    //     [1,4,7],
    //     [2,5,8],
    //     [3,6,9],
    //     [1,5,9],
    //     [3,5,7]
    // ]

    //we have to show it on ui also...
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    });
    newGameBtn.classList.remove("active");
    currentPlayer.innerText=`Current player - ${cPlayer}`;
}

//starting game
initGame();

//function for swaping players
function swap(){
    if(cPlayer === "X"){
        cPlayer = "O";
    }
    else{
        cPlayer="X";
    }
    currentPlayer.innerText=`Current player - ${cPlayer}`;
}


//check if the game is over or you have to play more
function checkGameOver(){

    //Thanks to piyush garg (yt)
    //winning logic very simple.
    //if any of the given positions have equal value and that is not empty then that 
    //will be considerd as winning possition.
    //Note : we are taking values from game grid which is being made by the user input 
    //we are not interrating on winning positions .
    if(
        (gameGrid[0]!="" && gameGrid[0]==gameGrid[1]&&gameGrid[1]==gameGrid[2]) ||
        (gameGrid[3]!="" && gameGrid[3]==gameGrid[4]&&gameGrid[4]==gameGrid[5]) ||
        (gameGrid[6]!="" && gameGrid[6]==gameGrid[7]&&gameGrid[7]==gameGrid[8]) ||
        (gameGrid[0]!="" && gameGrid[0]==gameGrid[3]&&gameGrid[3]==gameGrid[6]) ||
        (gameGrid[1]!="" && gameGrid[1]==gameGrid[4]&&gameGrid[4]==gameGrid[7]) ||
        (gameGrid[2]!="" && gameGrid[2]==gameGrid[5]&&gameGrid[5]==gameGrid[8]) ||
        (gameGrid[0]!="" && gameGrid[0]==gameGrid[4]&&gameGrid[4]==gameGrid[8]) ||
        (gameGrid[2]!="" && gameGrid[2]==gameGrid[4]&&gameGrid[4]==gameGrid[6])
    )
    {
        //make visible the new game btn
        newGameBtn.classList.add("active");
        //make visible the winner
        winningTxt.classList.add("active");
        //shiwng the text of winner player
        winningTxt.innerText=`Winner is player ${cPlayer}`;
        winningTxt.classList.add('winning-text');
        
        //Thanks to CHATGPT
        // Creating an empty array to store the positions which have the same value in it
        // that means we are finding the exact position of the boxes from which the winner has won the game
        //We are doing this because we want to fill green backgroud color to the particuar boxes 
        let winningBoxes=[]; //the empty array

        //checking for every winning conditions again to get the index 
        if((gameGrid[0]!="" && gameGrid[0]==gameGrid[1]&&gameGrid[1]==gameGrid[2]) ){
            winningBoxes =[0,1,2] // if true store it 
        }
        else if(gameGrid[3]!="" && gameGrid[3]==gameGrid[4]&&gameGrid[4]==gameGrid[5]){
            winningBoxes =[3,4,5] // if true store it 
        }
        else if(gameGrid[6]!="" && gameGrid[6]==gameGrid[7]&&gameGrid[7]==gameGrid[8]){
            winningBoxes =[6,7,8] // if true store it 
        }
        else if (gameGrid[0]!="" && gameGrid[0]==gameGrid[3]&&gameGrid[3]==gameGrid[6]){
            winningBoxes =[0,3,6] // if true store it 
        }
        else if(gameGrid[1]!="" && gameGrid[1]==gameGrid[4]&&gameGrid[4]==gameGrid[7]){
            winningBoxes =[1,4,7] // if true store it 
        }
        else if (gameGrid[2]!="" && gameGrid[2]==gameGrid[5]&&gameGrid[5]==gameGrid[8]){
            winningBoxes =[2,5,8] // if true store it 
        }
        else if (gameGrid[0]!="" && gameGrid[0]==gameGrid[4]&&gameGrid[4]==gameGrid[8]){
            winningBoxes =[0,4,8] // if true store it 
        }
        else if (gameGrid[2]!="" && gameGrid[2]==gameGrid[4]&&gameGrid[4]==gameGrid[6]){
            winningBoxes =[2,4,6] // if true store it 
        }
        //now we have the winning boxe's indexes
        // now using for each loop to make the backgound green of the boxes
        winningBoxes.forEach(box =>{
            console.log( boxes[box]);
            //note: we have taken the index but we can't get html elements from this winningBoxes array
            //we have to use the "boxes" which is a collection of the html elements that are the boxes.
            // boxes[box] will give us the html element . CLG for better understanding
            boxes[box].classList.add("winning");
        })

        //for preventing the unnecessaary events
        boxes.forEach(box =>{
            box.style.pointerEvents="none";
        })
       
    }
    //logic if the game is draw
    //.some will iterate the whole array and find one value based on  the condition
    //it will return bollean value only
    // this statement says that  if there is no any element in the gamegrid which is === ""(empty) 
    // and if it came to this lines that means the above condition fails that means don't have any winner so it is a draw 
    else if(!gameGrid.some(element => element==="")){
        newGameBtn.classList.add("active");
        winningTxt.classList.add("active");
        winningTxt.classList.add("draw-txt");
        winningTxt.innerText=`It's a Draw!! start a new game`;
        boxContainer.classList.add("red-border");
    }

}

//to restart the game on clicking on newgame btn
function restart(){
    location.reload();
}

// function to handle the click on the game grid/borad
function handleClick(index){

    if(gameGrid[index]===""){
        boxes[index].innerText = cPlayer;
        gameGrid[index]=cPlayer;
        boxes[index].style.pointerEvents="none";
    }
    checkGameOver();
    swap();
    
}

//tterrating all the boxes using foreach .
boxes.forEach((box,index) => {
    box.addEventListener("click", ()=>{
        handleClick(index);
    });
});

// newgame btn taking callback restart ....
newGameBtn.addEventListener("click",restart)