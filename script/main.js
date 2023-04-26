// GLOBAL VARIABLES

const mainScreen = document.querySelector("#main-screen");
const startBtn = document.querySelector("#start-btn");

mainScreen.style.display = "flex";

const gameOverScreen = document.querySelector("#game-over");
const restartBtn = document.querySelector("#restart-button");

const volumBtn = document.querySelector("#sound");

let count = document.querySelector(".count");
let countDOM = document.querySelector("#counter");

const canvas = document.querySelector("#level1");
const ctx = canvas.getContext("2d");

const highScoreDOM = document.querySelector("#highScoreList");
const highScoreList = document.querySelector("#highScores");

// MUSIC

// INTRO-SONG

const song1 = new Audio("Music/Intro.mp3");
song1.volume -= 0.9;
song1.preload = "auto";
song1.loop = true;

//LEVEL 1 SONG
const song2 = new Audio("Music/level1.mp3");
song2.volume -= 0.9;
song1.preload = "auto";
song2.loop = true;

//GAME OVER SONG

const song3 = new Audio("Music/game-over.mp3");
song3.volume -= 0.9;
song1.preload = "auto";
song3.loop = true;

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
  countDOM.style.display = "flex";
  song1.pause();

  if (
    volumBtn.innerHTML ===
    `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`
  ) {
    song2.play();
  }

  // CREATE THE OBJECT

  newLevel1 = new Level1();

  // Shooting intervasl
  setInterval(() => {
    newLevel1.enemyArray.forEach((enemy) => {
      if (enemy.isShooting === true) {
        enemy.isShooting = false;
      } else {
        enemy.isShooting = true;
      }
    });
    if (newLevel1.boss.isShooting === true) {
      newLevel1.boss.isShooting = false;
    } else {
      newLevel1.boss.isShooting = true;
    }
  }, 1500);

  // BOSS IMPLEMENTATIOn
  // setInterval(() => {
  //   if (newLevel1.boss === true) {
  //       enemy.isShooting = false;
  //   } else {
  //       enemy.isShooting = true;
  //   }
  // }, 1500);

  // RECURSION

  newLevel1.gameLoop();
};

const restart = () => {
  gameOverScreen.style.display = "none";
  canvas.style.display = "block";
  newLevel1 = new Level1();
  newLevel1.gameLoop();
  count.innerText = 0;
  song3.pause();

  if (
    volumBtn.innerHTML ===
    `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`
  ) {
    song2.play();
  }

  highScoreDOM.style.display = "none";
};

const volBtn = () => {
  if (
    volumBtn.innerHTML ===
      `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>` &&
    song1.paused === false &&
    mainScreen.style.display === "flex"
  ) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>`;
    song1.pause();
  } else if (
    volumBtn.innerHTML ===
      `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>` &&
    song2.paused === false &&
    canvas.style.display === "block"
  ) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>`;
    song2.pause();
  } else if (
    volumBtn.innerHTML ===
      `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>` &&
    song3.paused === false &&
    gameOverScreen.style.display === "flex"
  ) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>`;
    song3.pause();
  } else if (
    volumBtn.innerHTML ===
      `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>` &&
    song1.paused === true &&
    mainScreen.style.display === "flex"
  ) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`;
    song1.play();
  } else if (
    volumBtn.innerHTML ===
      `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>` &&
    song2.paused === true &&
    canvas.style.display === "block"
  ) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`;
    song2.play();
  } else if (
    volumBtn.innerHTML ===
      `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>` &&
    song3.paused === true &&
    gameOverScreen.style.display === "flex"
  ) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`;
    song3.play();
  }
};

// EVENTS

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", restart);

volumBtn.addEventListener("click", volBtn);

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

  if (newLevel1.isGameOn === true && event.code === "Space") {
    newLevel1.spaceship.shoot(event);
  }
});

// HIGHSCORES

const numOfHighScores = 10;
const highScore = "highScores";

const checkHighScore = (score) => {
  const highScores = JSON.parse(localStorage.getItem(highScore)) ?? [];
  const lowestScore = highScores[numOfHighScores - 1].score ?? 0;

  if (score > lowestScore) {
    saveHighScore(score, highScores);
  }

  showHighScores();
};

const saveHighScore = (score, highScores) => {
  const name = prompt("You got a highscore! Enter name:");
  const newScore = { score, name };

  // 1. Add to list
  highScores.push(newScore);

  // 2. Sort the list
  highScores.sort((a, b) => b.score - a.score);

  // 3. Select new list
  highScores.splice(numOfHighScores);

  // 4. Save to local storage
  localStorage.setItem(highScore, JSON.stringify(highScores));
};

const showHighScores = () => {
  const highScores = JSON.parse(localStorage.getItem(highScore));

  highScoreList.innerHTML = highScores
    .map((score) => `<li>${score.score} - ${score.name}`)
    .join("");
};
