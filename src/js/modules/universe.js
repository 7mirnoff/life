import Cell from './cell'

const AMT_HORIZ = 64
const AMT_VERT = 36

export default class Universe {
  constructor(canvas) {
    this.rendererWidth = canvas.width
    this.rendererHeight = canvas.height
    this.amtHoriz = AMT_HORIZ
    this.amtVert = AMT_VERT
    this.cellWidth = this.rendererWidth / this.amtHoriz
    this.cellHeigt = this.rendererHeight / this.amtVert
    this.board = this.createBoard()
  }

  createBoard() {
    var array = [];
    for (let i = 0; i < this.amtVert; i++) {
      array[i] = []
      for (let j = 0; j < this.amtHoriz; j++) {
        array[i][j] = new Cell(j * this.cellWidth, i * this.cellHeigt)
      }
    }
    return array
  }
}
