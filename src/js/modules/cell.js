export default class Cell {
  constructor (x, y) {
    this.figure = {
      x,
      y
    }

    this.on = false
    this.onNext = false
  }
}
