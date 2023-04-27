// GLOBAL VARIABLES

const mainScreen = document.querySelector("#main-screen");
const startBtn = document.querySelector("#start-btn");

const gameOverScreen = document.querySelector("#game-over");
const restartBtn = document.querySelector("#restart-button");

const volumBtn = document.querySelector("#sound");

let count = document.querySelector(".count");
let countDOM = document.querySelector("#counter");

const canvas = document.querySelector("#level1");
const ctx = canvas.getContext("2d");

const highScoreDOM = document.querySelector("#highScoreList");
const highScoreList = document.querySelector("#highScores");

const undersBtn = document.querySelector("#first-button")

const nameInput = document.querySelector("#nameInput")
let playerName = document.querySelector("#name").value;
const submitBtn = document.querySelector("#submitBtn")



//DOOMs of dialogue

const letterDOM = document.querySelector("#letter");
const dialogueIntro1 = document.querySelector("#dialogue-intro .first");
const dialogueIntro2 = document.querySelector("#dialogue-intro .second");
const dialogueIntro3 = document.querySelector("#dialogue-intro .third");
const dialogueIntro4 = document.querySelector("#dialogue-intro .fourth");
const dialogueIntro5 = document.querySelector("#dialogue-intro .fifth");
const dialogueIntro6 = document.querySelector("#dialogue-intro .sixth");
const dialogueIntro7 = document.querySelector("#dialogue-intro .seventh");


let time = 0;


//DIALOGUE

let textSpeed = {
  pause: 500,
  slow: 120,
  normal: 70,
  fast: 40,
};

let textLines = [
  {
    string:
      "I, hope this message finds you well. I am writing to inform you of an upcoming mission that I would like you to be a part of. Our mission will take us into space, where we will be defending our planet from a potential alien threat.",
    speed: textSpeed.fast,
  },
];
let textLines1 = [
  {
    string:
      "As you know, our planet has been under attack from aliens in the past, and we have reason to believe that they may be planning another attack soon. Our team has been tasked with preventing this attack and protecting our planet from harm.",
    speed: textSpeed.fast,
  },
];

let textLines2 = [
  {
    string:
      "During this mission, you will be responsible for piloting our spacecraft and coordinating with our ground team to gather intelligence and intercept any incoming alien threats. You will be working closely with our team of experts in space combat to ensure that we are fully prepared to defend ourselves against any potential attack.",
    speed: textSpeed.fast,
  },
];
let textLines3 = [
  {
    string:
      "I understand that this mission will not be easy, but I have the utmost confidence in you and the rest of our team to complete this critical mission. The safety of our planet is at stake, and I know that together, we can rise to this challenge.",
    speed: textSpeed.fast,
  },
];

let textLines4 = [
  {
    string:
      "If you have any questions or concerns, please don't hesitate to reach out to me or any other member of the team.",
    speed: textSpeed.fast,
  },
];

let textLines5 = [{ string: "Best regards,", speed: textSpeed.normal }];

let textLines6 = [
  { string: "Colonel Ripley", speed: textSpeed.normal, classes: ["bold"] },
];

let arrayLine = [];
let arrayLine1 = [];
let arrayLine2 = [];
let arrayLine3 = [];
let arrayLine4 = [];
let arrayLine5 = [];
let arrayLine6 = [];


//Spliting the strings into character

textLines.forEach((line) => {
  line.string.split("").forEach((character) => {
    let span = document.createElement("span");
    span.textContent = character;
    dialogueIntro1.appendChild(span);
    arrayLine.push({
      span: span,
      delayAfter: line.speed,
      isSpace: character === " ",
      classes: line.classes || [],
    });
  });
});

textLines1.forEach((line) => {
  line.string.split("").forEach((character) => {
    let span = document.createElement("span");
    span.textContent = character;
    dialogueIntro2.appendChild(span);
    arrayLine1.push({
      span: span,
      delayAfter: line.speed,
      isSpace: character === " ",
      classes: line.classes || [],
    });
  });
});

textLines2.forEach((line) => {
  line.string.split("").forEach((character) => {
    let span = document.createElement("span");
    span.textContent = character;
    dialogueIntro3.appendChild(span);
    arrayLine2.push({
      span: span,
      delayAfter: line.speed,
      isSpace: character === " ",
      classes: line.classes || [],
    });
  });
});

textLines3.forEach((line) => {
  line.string.split("").forEach((character) => {
    let span = document.createElement("span");
    span.textContent = character;
    dialogueIntro4.appendChild(span);
    arrayLine3.push({
      span: span,
      delayAfter: line.speed,
      isSpace: character === " ",
      classes: line.classes || [],
    });
  });
});

textLines4.forEach((line) => {
  line.string.split("").forEach((character) => {
    let span = document.createElement("span");
    span.textContent = character;
    dialogueIntro5.appendChild(span);
    arrayLine4.push({
      span: span,
      delayAfter: line.speed,
      isSpace: character === " ",
      classes: line.classes || [],
    });
  });
});

textLines5.forEach((line) => {
  line.string.split("").forEach((character) => {
    let span = document.createElement("span");
    span.textContent = character;
    dialogueIntro6.appendChild(span);
    arrayLine5.push({
      span: span,
      delayAfter: line.speed,
      isSpace: character === " ",
      classes: line.classes || [],
    });
  });
});

