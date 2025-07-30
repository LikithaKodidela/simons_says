let gameSeq=[];
let userSeq=[];

let btns=["red","yellow","green","blue"];
let started=false;
let level=0;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.getElementById("high-score-display");
let startBtn = document.getElementById("start-btn");
//  Load high score from localStorage
let highScore = localStorage.getItem("highScore") || 0;
highScore = parseInt(highScore);
highScoreDisplay.innerText = `Highest Score: ${highScore}`;

//start game on button click
startBtn.addEventListener("click", function () {
  if (!started) {
    started = true;
    levelUp();
    startBtn.style.display = "none";
  }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`#${randColor}`);
    
    gameSeq.push(randColor);
   
    gameFlash(randbtn);
}
function checkAns(idx){
    //console.log("curr level : ",level);

    if(userSeq[idx]=== gameSeq[idx])
    {
       if(userSeq.length==gameSeq.length){
         setTimeout(levelUp,1000);
       }
       
    }else{
       let message = `Game Over! Your score was <b>${level}</b><br>Click "Start Game " to try again.`;

    // Check and update high score
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
      highScoreDisplay.innerText = `Highest Score: ${highScore}`;
      message += `<br><b>🎉 New High Score!</b>`;
    }

    h2.innerHTML = message;

    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    reset();
   }
}
function btnPress(){
    if (!started) return;
    let btn=this;
    userFlash(btn);

    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
    startBtn.style.display = "inline-block";
}
