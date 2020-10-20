
import {
  isString,
  isRegexp
} from '../commons/utils.js'

import {
  Pattern
} from '../commons/types'

import {
  highlightLineSegmentPatterns
} from './highlight-patterns.js'

let GLOBAL_LINE_ID = 0

/**
 * Representation of an input line's data and associated actions.
 */
export default class Line {
  id: number
  text: string
  lineNumber: number

  constructor (text:string) {
    this.text = text
    this.id = GLOBAL_LINE_ID++
    // -- TODO rewire this, this is not reliable
    this.lineNumber = this.id
  }

  /**
   * Does this line of text match either a literal or regular-expression pattern?
   *
   * @param pattern the string or regular expression pattern to test
   */
  isMatch (pattern:Pattern) {
    if (isString(pattern)) {
      return this.text.includes(pattern)
    } else if (isRegexp(pattern)) {
      return pattern.test(this.text)
    }
    // -- should never reach here.
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
    return highlightLineSegmentPatterns(this.text, patterns, start, end)
  }
}
