
import {
  isString,
  isRegexp
} from '../commons/checks.js'

import { highlightPatterns } from './highlight-patterns.js'

let idx = 0

const matchPatterns = (line:string, pattern:string) => {
  return []
}

export default class Line {
  id: number
  text: string
  constructor (text:string) {
    this.text = text
    this.id = idx++
  }
  highlight (patterns:string[]) {
    return highlightPatterns(this.text, patterns)
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
    // -- slice and join highlight
  }
}
