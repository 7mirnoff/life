import Cell from './cell'

const AMT_HORIZ = 100
const AMT_VERT = 100

export default class Universe {
  constructor(renderer) {
    this.rendererWidth = renderer.width
    this.rendererHeight = renderer.height
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
        array[i][j] = new Cell(j * 4, i * 4, 4, 4)
      }
    }

    return array
  }
}
