
let idx = 0

export default class Line {
  id: number
  text: string
  constructor (text:string) {
    this.text = text
    this.id = idx++
  }
  highlight (pattern:string) {

  }
  isMatch (pattern:string) {
    if (false) {
      // -- return regexp
    } else {
      return this.text.includes(pattern)
    }
  }
  toString () {
    // -- convert to ansi string.
  }
  slice (start:number, end:number) {

  }
}