textLines6.forEach((line) => {
  line.string.split("").forEach((character) => {
    let span = document.createElement("span");
    span.textContent = character;
    dialogueIntro7.appendChild(span);
    arrayLine6.push({
      span: span,
      delayAfter: line.speed,
      isSpace: character === " ",
      classes: line.classes || [],
    });
  });
});

// MUSIC

// INTRO-SONG

const song1 = new Audio("Music/Intro.mp3");
song1.volume -= 0.9;
song1.preload = "auto";
song1.loop = true;

//LEVEL SONG
const song2 = new Audio("Music/level1.mp3");
song2.volume -= 0.9;
song1.preload = "auto";
song2.loop = true;

//GAME OVER SONG

const song3 = new Audio("Music/game-over.mp3");
song3.volume -= 0.9;
song1.preload = "auto";
song3.loop = true;

// LETTER-SONG

const song4 = new Audio("Music/letter-music.mp3");
song4.volume -= 0.9;
song4.preload = "auto";
song4.loop = true;


let newLevel1;

// FUNCTIONS

//Function to reveal the characters one

const revealOneCharacter = (list) => {
  let next = list.splice(0, 1)[0];
  next.span.classList.add("revealed");

  next.classes.forEach((clas) => {
    next.span.classList.add(clas);
  });

  let delay = next.delayAfter;

  if (list.length > 0) {
    setTimeout(() => {
      revealOneCharacter(list);
    }, delay);
  }
};

const revealAllLines = () =>{
  revealOneCharacter(arrayLine);
  setTimeout (() =>{
  revealOneCharacter(arrayLine1);
  },10500)

  setTimeout(() => {
    revealOneCharacter(arrayLine2); 
  }, 21500);

  setTimeout(() => {
    revealOneCharacter(arrayLine3);
  }, 37000);

  setTimeout(() => {
    revealOneCharacter(arrayLine4);
  }, 48000);

  setTimeout(() => {
    revealOneCharacter(arrayLine5);
  }, 54000);

  setTimeout(() => {
    revealOneCharacter(arrayLine6);
  }, 56000);

}

//Game states

const startGame = () => {
  // CHANGE SCREENS

  console.log(playerName)

  mainScreen.style.display = "none";
  canvas.style.display = "block";
  countDOM.style.display = "flex";
  song1.pause();
  song2.play();

  // Time controller : defines the timing of the game
  setInterval(() => {
    time++;
  }, 1000);

  // CREATE THE OBJECT

  newLevel1 = new Level1();

  // Shooting intervasl for enemies

  setInterval(() => {
    //Regular enemies
    newLevel1.enemyArray.forEach((enemy) => {
      if (enemy.isShooting === true) {
        enemy.isShooting = false;
      } else {
        enemy.isShooting = true;
      }
    });
    //Boss
    if (newLevel1.boss.isShooting === true) {
      newLevel1.boss.isShooting = false;
    } else {
      newLevel1.boss.isShooting = true;
    }
  }, 1500);

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
  time = 0;

  if (
    volumBtn.innerHTML ===
    `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`
  ) {
    song2.play();
  }

  highScoreDOM.style.display = "none";
};

//Volume button function

const volBtn = () => {
  
  //Song1
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
      `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>` &&
    song1.paused === true &&
    mainScreen.style.display === "flex"
  ) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`;
    song1.play();
  }

  
  //Song 2
  if (
    volumBtn.innerHTML ===
      `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>` &&
    song2.paused === false &&
    canvas.style.display === "block"
  ) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>`;
    song2.pause();
  } else if (
    volumBtn.innerHTML ===
      `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>` &&
    song2.paused === true &&
    canvas.style.display === "block"
  ) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`;
    song2.play();
  } 
  
  //Song 3
  if (
    volumBtn.innerHTML ===
      `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>` &&
    song3.paused === false &&
    gameOverScreen.style.display === "flex"
  ) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>`;
    song3.pause();
  }  else if (
    volumBtn.innerHTML ===
      `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>` &&
    song3.paused === true &&
    gameOverScreen.style.display === "flex"
  ) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`;
    song3.play();
  }

    //Song 4
  
    if (
      volumBtn.innerHTML ===
        `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>` &&
      song4.paused === false &&
      (letterDOM.style.display !== "none" || nameInput.style.display === "flex")
    ) {
      volumBtn.innerHTML = `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>`;
      song4.pause();
    } else if (
      volumBtn.innerHTML ===
        `<i class="fa-solid fa-volume-xmark" style="color: #000000;"></i>` &&
        (letterDOM.style.display !== "none" || nameInput.style.display === "flex")
    ) {
      volumBtn.innerHTML = `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`;
      song4.play();
    }
};

const firstBtn = () =>{
  letterDOM.style.display = "none";
  mainScreen.style.display = "none"
  nameInput.style.display = "flex";
  if (volumBtn.innerHTML !== `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`) {
    volumBtn.innerHTML = `<i class="fa-solid fa-volume-high fa-spin-pulse"></i>`;
    song4.play();
  }

}

//Transition from the input to the main-screen
const submiBtnTrans = () => {
  mainScreen.style.display = "flex";
  nameInput.style.display = "none";
}

// EVENTS

revealAllLines();

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", restart);

volumBtn.addEventListener("click", volBtn);

undersBtn.addEventListener("click", firstBtn);

submitBtn.addEventListener("click", submiBtnTrans)

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

  if (newLevel1.isGameOn === true && event.code === "Space" && newLevel1.isGameOn !== undefined) {
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
  const newScore = { score, playerName };

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
