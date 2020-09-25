
import Line from '../app/Line.js'

import {
  Lines,
  Patterns
} from '../commons/types'

export default class LinesFilter {
  lines:Lines
  patterns:Patterns
  constructor ({ lines, patterns }:any) {
    this.lines = lines
    this.patterns = patterns
  }
  isMatch (line:Line) {
    return line.text.includes(this.patterns.search)
  }
  matchingLines () {
    return this.lines.values()
      .filter(this.isMatch.bind(this))
  }
  total () {
    return this.lines.size()
  }
  selected () {
    return this.matchingLines().length
  }
}
