import GameData from "./game_data.js";

export default class Cell {
  constructor(x, y, cellIndex) {
    this.index = cellIndex;
    this.x = x;
    this.y = y;
    this.width = GameData.CELL_SIZE;
    this.height = GameData.CELL_SIZE;
    this.visible = false;
    this.empty = true;
    this.resource = false;
    this.extractor = false;
  }
  render(context) {
    context.save();
    if (this.visible) {
      if (this.empty) {
        context.strokeStyle = 'green';
        context.strokeRect(this.x, this.y, this.width, this.height);
      } else {
        if (this.resource && !this.extractor) {
          context.strokeStyle = 'yellow';
          context.strokeRect(this.x, this.y, this.width, this.height);  
        } else {
          context.strokeStyle = 'black';
          context.strokeRect(this.x, this.y, this.width, this.height);
        }
      }
    }
    context.restore();
  }
}