
import React from 'react'
import ink from 'ink'

const {
  Text
} = ink

import {
  Cursor,
  Lines,
  Patterns,
  Screen,
} from '../commons/types'

interface BodyProps {
  cursor: Cursor,
  lines: Lines,
  screen: Screen,
  patterns: Patterns
}

export class Body extends React.PureComponent<BodyProps> {
  trimLine(line:string, cursor:Cursor, screen:Screen) {
    const start = cursor.column
    const end = start + screen.columns

    return line.slice(start, end).padEnd(1)
  }
  selectDisplayLines (lines:Lines, cursor:Cursor, screen:Screen, patterns:Patterns) {
    const occupied = 5
    const lower = cursor.position + (screen.rows - occupied)

    return lines
      .values()
      .filter((lineData) => {
        return lineData.text.includes(patterns.search || '')
      })
      .slice(cursor.position, lower)
  }
  render () {
    const {
      cursor,
      lines,
      screen,
      patterns
    } = this.props

    const elems = []

    const displayLines = this.selectDisplayLines(lines, cursor, screen, patterns)
    for (const { text, id } of displayLines) {
      const isSelected = cursor.position === id
      const trimmed = this.trimLine(text, cursor, screen)

      elems.push(<Text key={id} inverse={isSelected}>{trimmed}</Text>)
    }

    return <>{elems}</>
  }
}
