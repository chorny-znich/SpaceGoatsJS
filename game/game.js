/*import Defender from "./actors/defender.js";
import Tool from "./actors/tool.js";*/
import Cell from "./cell.js";
import GameData from "./game_data.js";/*
import HandleDefenders from "./handlers/handle_defenders.js";
import HandleResources from "./handlers/handle_resources.js";*/
import Mouse from "./mouse.js";/*
import BottomUI from "./ui/bottom_ui.js";
import Extractor from "./actors/extractor.js";
import HandleExtractors from "./handlers/handle_extractors.js";
import TopUI from "./ui/top_ui.js";
import Level from "./level.js";
import HandleEnemies from "./handlers/handle_enemies.js";
import Enemy from "./actors/enemy.js";
import Projectile from "./actors/projectile.js";
import HandlePopupMessages from "./handlers/handle_popup_messages.js";
*/
export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.canvas.width;
    this.canvas.height = this.canvas.height;
    this.canvasPosition = this.canvas.getBoundingClientRect();

    this.mouse = new Mouse();
/*    this.bottomUI = new BottomUI(0, GameData.GAME_HEIGHT - GameData.CELL_SIZE);
    this.topUI = new TopUI(0, 0);

    this.level = new Level;
*/
    this.gameGrid = [];/*
    this.defenders = [];
    this.resources = [];
    this.extractors = [];
    this.tools = [];
    this.enemies = [];
    this.projectiles = [];
    // handlers
    this.handleDefenders = new HandleDefenders();
    this.handleResources = new HandleResources();
    this.handleExtractors = new HandleExtractors();
    this.handleEnemies = new HandleEnemies();
    this.handlePopupMessages = new HandlePopupMessages();*/
    // listeners
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x - this.canvasPosition.left;
      this.mouse.y = e.y - this.canvasPosition.top;
      //console.log(this.mouse.x, this.mouse.y);
    });
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
      //console.log(this.mouse.x, this.mouse.y);
    });
  /*  this.canvas.addEventListener('click', () => {
      if (this.mouse.isOverCanvas()) {
        const positionX = Math.floor(this.mouse.x - this.mouse.x % GameData.CELL_SIZE);
        const positionY = Math.floor(this.mouse.y - this.mouse.y % GameData.CELL_SIZE);
         // find clicked cell in cell's array
        const clickedCell = this.gameGrid.find(item => item.x === positionX && item.y === positionY) || -1;
        const clickedUI = this.bottomUI.cells.find(item => item.x === positionX && item.y === positionY) || -1;
        //console.log(/*clickedCell*//*clickedUI);
        // set active object in bottom ui
        if (clickedUI !== -1) {
          this.bottomUI.changeActive(clickedUI.index);
        } else {
        }
        // spawn defender only if the cell is empty
        if (clickedCell != -1 && clickedCell.empty) {
          const activeIndexUI = this.bottomUI.cells.findIndex(value => value.active === true);
          if(activeIndexUI === 0 && this.handleDefenders.defenderAmountValue > 0 
            && this.handleDefenders.getActiveState()) {
            this.defenders.push(new Defender(positionX, positionY, clickedCell.index));
            this.handleDefenders.defenderAmountValue--;
            this.handleDefenders.setActiveState(false);
            clickedCell.empty = false;
          }
          else if (activeIndexUI === 1 && this.topUI.resourcesAmount >= 25) {
            this.tools.push(new Tool(positionX, positionY, clickedCell.index));
            this.topUI.spendResources(25);
            clickedCell.empty = false;
          }
          else if (activeIndexUI === 1 && this.topUI.resourcesAmount < 25) {
            this.handlePopupMessages.addMessage(positionX, positionY, 'Don\'t have enough resources', 35, 'white');
          }
          //console.log(this.defenders);
          //console.log(this.tools);
        }
        // spawn extractor only if cell owns a resource and don't have extractor already
        else if (clickedCell != -1 && clickedCell.resource && !clickedCell.extractor) {
          this.extractors.push(new Extractor(positionX, positionY, clickedCell.index));
          clickedCell.extractor = true;
          //console.log(this.extractors);
        }
      }
    });*/
  }
  init() {
  // create the game grid
    let counter = 0;
    for (let j = GameData.TOP_GRID_START; j <= GameData.GRID_HEIGHT * GameData.CELL_SIZE; j += GameData.CELL_SIZE) {
      for (let i = GameData.LEFT_GRID_START; i < GameData.GRID_WIDTH * GameData.CELL_SIZE; i += GameData.CELL_SIZE) {
        this.gameGrid.push(new Cell(i, j, counter));
        counter++;
      }
    }
    console.log(this.gameGrid)/*
  // create ui grid
    this.bottomUI.init();*/
  }
  update(dt) {
    // update cursor position
    this.gameGrid.forEach(value => value.visible = this.#collision(this.mouse, value) ? true : false);
    // update defenders
  /*  this.handleDefenders.update(dt);
    this.defenders.forEach(value => {
      value.update(dt);
      if (value.shootEnemy) {
        value.shoot();
        this.projectiles.push(new Projectile(value.x + GameData.CELL_SIZE, value.y + GameData.CELL_SIZE * 0.5));
      }
      if (this.handleEnemies.enemyLines[(value.y - 100) / GameData.CELL_SIZE] > 0) {
        value.shootingState = true;
      } else {
        value.shootingState = false;
      }
    });

    // handle projectiles
    this.projectiles.forEach((value) => value.update(dt));

    // handle resources
    this.handleResources.update(dt);
    if (this.handleResources.spawnState) {
      this.handleResources.spawn(this.gameGrid, this.resources);
      //console.log(this.resources);
    }
    this.resources.forEach(value => value.update(dt));
    // handle extractors
    this.handleExtractors.update(dt, this.extractors, this.resources, this.gameGrid, this.topUI);
    // handle tools
    this.tools.forEach(value => value.update(dt));
    // handle enemies
    this.handleEnemies.update(dt);
    if (this.handleEnemies.getSpawnState()) {
      const enemyCoords = this.handleEnemies.spawn();
      this.enemies.push(new Enemy(enemyCoords.x, enemyCoords.y, GameData.CELL_SIZE));
      this.handleEnemies.setSpawnState(false);
      const lineIndex = enemyCoords.y;
      this.handleEnemies.enemyLines[Math.floor((enemyCoords.y - 100) / GameData.CELL_SIZE)] += 1;
      //console.log(this.handleEnemies.enemyLines);
    }
    this.enemies.forEach(value => value.update(dt));
    // handle popup messages
    this.handlePopupMessages.update(dt);

    // collisions between projectiles and enemies
      for (let i = 0; i < this.projectiles.length; i++) {
        for (let j = 0; j < this.enemies.length; j++) {
          if (this.#collision(this.projectiles[i], this.enemies[j])) {
            this.projectiles[i].active = false;
            const isDead = this.enemies[j].getDamage(this.projectiles[i].power);
            this.handlePopupMessages.addMessage(this.enemies[j].x, this.enemies[j].y, this.projectiles[i].power, 30, 'yellow');
          if (isDead) {
            this.handleEnemies.enemyLines[Math.floor((this.enemies[j].y - 100) / GameData.CELL_SIZE)] -= 1;
        }
      }
    }
  }
    // collisions between enemies and tools
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = 0; j < this.tools.length; j++) {
        //console.log(this.enemies[i].x, this.enemies[i].y); 
        //console.log(this.tools[j].x, this.tools[j].y);
        if (this.#collision(this.enemies[i], this.tools[j])) {
          this.enemies[i].isMoving(false);
          if (!this.enemies[i].fighting) {
            this.enemies[i].fighting = true;
            this.tools[j].health -= this.enemies[i].attack();
            this.handlePopupMessages.addMessage(this.tools[j].x + GameData.CELL_SIZE * 0.5, this.tools[j].y, 
              this.enemies[i].attack(), 30, 'orange');
          }
          if (this.enemies[i].attacking) {
            this.tools[j].health -= this.enemies[i].attack();
            this.handlePopupMessages.addMessage(this.tools[j].x + GameData.CELL_SIZE * 0.5, this.tools[j].y, 
              this.enemies[i].attack(), 30, 'orange');
            if (this.tools[j].health <= 0) {
              this.tools[j].active = false;
              this.enemies[i].moving = true;
              this.enemies[i].fighting = false;
              this.gameGrid[this.tools[j].index].empty = true;
            }
            //console.log(this.tools[j].health);
          } 
        }
      }
    }
    // collisions between enemies and defenders
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = 0; j < this.defenders.length; j++) {
        if (this.#collision(this.enemies[i], this.defenders[j])) {
          this.enemies[i].isMoving(false);
          if (!this.enemies[i].fighting) {
            this.enemies[i].fighting = true;
            //console.log(this.tools[j].health);
            this.defenders[j].health -= this.enemies[i].attack();
            this.handlePopupMessages.addMessage(this.defenders[j].x + GameData.CELL_SIZE * 0.5, this.defenders[j].y, 
              this.enemies[i].attack(), 30, 'red');
            //console.log(this.tools[j].health);
          }
          if (this.enemies[i].attacking) {
            this.defenders[j].health -= this.enemies[i].attack();
            this.handlePopupMessages.addMessage(this.defenders[j].x + GameData.CELL_SIZE * 0.5, this.defenders[j].y, 
              this.enemies[i].attack(), 30, 'red');
            if (this.defenders[j].health <= 0) {
              this.defenders[j].active = false;
              this.enemies[i].moving = true;
              this.enemies[i].fighting = false;
              this.gameGrid[this.defenders[j].index].empty = true;
            }
          } 
        }
      }
    }
     // collisions between enemies and extractors
     for (let i = 0; i < this.enemies.length; i++) {
      for (let j = 0; j < this.extractors.length; j++) {
        if (this.#collision(this.enemies[i], this.extractors[j])) {
          this.enemies[i].isMoving(false);
          if (!this.enemies[i].fighting) {
            this.enemies[i].fighting = true;
            this.extractors[j].health -= this.enemies[i].attack();
            this.handlePopupMessages.addMessage(this.extractors[j].x + GameData.CELL_SIZE * 0.5, this.extractors[j].y, 
              this.enemies[i].attack(), 30, 'red');
          }
          if (this.enemies[i].attacking) {
            this.extractors[j].health -= this.enemies[i].attack();
            this.handlePopupMessages.addMessage(this.extractors[j].x + GameData.CELL_SIZE * 0.5, this.extractors[j].y, 
              this.enemies[i].attack(), 30, 'red');
            if (this.extractors[j].health <= 0) {
              this.extractors[j].active = false;
              this.enemies[i].moving = true;
              this.enemies[i].fighting = false;
              this.gameGrid[this.extractors[j].cellIndex].extractor = false;
            }
          } 
        }
      }
    }
    // update ui
    this.topUI.update(this.handleExtractors);
    this.bottomUI.update(this.handleDefenders);
    // filter inactive objects
    this.resources = this.resources.filter(value => value.active);
    this.extractors = this.extractors.filter(value => value.active);
    this.defenders = this.defenders.filter(value => value.active);
    this.tools = this.tools.filter(value => value.active);
    this.enemies = this.enemies.filter(value => value.active);
    this.projectiles = this.projectiles.filter(value => value.active);*/
  }
  render() {/*
    this.level.render(this.context);
    this.resources.forEach(value => value.render(this.context));
    this.extractors.forEach(value => value.render(this.context));
    this.defenders.forEach(value => value.render(this.context));
    this.tools.forEach(value => value.render(this.context));
    this.enemies.forEach(value => value.render(this.context));
    this.projectiles.forEach(value => value.render(this.context));*/
    this.gameGrid.forEach(value => value.render(this.context));/*
    this.handlePopupMessages.render(this.context);
    this.topUI.render(this.context);
    this.bottomUI.render(this.context);*/
  }

  // collision between two objects
  #collision(firstObj, secondObj) {
  if ((firstObj.x > secondObj.x && firstObj.x < secondObj.x + secondObj.width) &&
    (firstObj.y >= secondObj.y && firstObj.y <= secondObj.y + secondObj.height)) {
    return true;
  }
  return false;
  }
}