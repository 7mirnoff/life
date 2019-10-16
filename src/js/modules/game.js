import * as PIXI from 'pixi.js'
import { initPixi } from '../pixi/engine'
import { loadTextures, spritsheets, textures } from '../pixi/textures';

import getControlButtons from './buttons'
import Universe from './universe'

export default class Game {
  constructor() {
    this.pixi = initPixi()
    this.textures = null
    this.spritsheets = null

    this.buttons = getControlButtons()
    this.isPlay = false

    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.stop = this.stop.bind(this)
    this.update = this.update.bind(this)

    this.universe = new Universe(this.pixi.renderer)
  }

  async initTexture() {
    await loadTextures()
    this.textures = textures
    this.spritsheets = spritsheets
  }

  play() {
    this.isPlay = true
    this.renderUniverse()
  }

  pause() {
    this.isPlay = false
  }

  stop() {
    this.isPlay = false
    console.log(this.pixi);
    this.pixi.stage.chigraphics.clear()
  }

  initControls() {
    this.buttons.play.addEventListener('click', this.play)
    this.buttons.pause.addEventListener('click', this.pause)
    this.buttons.stop.addEventListener('click', this.stop)
  }

  renderUniverse() { //TODO: остановился тут
    const rect = new PIXI.Rectangle(10, 10, 10, 10)

    let graphics = new PIXI.Graphics();
    graphics.beginFill(0xFFFFFF);
    graphics.lineStyle(2, 0x000000);

    this.universe.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        graphics.drawRect(cell.figure.x, cell.figure.y, cell.figure.width, cell.figure.height);
        this.pixi.stage.addChild(graphics);
      })
    })
  }

  start() {
    this.pixi.ticker.add(this.update)
  }

  update() {
    if (this.isPlay) {

    }
  }
}
