# NAME OF YOUR PROYECT

## [Play the Game!](https://jesusr-91.github.io/The-last-defense/)


# Description

A classic shoot'em up in which your goal is to stop an alien attack on Heart. 
The game has an arrow and spacebar movement system and consists of an endless loop in which the player's objective is to achieve the best possible score.


# Main Functionalities

- The ship starts immobile and begins to move automatically according to the direction the player presses: `left`, `right`, `up` and `down`.
- The player can shoot to the enemies using the `space bar`.
- Asteroids spawn at the top of the screen from random locations.
- Enemies appear at the top of the screen from random locations.
- There are three different types of basic enemies that appear randomly in no particular order.
- Bosses appear after some time (the firs one after 60 seconds from the beggining and the second one 120 seconds after defeating the first one).
- The firs boss has 10 lives and the second one has 15.
- The player starts with 3 lifes and can get more during the game (maximum of 5 at the same time).


# Backlog Functionalities

  * Clean the CSS
  * Improve enemies movement
  * Better events
  * Better animations
  * Seamless background

# Technologies used

  * HTML
  * CSS
  * JavaScript
  * DOM Manipulation
  * JS Canvas
  * JS Classes
  * Local Storage
  * JS Audio() and JS Image()


# States

  * Intro Screen / Player name Input
  * Main screen
  * Level screen
  * Game over screen

# Proyect Structure

- JS files :
    * main.js        (global variables, DOM elements, global functions and events)
    * game.js        (where the main game is define)
    * Spaceship.js   (player spacecraft + life class)
    * Enemies.js     (includes enemies and bosses)
    * Projectile.js  (player, enemies and bosses projectiles)
    * Asteroids.js 



## main.js

- revealOneCharacter()
- revealAllLines()
- startGame()
- restart()
- volBtn()
- firstBtn()
- submitBtnTrans()
- checkHighScore()
- saveHighScore()
- showHighScore()

## Game.js

- game () {
    - this.bg
    - this.bg.src
    - this.bgX
    - this.bgY
    - this.bgW
    - this.bgH
    - this.spaceship
    - this.playerLifeCount
    - this.enemyArray
    - this.explosionEnemyArray
    - this.isSpawming
    - this.asteroidArray
    - this.explosionAsteroidArray
    - this.boss
    - this.isBoss1Active
    - this.boss2
    - this.isBoss2Active
    - this.heartArray
    - this.isGameOn
    - this.fps
    - -bgDraw()
    - lifeDraw()
    - heartSpawming()
    - enemiesSpawn()
    - asteroidSpawn()
    - bossSpawn()
    - boss2Spawn()
    - checkCollisionSpaceshipHeart()
    - checkCollisionSpaceshipEnemy()
    - checkCollisionAsterpodSpaceship()
    - checkCollisionSpaceshipBoss()
    - checkCollisionSpaceshipBoss2()
    - checkCollisionEnemyAsteroid()
    - checkCollisionProjectileEnemy()
    - checkCollisionProjectileEnemySpaceship()
    - checkCollisionProjectileSpaceshipAsteroid()
    - checkCollisionProjectileBossSpaceship()
    - checkCollisionProjectileBoss2Spaceship()
    - checkCollisionProjectileBoss()
    - checkCollisionProjectileBoss2()
    - gameOver()
    - gameLoop()
 
}

## Spaceship.js 

- Spaceship1 () {
    - this.img
    - this.img.src
    - this.x
    - this.y
    - this.w
    - this.h
    - this.mov
    - this.projectileArray
    - this.isShooting
    - this.isMoving
    - this.isMovingRight
    - this.isMovingLeft
    - this.isMovingDown
    - this.isMovingUp
    - draw()
    - movement()
    - automovement()
    - movement2()
    - shoot()
}

- Heart() {
  - this.img
  - this.img.src
  - this.x
  - this.y
  - this.w
  - this.h
  - draw()
  - movement()
  
  }


## Enemies.js 

- Enemy1 () {
    - this.img
    - this.img.src
    - this.x
    - this.y
    - this.movX
    - this.movY
    - this.projectileArray
    - this.isMovingRight
    - this.isMovingDown
    - this.isShooting
    - this.seconds
    - movement()
    - wallCollisions
    - shoot

  }
  
- Enemy2 () {
    - this.img
    - this.img.src
    - this.x
    - this.y
    - this.movX
    - this.movY
    - this.projectileArray
    - this.isMovingRight
    - this.isMovingDown
    - this.isShooting
    - this.seconds
    - movement()
    - wallCollisions
    - shoot

  }

- Enemy3 () {
    - this.img
    - this.img.src
    - this.x
    - this.y
    - this.movX
    - this.movY
    - this.projectileArray
    - this.isMovingRight
    - this.isMovingDown
    - this.isShooting
    - this.seconds
    - movement()
    - wallCollisions
    - shoot

  }
  
- Boss1 () {
    - this.img
    - this.img.src
    - this.x
    - this.y
    - this.w
    - this.h
    - this.movX
    - this.movY
    - this.projectileArray
    - this.life
    - this.isMovingRight
    - this.isMovingUp
    - this.seconds
    - this.isShooting
    - draw()
    - movement()
    - wallCollisions()
    - shoot()

  }
  
- Boss2 () {
    - this.img
    - this.img.src
    - this.x
    - this.y
    - this.w
    - this.h
    - this.movX
    - this.movY
    - this.projectileArray
    - this.life
    - this.isMovingRight
    - this.isMovingUp
    - this.seconds
    - this.isShooting
    - draw()
    - movement()
    - wallCollisions()
    - shoot()

  }
  
 -Explosions() {
    - this.img
    - this.img.src
    - this.x
    -this.y
    -this.w
    -this.h
    -draw()
 
 }
  
  

## Projectiles.js 

- Projectile() {
    - this.img
    - this.img.src
    - this.x
    - this.y
    - this.w
    - this.h
    - this.speed
    - draw()
    - movement()
  
  }
  
 - ProjectileBoss() {
    - this.img
    - this.img.src
    - this.x
    - this.y
    - this.w
    - this.h
    - this.speedY
    - this.speedx
    - this.isMovingRight
    - this.isMovingDow

    - draw()
    - movement()
    - wallCollisions()
  
  }
  

## ASteroids.js 

- Asteroids() {

    - this.img1
    - this.img1.src
    - this.img2
    - this.img2.src
    - this.img3
    - this.img3.src
    - this.img4
    - this.img4.src
    - this.img5
    - this.img5.src
    - this.img6
    - this.img6.src
    - this.img7
    - this.img7.src
    
    - this.imgArray
    
    - this.x
    - this.y
    - this.w
    - this.h
    - this.movY
    - this.frames
    
    - movement()
    - draw()
    - rotateAsteroid()
    
  }

- ExplosionAsteroid() {
    
    - this.img
    - this.img.src
    
    - this.x
    - this.y
    - this.w
    - this.h
    
    - draw()
    
  }
  
    



