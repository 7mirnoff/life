import * as PIXI from 'pixi.js'
import { initPixi } from '../pixi/engine'
import { loadTextures, spritsheets, textures } from '../pixi/textures';

import getControlButtons from './buttons'
import Universe from './universe'

export default class Game {
  constructor() {
    // this.pixi = initPixi()
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.textures = null
    this.spritsheets = null

    this.buttons = getControlButtons()
    this.isPlay = false

    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.stop = this.stop.bind(this)
    this.update = this.update.bind(this)

    this.initCanvas()

    this.universe = new Universe(this.canvas)

    this.initClick()
  }

  async initTexture() {
    await loadTextures()
    this.textures = textures
    this.spritsheets = spritsheets
  }

  play() {
    this.isPlay = true
    this.renderUniverse()
    console.log(this.universe);
  }

  pause() {
    this.isPlay = false
  }

  stop() {
    this.isPlay = false
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  initControls() {
    this.buttons.play.addEventListener('click', this.play)
    this.buttons.pause.addEventListener('click', this.pause)
    this.buttons.stop.addEventListener('click', this.stop)
  }

  initCanvas() {
    this.canvas.width = this.canvas.offsetWidth
    this.canvas.height = this.canvas.offsetHeight
  }

  renderUniverse() { //TODO: остановился тут
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.lineWidth = '2'
    this.ctx.strokeStyle = 'black'
    this.ctx.fillStyle = 'red'

    this.ctx.beginPath()

    this.universe.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        this.ctx.rect(cell.figure.x, cell.figure.y, this.universe.cellWidth, this.universe.cellHeigt)

        if (cell.on) {
          this.ctx.fillRect(cell.figure.x, cell.figure.y, this.universe.cellWidth, this.universe.cellHeigt)
        }
      })
    })

    this.ctx.stroke()
  }

  initClick() {
    this.canvas.addEventListener('click', (evt) => {
      const ceilX = Math.floor(evt.layerX / this.universe.cellWidth)
      const ceilY = Math.floor(evt.layerY / this.universe.cellHeigt)
      const currentCeil = this.universe.board[ceilY][ceilX]

      if (currentCeil.on) {
        currentCeil.on = false
      } else {
        currentCeil.on = true
      }

    })
  }

  start() {
    window.requestAnimationFrame(this.update)
  }

  update() {
    if (this.isPlay) {
      this.renderUniverse()
    }
    window.requestAnimationFrame(this.update)
  }
}
