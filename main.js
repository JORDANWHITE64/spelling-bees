
//classes 




class spellingBeesSystem{

constructor(){

    this.games=new Map();


}


//add player takes the users name 

addPlayer(roomCode, playerName) {
    //checks  for blank name
    if (playerName.trim() === "") {
        alert("please enter a name");
        return null;
    }

    const game = this.games.get(roomCode);
//checks if roomcode exists
    if (!game) {
        alert("room does not exist");
        return null;
    }

//checks that the users name is not already being used in this lobby 
    const exists = game.players.some(p => p.getName() === playerName);
    if (exists) {
        alert("name already taken");
        return null;
    }
// create new player 
    const player = new Player(playerName);

    //add player to game
    game.players.push(player);

    return player;
}

generateRoomCode(){

    //this creates a random number for the room
         let min=100;
         let max=998;
    min = Math.ceil(min);
    max = Math.floor(max);

     let code=Math.floor(Math.random() * (max - min + 1)) + min;

     for( const[roomcode ,Game] of  this.games){
        if(code==roomcode){
             return this.generateRoomCode();
        }

    

     }

    return code;

    }


    checkAnswers(answer, timeleft,player,game){
        //converts guess to lowercase and checks the guess against the actual answer
    if(answer.toLowerCase()===game.questions[game.currentQuestionIndex].word.toLowerCase()){

        //if asnwer correct add score to player
        let score=100*timeleft;
        player.addScore(score);
        //take the user to the correct screen
        showscreen("correct-screen");
        document.getElementById("scorebox").innerText= player.score;
        setTimeout(()=>{
            //wait and then take the player to the waiting screen
showscreen("waitScreen");
        },3000);


    }

    else{
        // take the user to the wrong screen
        showscreen("wrong-screen");
        //tell the user how the word should have been spelled
        document.getElementById("wrongbox").innerText=game.questions[game.currentQuestionIndex].word;
         setTimeout(()=>{
            showscreen("waitScreen");
        },3000);

    }

    }
        

    creategame(settings) {
        //this creates a game using the setting that were decided in the create game section of the html
    const roomCode = this.generateRoomCode();

    const game = new Game(
        settings.numberOfQuestions,
        settings.time,
        settings.difficulty,
        settings.audioselect,
        roomCode
    );

    this.games.set(roomCode, game);

    document.getElementById("room-code").innerText = roomCode;

    return game;
}

}


//player class 

class Player{

    constructor(name,bot){
        this.playerName=name;
         this.score=0;
         this.timeLeftOnCurrentQ;
         this.bot=bot;
    }


//returns player name
    getName(){
        return this.playerName;
    }

//return player score
    getScore(){
        return this.score;

    }
//add score to player
    addScore(x){
        this.score+=x;
    }
}


//game class

class Game{


