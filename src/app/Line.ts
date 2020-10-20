
import {
  isString,
  isRegexp
} from '../commons/utils.js'

import {
  highlightPatterns,
  formatString
} from './highlight-patterns.js'

let idx = 0

type Pattern = string | RegExp

/**
 * Representation of an input line's data and associated actions.
 */
export default class Line {
  id: number
  text: string
  lineNumber: number
  constructor (text:string) {
    this.text = text
    this.id = idx++
    // -- rewire to be reliable
    this.lineNumber = this.id
  }
  /**
   * Does this line of text match either a literal or regular-expression pattern?
   *
   * @param pattern the string or regular expression pattern to test
   */
  isMatch (pattern:string | RegExp) {
    if (isString(pattern)) {
      return this.text.includes(pattern)
    } else if (isRegexp(pattern)) {
      return pattern.test(this.text)
    }
  }
  /**
   * Highlight a subsection this line of text, where it matches one of the provided patterns.
   *
   * @param patterns an array of literal or regular-expression patterns
   * @param start the index of the start of the subsection of the keep to keep
   * @param end the index of the end of the subsection of the line to keep
   *
   * @returns an ANSI-highlighted string
   */
  highlight (patterns:Pattern[], start:number, end:number) {
    const parts = highlightPatterns(this.text, patterns)
      .slice(start, end)

    return formatString(parts)
  }
}
