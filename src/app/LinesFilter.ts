
import Line from '../app/Line.js'

import {
  Lines,
  Patterns
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
