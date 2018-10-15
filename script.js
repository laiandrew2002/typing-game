//window.addEventListener("load", wordInput.focus());

const levels = {
    easy:7,
    medium:5,
    hard:3
}
let currentLevel = levels.medium;

//Global Variables
let time = currentLevel;
let score = 0;
let isPlaying;
var timer;

//DOM Element
const wordInput = document.getElementById("word-input");
const currentWord = document.getElementById("current-word");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("start");
const second = document.getElementById("seconds");
const message = document.getElementById("message");
const highscoreDisplay = document.getElementById("highscore");

const words = [
    'acceptable',
    'eminent',
    'gabby',
    'books',
    'holistic',
    'thanks',
    'parameter',
    'lettuce',
    'tasteful',
    'avoid',
    'plant',
    'muddle',
    'spray',
    'telling',
    'burger',
    'exotic',
    'soup',
    'awake',
    'twist',
    'pizza',
    'skillful',
    'tired',
    'knock',
    'daffy',
    'agonizing',
    'right',
    'peep',
    'cupcake',
    'ethereal',
    'location'
];

//Initialize Game
function init(){
    restart();
    //Load word from array
    showWord(words);
    //Start matching on words
    wordInput.addEventListener("input", startMatch);
    wordInput.focus();
    //Call countDown every second
    clearInterval(timer);
    timer = setInterval(countDown, 1000);
    //Check Game Status
    setInterval(checkStatus,50);
}

function restart(){
    isPlaying=true;
    time = currentLevel;
    message.innerHTML = "-------";
    score = 0;
    scoreDisplay.innerHTML=score;
    wordInput.value="";
   
}

function startMatch(){
    if(matchWords()){
        isPlaying===true;
        time = currentLevel;
        score++;
       showWord(words);
       wordInput.value="";
       //Difficulty Increase
       switch(score){
           case 10:
           currentLevel--;
           break;
           case 20:
           currentLevel--;
           break;
           case 30:
           currentLevel--;
           break;
           case 40:
           currentLevel--;
           break;
       }
       //Store Highscore
       let highscore = localStorage.getItem("highscore");
        if(highscore !== null){
            
            if (score >= highscore) {
                highscore = score;
                localStorage.setItem("highscore", highscore);  
            }
        }
        else{
                highscore = score;
                localStorage.setItem("highscore", highscore);
               
        }
        highscoreDisplay.innerHTML = highscore;
            
    }
    

    if(score===-1){
        scoreDisplay.innerHTML="0";
    }else{
        scoreDisplay.innerHTML=score;
    }
}

function matchWords(){
    if(wordInput.value.toLowerCase() === currentWord.innerHTML){
        message.innerHTML ="Correct"
        return true;
    }else{
        message.innerHTML="-----";
        return false;
    }
}

function showWord(words){
    //Generate random index
    const randomIndex = Math.floor(Math.random()*words.length);
    currentWord.innerHTML=words[randomIndex];
}

function countDown(){
    //Make sure time do not run out
    if(time>0){
        time--;
    }else if(time === 0){
        isPlaying=false;
    }
    timeDisplay.innerHTML=time;
}

function checkStatus(){
    if(isPlaying===false && time=== 0){
        message.innerHTML="Game Over!";
        startBtn.innerHTML="Restart";
        // score = 0;
    }
}

startBtn.addEventListener("click", init);
