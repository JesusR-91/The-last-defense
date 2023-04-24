// GLOBAL VARIABLES

const mainScreen = document.querySelector("#main-screen");
const startBtn = document.querySelector("#start-btn");

const gameOverScreen = document.querySelector("#game-over");
const restartBtn = document.querySelector("#restart-button");

const count = document.querySelector("#counter span");

const canvas = document.querySelector("#level1");
const ctx = canvas.getContext("2d");

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
  // count.style.display = "flex";

  // CREATE THE OBJECT

  newLevel1 = new Level1();


  //TODo no funciona
  // setInterval(()=>{
  //   newLevel1.asteroidSpawn();
  //   console.log("probando")
  // }, 5000);

  // // console.log(newLevel1.asteroidArray)

  // newLevel1.asteroidArray.forEach((asteroid) =>{
  //   asteroid.draw();
  // })

  // RECURSION

  newLevel1.gameLoop();
};

const restart = ()=>{

  gameOverScreen.style.display = "none";
  canvas.style.display = "block";
  newLevel1 = new Level1();
  newLevel1.gameLoop();

}


// EVENTS

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", restart);

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
