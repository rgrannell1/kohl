
import {
  isString,
  isRegexp
} from '../commons/checks.js'

import {
  highlightPatterns,
  formatString
} from './highlight-patterns.js'

let idx = 0

type Pattern = string | RegExp

export default class Line {
  id: number
  text: string
  constructor (text:string) {
    this.text = text
    this.id = idx++
  }
  isMatch (pattern:string | RegExp) {
    if (isString(pattern)) {
      return this.text.includes(pattern)
    } else if (isRegexp(pattern)) {
      return pattern.test(this.text)
    }
  }
  highlight (patterns:Pattern[], start:number, end:number) {
    const parts = highlightPatterns(this.text, patterns)
      .slice(start, end)

    return formatString(parts)
  }
}
