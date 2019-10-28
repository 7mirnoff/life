import * as PIXI from 'pixi.js'

const WIDTH = 60
const HEIGHT = 60

const initPixi = () => {
  const app = new PIXI.Application({
    width: WIDTH, // default: 800
    height: HEIGHT, // default: 600
    antialias: true // default: false
    // transparent: true, // default: false
    // resolution: 2,       // default: 1
    // scale: 0.5,
    // autoResize: true
  })

  app.renderer.autoResize = true
  app.renderer.resize(1200, 800)
  app.renderer.backgroundColor = 0x00BFFF
  app.renderer.view.classList.add('main-canvas')

  // const container = document.querySelector('.game')
  // container.appendChild(app.view)

  return app
}

export { initPixi }
