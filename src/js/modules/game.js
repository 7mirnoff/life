import * as PIXI from 'pixi.js'

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


    this.start = this.start.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.stop = this.stop.bind(this)
    this.update = this.update.bind(this)

    this.initCanvas()

    this.universe = new Universe(this.canvas)

    this.initClick()

    this.initControls()
  }

  start() {
    console.log(1);
    this.isPlay = true
    window.requestAnimationFrame(this.update)
  }

  play() {
    this.isPlay = true
  }

  pause() {
    this.isPlay = false
  }

  stop() {
    this.isPlay = false
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  initControls() {
    this.buttons.start.addEventListener('click', this.start)
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

    this.ctx.beginPath()

    this.universe.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        this.ctx.rect(cell.figure.x, cell.figure.y, this.universe.cellWidth, this.universe.cellHeigt)

        if (cell.on) {
          this.ctx.fillRect(cell.figure.x, cell.figure.y, this.universe.cellWidth, this.universe.cellHeigt)
        }

        if (this.isPlay) {

        if (cell.on) {
          let countOnBy = 0

          if (this.universe.board[i + 1]) {
            this.universe.board[i + 1][j].on ? countOnBy++ : null
          }

          if (this.universe.board[i - 1]) {
            this.universe.board[i - 1][j].on ? countOnBy++ : null
          }

          if (this.universe.board[i][j + 1]) {
            this.universe.board[i][j + 1].on ? countOnBy++ : null
          }

          if (this.universe.board[i][j - 1]) {
            this.universe.board[i][j - 1].on ? countOnBy++ : null
          }





          if (this.universe.board[i - 1]) {
            if (this.universe.board[i - 1][j - 1]) {
              this.universe.board[i - 1][j - 1].on ? countOnBy++ : null
            }

            if (this.universe.board[i - 1][j + 1]) {
              this.universe.board[i - 1][j + 1].on ? countOnBy++ : null
            }

          }

          if (this.universe.board[i + 1]) {
            if (this.universe.board[i + 1][j - 1]) {
              this.universe.board[i + 1][j - 1].on ? countOnBy++ : null
            }

            if (this.universe.board[i + 1][j + 1]) {
              this.universe.board[i + 1][j + 1].on ? countOnBy++ : null
            }
          }

          // if ((countOnBy === 2)) {
          //   this.ctx.fillStyle = 'red'
          // }

          // if ((countOnBy === 3)) {
          //   this.ctx.fillStyle = 'yellow'
          // }

          // if ((countOnBy === 4)) {
          //   this.ctx.fillStyle = 'blue'
          // }

          // if ((countOnBy === 5)) {
          //   this.ctx.fillStyle = 'green'
          // }



          // if ((countOnBy === 2) || (countOnBy === 3) || (countOnBy === 4) && (Math.sin(performance.now() / 1000) > 0.2)) {
          if ((countOnBy === 2) || (countOnBy === 3)) {
            cell.onNext = true
          } else {
            cell.onNext = false
          }
        }


        if (!cell.on) {
          let countOnBy = 0

          if (this.universe.board[i + 1]) {
            this.universe.board[i + 1][j].on ? countOnBy++ : null
          }

          if (this.universe.board[i - 1]) {
            this.universe.board[i - 1][j].on ? countOnBy++ : null
          }

          if (this.universe.board[i][j + 1]) {
            this.universe.board[i][j + 1].on ? countOnBy++ : null
          }

          if (this.universe.board[i][j - 1]) {
            this.universe.board[i][j - 1].on ? countOnBy++ : null
          }


          if (this.universe.board[i - 1]) {
            if (this.universe.board[i - 1][j - 1]) {
              this.universe.board[i - 1][j - 1].on ? countOnBy++ : null
            }

            if (this.universe.board[i - 1][j + 1]) {
              this.universe.board[i - 1][j + 1].on ? countOnBy++ : null
            }

          }

          if (this.universe.board[i + 1]) {
            if (this.universe.board[i + 1][j - 1]) {
              this.universe.board[i + 1][j - 1].on ? countOnBy++ : null
            }

            if (this.universe.board[i + 1][j + 1]) {
              this.universe.board[i + 1][j + 1].on ? countOnBy++ : null
            }
          }


          if (countOnBy === 3) {
            cell.onNext = true
          } else {
            cell.onNext = false
          }
        }

      }

      })
    })

    this.ctx.stroke()

    this.universe.board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (this.isPlay) {
          cell.on = cell.onNext
        }

      })
    })

  }

  initClick() {
    let isMouseDown = false

    let ceilX
    let ceilY
    let ceilDown

    this.canvas.addEventListener('mousedown', (evt) => {
      isMouseDown = true

      ceilX = Math.floor(evt.layerX / this.universe.cellWidth)
      ceilY = Math.floor(evt.layerY / this.universe.cellHeigt)

      ceilDown = this.universe.board[ceilY][ceilX]
    })

    this.canvas.addEventListener('mouseup', (evt) => {
      isMouseDown = false
    })

    this.canvas.addEventListener('mousemove', (evt) => {
      if (isMouseDown) {
        const currentCeilX = Math.floor(evt.layerX / this.universe.cellWidth)
        const currentCeilY = Math.floor(evt.layerY / this.universe.cellHeigt)

        const currentCeilDown = this.universe.board[currentCeilY][currentCeilX]
        if (!ceilDown.on) {
          currentCeilDown.on = true
        } else {
          currentCeilDown.on = false
        }
      }
    })
  }

  update() {
    this.renderUniverse()
    window.requestAnimationFrame(this.update)
  }
}
