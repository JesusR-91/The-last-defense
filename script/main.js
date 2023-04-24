// GLOBAL VARIABLES

const mainScreen = document.querySelector("#main-screen");
const startBtn = document.querySelector("#start-btn");

const gameOverScreen = document.querySelector("#game-over");
const restartBtn = document.querySelector("#restart-button");

const volumBtn = document.querySelector("#sound")

// const count = document.querySelector("#counter span");

const canvas = document.querySelector("#level1");
const ctx = canvas.getContext("2d");


// MUSIC 

// INTRO-SONG
const song1 = document.createElement("audio");
song1.src = "Music/Intro.mp3";
song1.setAttribute("preload", "auto");
document.body.appendChild(song1);
song1.volume -= 0.9;
song1.autoplay = true;
song1.loop = true;


//LEVEL 1 SONG

const song2 = document.createElement("audio");
song2.src = "Music/level1.mp3";
song2.setAttribute("preload", "auto");
document.body.appendChild(song2);
song2.volume -= 0.9;
song2.autoplay = true;
song2.loop = true;
song2.pause();




// const canvas2 = document.querySelector("#level2");
// const ctx2 = canvas1.getContext("2d");

// const canvas3 = document.querySelector("#level3");
// const ctx3 = canvas1.getContext("2d");

let newLevel1;

// FUNCTIONS

  const startGame = () => {

  // CHANGE SCREENS

  mainScreen.style.display = "none";
  canvas.style.display = "block";
  song1.pause();
  song2.play();

// CREATE THE OBJECT

  newLevel1 = new Level1();

  setInterval(()=>{
    newLevel1.enemyArray.forEach((enemy)=>{
      if (enemy.isShooting === true) {
        enemy.isShooting = false;
      } else {
        enemy.isShooting = true;
      }
    });

  }, 1500);

  // RECURSION

  newLevel1.gameLoop();
};

const restart = ()=>{

  gameOverScreen.style.display = "none";
  canvas.style.display = "block";
  newLevel1 = new Level1();
  newLevel1.gameLoop();

}

const volBtn = () =>{
  if ((volumBtn.innerHTML === `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`) && (song1.paused === false) && (mainScreen.style.display = "flex")) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>`;
    console.log("probando")
    song1.pause();
  } 
  else if ((volumBtn.innerHTML === `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`) && (song2.paused === false)&& (mainScreen.style.display = "none")) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>`;
    song2.pause();

  } 
  else if ((volumBtn.innerHTML === `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>`) && (song1.paused === true) && (mainScreen.style.display === "flex")) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`;
    song1.play();

  } 
  else if ((volumBtn.innerHTML === `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>`) && (song2.paused === true) && (mainScreen.style.display = "none")) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`;
    song2.play();

  }
}


// EVENTS

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", restart);

volumBtn.addEventListener("click", volBtn)

window.addEventListener("keydown", (event) => {
  if (
    (event.code === "ArrowUp" ||
      event.code === "ArrowDown" ||
      event.code === "ArrowLeft" ||
      event.code === "ArrowRight") &&
    newLevel1.isGameOn === true
  ) {
    newLevel1.spaceship.movement(event);
  }

  if (newLevel1.isGameOn === true && event.code === "Space"){
    newLevel1.spaceship.shoot(event);
  }
});
