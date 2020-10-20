
import ansi from 'ansi-styles'
import { inverse } from 'chalk'
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

interface DisplayLinesOpts {
  showLineNumber?: boolean
}

export default class LinesFilter {
  lines:Lines

  patterns:Patterns

  constructor ({ lines, patterns }:LinesFilterArgs) {
    this.lines = lines
    this.patterns = patterns
  }

  /**
   * Does a line match the search pattern?
   *
   * @param line a candidate line
   */
  isMatch (line:Line) {
    return line.isMatch(this.patterns.search)
  }

  matchingLines () {
    return this.lines.values().filter(this.isMatch.bind(this))
  }

  highlightLine (bounds:Bounds, data:Line, opts?:DisplayLinesOpts) {
    const { id } = data
    const { highlight } = this.patterns
    let text = ''

    if (opts?.showLineNumber) {
      text += `${ansi.inverse.open}${id}${ansi.inverse.close}    `
    }

    text += data.highlight([highlight], bounds.left, bounds.right)

    return { text, id }
  }

  displayLines (bounds:Bounds, opts?:DisplayLinesOpts) {
    return this.matchingLines()
      .slice(bounds.top, bounds.bottom)
      .map((data, ith) => this.highlightLine(bounds, data, opts))
  }

  total () {
    return this.lines.size()
  }

  selected () {
    return this.matchingLines().length
  }
}
