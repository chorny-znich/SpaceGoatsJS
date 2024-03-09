export default class Mouse {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.width = 0.1;
    this.height = 0.1;
  }
  isOnCanvas() {
    if (this.x !== undefined && this.y !== undefined) {
      return true;
    } 
    return false;
  }
};