    constructor(numberOfQuestions,time,difficulty,audioselect, roomCode){
        this.numberOfQuestions=Number(numberOfQuestions);
        this.time=Number(time);
        this.difficulty=difficulty;
        this.audioselect=audioselect;
        this.roomcode=roomCode;
        this.allQuestions =this.determineDifficulty(difficulty);
        this.shuffleQuestions();
        this.questions=this.allQuestions.slice(0,Math.min(this.numberOfQuestions,this.allQuestions.length))
       
        
        this.players=[];
        this.currentQuestionIndex=0;
        this.peopleFinished=0;

        this.timerInterval=null;
        this.currentTimeLeft=0;


       

        
    


    }

//this method shuffles the questions for the game it is used to make sure that the game has a chance to go through different questions
//it is known as a fisher yates shuffle
    shuffleQuestions(){
for(let i =this.allQuestions.length -1; i>0; i--){
    const  j =Math.floor(Math.random()*(i+1));
    [this.allQuestions[i],this.allQuestions[j]] =[this.allQuestions[j],this.allQuestions[i]];
}

    }
//this method will take the difficulty chosen ealier and load questions of that difficulty to be used into the game
    determineDifficulty(difficulty){
            if(difficulty==="level1"){
                return[
                    //placeholder names
                   new Question("apple", new Audio("audio/difficultyone/apple.m4a")),
                   new Question("bed", new Audio("audio/difficultyone/bed.m4a")),
                   new Question("big", new Audio("audio/difficultyone/big.m4a")),
                   new Question("car", new Audio("audio/difficultyone/car.m4a")),
                   new Question("cat", new Audio("audio/difficultyone/cat.m4a")),
                   new Question("dog", new Audio("audio/difficultyone/dog.m4a")),
                   new Question("good", new Audio("audio/difficultyone/good.m4a")),
                   new Question("home", new Audio("audio/difficultyone/home.m4a")),
                   new Question("hot", new Audio("audio/difficultyone/hot.m4a")),
                   new Question("left", new Audio("audio/difficultyone/left.m4a")),
                   new Question("pig", new Audio("audio/difficultyone/pig.m4a")),
                   new Question("play", new Audio("audio/difficultyone/play.m4a")),
                   new Question("red", new Audio("audio/difficultyone/red.m4a")),
                   new Question("six", new Audio("audio/difficultyone/six.m4a")),
                   new Question("stop", new Audio("audio/difficultyone/stop.m4a")),
                   new Question("toy", new Audio("audio/difficultyone/toy.m4a")),
                   new Question("was", new Audio("audio/difficultyone/was.m4a")),
                   new Question("you", new Audio("audio/difficultyone/you.m4a")),

                ];


            }
            if(difficulty==="level2"){
                return[ 
                    //placeholder names
                new Question("bike",new Audio("audio/difficultytwo/bike.m4a")),
                new Question("boat",new Audio("audio/difficultytwo/boat.m4a")),
                 new Question("clean",new Audio("audio/difficultytwo/clean.m4a")),
                  new Question("cold",new Audio("audio/difficultytwo/cold.m4a")),
                   new Question("deep",new Audio("audio/difficultytwo/deep.m4a")),
                    new Question("door",new Audio("audio/difficultytwo/door.m4a")),
                     new Question("dress",new Audio("audio/difficultytwo/dress.m4a")),
                      new Question("duck",new Audio("audio/difficultytwo/duck.m4a")),
                       new Question("farm",new Audio("audio/difficultytwo/farm.m4a")),
                        new Question("fast",new Audio("audio/difficultytwo/fast.m4a")),
                         new Question("flag",new Audio("audio/difficultytwo/flag.m4a")),
                          new Question("floor",new Audio("audio/difficultytwo/floor.m4a")),
                           new Question("foot",new Audio("audio/difficultytwo/foot.m4a")),
                            new Question("funny",new Audio("audio/difficultytwo/funny.m4a")),
                             new Question("game",new Audio("audio/difficultytwo/game.m4a")),
                              new Question("grass",new Audio("audio/difficultytwo/grass.m4a")),
                                new Question("hand",new Audio("audio/difficultytwo/hand.m4a")),
                                 new Question("happy",new Audio("audio/difficultytwo/happy.m4a")),
                                  new Question("hill",new Audio("audio/difficultytwo/hill.m4a")),
                                   new Question("long",new Audio("audio/difficultytwo/long.m4a")),
                                    new Question("milk",new Audio("audio/difficultytwo/milk.m4a")),
                                     new Question("name",new Audio("audio/difficultytwo/name.m4a")),
                                      new Question("need",new Audio("audio/difficultytwo/need.m4a")),
                                       new Question("page",new Audio("audio/difficultytwo/page.m4a")),
                                        new Question("sheep",new Audio("audio/difficultytwo/sheep.m4a")),
                                         new Question("shoe",new Audio("audio/difficultytwo/shoe.m4a")),
                                          new Question("spell",new Audio("audio/difficultytwo/spell.m4a")),
                                           new Question("story",new Audio("audio/difficultytwo/story.m4a")),
                                            new Question("take",new Audio("audio/difficultytwo/take.m4a")),
                                             new Question("talk",new Audio("audio/difficultytwo/talk.m4a")),
                                              new Question("boat",new Audio("audio/difficultytwo/boat.m4a")),
                                               new Question("teach",new Audio("audio/difficultytwo/teach.m4a")),
                                                new Question("train",new Audio("audio/difficultytwo/train.m4a")),
                                                 new Question("white",new Audio("audio/difficultytwo/white.m4a")),
                                                  new Question("who",new Audio("audio/difficultytwo/who.m4a")),
                                                   new Question("yellow",new Audio("audio/difficultytwo/yellow.m4a")),

                                    
                                    
                                    
                            ];
            }


            return [];
    }


  

//this starts the timer  for the game
    startTimer(){
        this.peopleFinished=0;
        this.currentTimeLeft =this.time;



        document.getElementById("timer").innerHTML=this.currentTimeLeft;
        this.timerInterval=setInterval(() =>{
             this.currentTimeLeft--;
            document.getElementById("timer").innerText=this.currentTimeLeft;


    
    
  

                if(this.currentTimeLeft<=0){
                    this.stopTimer();
                    this.timeUp();
            
               }
                

            

                
        },1000);


        }
//this stops the timer for the game
        stopTimer(){
            if(this.timerInterval){

            clearInterval(this.timerInterval);
            this.timerInterval=null;
            
            }
        }
//this is used if the user runs out of time it will check there answers for them and move them to the next part of the game
        timeUp(player){
            alert("time up")
const answer=document.getElementById("guess").value;
system.checkAnswers(answer,this.currentTimeLeft,player,this);
            this.peopleFinished++;
            this.scorebot();
          
            setTimeout(() => {
        this.checkAllFinished();
    }, 5000);

        }
//this method is used when a player submits there answer
        handleSubmit(player){

            this.stopTimer();

        const answer=document.getElementById("guess").value;
    
system.checkAnswers(answer,this.currentTimeLeft,player,this);
            
            
              this.peopleFinished++;
              this.scorebot();
              setTimeout(() => {
        this.checkAllFinished();
    }, 5000);
              

        }

        
    



