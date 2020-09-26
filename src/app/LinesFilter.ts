
import Line from '../app/Line.js'

import {
  Lines,
  Patterns,
  Bounds
} from '../commons/types'

interface LinesFilterArgs {
  lines: Lines,
  patterns: Patterns
}

// -- merge into a lines class?
export default class LinesFilter {
  lines:Lines
  patterns:Patterns
  constructor ({ lines, patterns }:LinesFilterArgs) {
    this.lines = lines
    this.patterns = patterns
  }
  isMatch (line:Line) {
    return line.isMatch(this.patterns.search)
  }
  matchingLines () {
    return this.lines.values().filter(this.isMatch.bind(this))
  }
  displayLines (bounds:Bounds) {
    return this.matchingLines()
      .slice(bounds.top, bounds.bottom)
      .map(data => {
        const { id } = data
        const { highlight } = this.patterns
        const text = data.highlight([highlight], bounds.left, bounds.right)

        return { text, id }
      })
  }
  total () {
    return this.lines.size()
  }
  selected () {
    return this.matchingLines().length
  }
}
