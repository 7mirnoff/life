import * as PIXI from 'pixi.js'
import { initPixi } from '../pixi/engine'
import { loadTextures, spritsheets, textures } from '../pixi/textures';
// import { initLoop } from './loop'

export default class Game {
  constructor() {
    this.pixi = null

    this.textures = null
    this.spritsheets = null

    this.init()
  }

  init() {
    window.addEventListener('load', async () => {
      this.pixi = initPixi()

      await loadTextures()
      this.textures = textures
      this.spritsheets = spritsheets
    })
  }

  start() {
    this.pixi.ticker.add(this.update)

    const sprite = new PIXI.Sprite(this.textures.meteor)
    this.pixi.stage.addChild(sprite)
  }

  update() {

  }
}