        checkAllFinished(){
            //this method is used to heck that all players have completed the current question this will allow the game to move on to the leaderboard without leaving anyone behind


            this.players.forEach(player =>{
                if(player.bot==true){
                    this.peopleFinished++

                }
            })


            if(this.peopleFinished>=this.players.length){
                showscreen("leaderboard");
                this.displayLeaderBoard();

                setTimeout(()=> {
                    this.nextQuestion();
                },5000);
            }
        }

// this method is used for the leaderboard to sort the players in order of score
sortPlayerByHighScore(){
this.players.sort((a,b) => b.getScore() - a.getScore());
}


//this method inserts html code into the game to add each player to the screen to show their score
displayLeaderBoard(players){
    
    var list=document.getElementById("leaderboard-list");
    list.innerHTML="";


    this.sortPlayerByHighScore();


    this.players.forEach(player => {
var li = document.createElement("div");
var h2=document.createElement("h2");
list.appendChild(li);
li.appendChild(h2);

        h2.textContent= player.getName() + " score: " + player.getScore();
        
    })
        

        



    

}
//this method starts a question by starting the timer playes the audio and displays the question number out of the total questions
startQuestion(){

    this.startTimer();
     this.playAudio();
     document.getElementById("current-question").innerText = this.currentQuestionIndex + 1;
document.getElementById("qscreen-num-of-questions").innerText = this.numberOfQuestions.toString();
document.getElementById("guess").value="";
    

}
// this method is soley responisble for playing the current questions audio
playAudio(){
    var audio = this.questions[this.currentQuestionIndex].getAudio();

    audio.play();
}

// this is used to increment the question number so that the question will play the next audio when start question is called again
nextQuestion(){
    this.currentQuestionIndex++;



    if(this.currentQuestionIndex>=this.numberOfQuestions){

        showscreen("results-screen");
        this.populateResults();
    }

    else{

        
        showscreen("question-screen");
        this.startQuestion();
        
        

    }
}


//returns room code
    getRoomCode(){
        return this.roomcode;
    }

//this method is used to display the top three players at the end of the game if there is less than three players the headers are left blank
    populateResults(){
        document.getElementById("first-place-name").innerText=this.players[0].getName() || "";
        document.getElementById("first-place-score").innerText=this.players[0].getScore() || "";



          document.getElementById("second-place-name").innerText=this.players[1].getName()|| "";
        document.getElementById("second-place-score").innerText=this.players[1].getScore() || "";


          document.getElementById("third-place-name").innerText=this.players[2].getName()|| "";
        document.getElementById("third-place-score").innerText=this.players[2].getScore()|| "";
    }
    


//this code is used to show pictures and names of each player in the game to show visually how many players are in a lobby
    populateLobby(){
                   var list=document.getElementById("player-list-flex");
    list.innerHTML="";


   

// for every player that exists in the lobby
    this.players.forEach(player => {
//create there own player section
        var div=document.createElement("DIV");

        div.className="player-section";
//make a bee image for the player
        var img=document.createElement("img");

        img.className="bee-character";
        img.src="/images/bee1new.png";
        img.alt="bee character image"
// add there nameunderneath the image

        var p=document.createElement("p");
         p.className="player-name";
//add the image and name to the player section div
        div.appendChild(img);
        div.appendChild(p);
//add the div to the player list flex
        list.appendChild(div);
       


        // set name as player name
        p.textContent=player.getName();
   
    })
}


scorebot(){
this.players.forEach(player=> {
    if(player.bot==true){
        if(Math.random() *100 <45){
            const randNum=Math.random()*100;
            if(randNum<25){
                player.addScore(200);
            }
            else if(randNum<50){
                player.addScore(400);

            }
            else if(randNum<75){
                player.addScore(500);
            }
            
            else{
                player.addScore(600);
            }
}

        }
    })
}
}





    class Question{
        
        constructor(word,audio){
            this.word=word;
            this.audio=audio;
            
        }
        //returns the audio for the question
            getAudio(){
                return this.audio;
            }
    }






