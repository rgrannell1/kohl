
import {
  Screen,
  Cursor,
  Lines,
  LineData,
  Patterns
} from '../commons/types'

export default class FilterLines {
  lines:Lines
  patterns:Patterns
  constructor ({ lines, patterns }:any) {
    this.lines = lines
    this.patterns = patterns
  }
  isMatch (lineData:LineData) {
    return lineData.text.includes(this.patterns.search)
  }
  matchingLines (cursor?:Cursor) {
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