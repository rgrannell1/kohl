
let idx = 0

function isString (pattern: any): pattern is string {
  return typeof pattern === 'string'
}

function isRegexp (pattern: any): pattern is RegExp {
  return pattern instanceof RegExp
}

export default class Line {
  id: number
  text: string
  constructor (text:string) {
    this.text = text
    this.id = idx++
  }
  highlight (pattern:string) {

  }
  isMatch (pattern:string | RegExp) {
    if (isString(pattern)) {
      return this.text.includes(pattern)
    } else if (isRegexp(pattern)) {
      return pattern.test(this.text)
    }
  }
  toString () {
    // -- convert to ansi string.
  }
  slice (start:number, end:number) {

  }
}
