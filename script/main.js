// GLOBAL VARIABLES

const mainScreen = document.querySelector("#main-screen");
const startBtn = document.querySelector("#start-btn");

const gameOverScreen = document.querySelector("#game-over");
const restartBtn = document.querySelector("#restart-button");

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

  // CREATE THE OBJECT

  newLevel1 = new Level1();

  // RECURSION

  newLevel1.gameLoop();
};

// EVENTS

startBtn.addEventListener("click", startGame);

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
});