// creates new spelling bee system
const system = new spellingBeesSystem();
let currentGame=null;
let currentPlayer=null;


// this function is used to show screens as all of the screens are held in one html file this code is used to only show the current screen
function showscreen(id){
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");

    });
    document.getElementById(id).classList.add("active");

}

// these get the ids of all the buttons so theat they can be used throughout the code and for listeners 
const joinbtn=document.getElementById("join-button");
const createbtn=document.getElementById("create-room-button");
const submitbtn=document.getElementById("submit-answer");
const startbtn=document.getElementById("start-game");
const backtolobbybtn=document.getElementById("backtolobby");
const readyupbtn=document.getElementById("readyup");

const returnhometeacherbtn=document.getElementById("returnhometeacher");
const finishcreatebtn=document.getElementById("create-game-button");
const playagainbtn=document.getElementById("play-again");


    //this triggers the handle submit method
         submitbtn.addEventListener("click",()=>{currentGame.handleSubmit(currentPlayer)
            
    });

// this listener takes the inputted data and tries to add a player to the lobby
joinbtn.addEventListener("click",()=>{   
    
    const playerName=document.getElementById("name-input").value;
    const roomCode=Number(document.getElementById("code-input").value);

    const player= system.addPlayer(roomCode, playerName);

    if(player){
        currentGame=system.games.get(roomCode);
        currentPlayer=player;
        showscreen("lobby-screen-teacher");
        document.getElementById("room-code").innerHTML=currentGame.getRoomCode();
  
        currentGame.populateLobby();
    }
   
});

// this takes users to the create game section where they can make settings 
createbtn.addEventListener("click",()=>{    
    showscreen("create-game");
});

//this listener plays the audio for the question again
playagainbtn.addEventListener("click",()=>{

    currentGame.playAudio();
})

//this listener starts. the game
startbtn.addEventListener("click",()=>{    
    
    
    showscreen("question-screen");
    currentGame.startQuestion();
});
// this button is used to go back to the lobby after completing a game
backtolobbybtn.addEventListener("click",()=>{    showscreen("lobby-screen-teacher");
});
//this is used for players to ready up but for just now it is being used to start the question in the join screen
readyupbtn.addEventListener("click",()=>{    showscreen("question-screen");
});



//this takes the teacher back to the lobby screen
returnhometeacherbtn.addEventListener("click",()=>{    

//this lone is uded to remove the player from the game after they had left the game
  currentGame.players = currentGame.players.filter(player => player !==currentPlayer);

  if(currentGame.players.length===0){
    system.games.delete(currentGame.getRoomCode());
  }


  currentPlayer=null;
  currentGame=null;

showscreen("join-screen");


  
});
// this is used to create a game using the settings made by the host
finishcreatebtn.addEventListener("click",()=>{    showscreen("lobby-screen-teacher");

    const numOfQuestions=document.getElementById("num-of-questions").value;
    const time=document.getElementById("time-per-question").value;
    const difficulty=document.getElementById("difficulty").value;
    const audioSelect=document.getElementById("audio-select").value;


    //add to check if there is a negative or decimal and to check wether it can be a number

//   if(numOfQuestions==""){
//         alert("please enter a number of questions");
//         return;
//     }

//     if(time==""){
//         alert("please enter a time");
//         return;


//     }

    


    const settings={
        numberOfQuestions:numOfQuestions,
        time:time,
        difficulty:difficulty,
        audioselect:audioSelect
    }

     currentGame=system.creategame(settings);

// this adds thehost player to the game so it can be tested in fully working version host score will not count on leaderboards
     const hostPlayer = new Player("host",false);
     currentGame.players.push(hostPlayer);
     currentPlayer=hostPlayer;
     showscreen("lobby-screen-teacher");
     currentGame.populateLobby();
    
});


//this is a test game game created to check that functions. work as the game is not multiplayer yet
const player1 = new Player("beeboy",true);
const player2 = new Player("honeycomb",true);
const player3 = new Player("ian",true);
const player4 = new Player("billybumble",true);

const testgame = new Game(2,15,"level1","both","111");

testgame.players.push(player1,player2,player3,player4);

system.games.set(111,testgame);




































