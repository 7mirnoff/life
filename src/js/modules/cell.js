import * as PIXI from 'pixi.js'

export default class Cell {
  constructor(x, y, w, h) {
    this.figure = new PIXI.Rectangle(x, y, w, h)
  }
}
