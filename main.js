//import Game from "./game/game.js"
import GameData from "./game/game_data.js";

window.addEventListener('load' , () => {
  const canvas = document.querySelector('.game-canvas');
  const context = canvas.getContext('2d');
  canvas.width = GameData.GAME_WIDTH;
  canvas.height = GameData.GAME_HEIGHT;

  let totalPlayTime = 0;

//  const game = new Game(canvas);
//  game.init();
  // game cycle
  function gameCycle(timestamp) {
    const dt = (timestamp - totalPlayTime) / 1000;
    totalPlayTime = timestamp;
    context.clearRect(0, 0, canvas.width, canvas.height);
  //  game.update(dt);
  //  game.render();
    requestAnimationFrame(gameCycle);
  }
  gameCycle(0);
})