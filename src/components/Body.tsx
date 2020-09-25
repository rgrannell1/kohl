
import React from 'react'
import ink from 'ink'
import {nanoid} from 'nanoid'

const {
  Text
} = ink

import {
  Cursor,
  Lines,
  Patterns,
  Screen,
} from '../commons/types'
import LinesFilter from '../app/LinesFilter.js'

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
  freeLines (screen:Screen) {
    const occupied = 5
    return screen.rows - occupied
  }
  render () {
    const {
      cursor,
      lines,
      screen,
      patterns
    } = this.props

    const filter = new LinesFilter({
      lines,
      patterns
    })

    const lower = cursor.position + this.freeLines(screen)

    const elems = []
    const displayLines = filter.matchingLines(cursor)
      .slice(cursor.position, lower)

    if (displayLines.length === 0) {
      elems.push(<Text key={nanoid()} inverse>No Matches Found</Text>)

      for (let ith = 0; ith < this.freeLines(screen) - 1; ++ith) {
        elems.push(<Text key={nanoid()}> </Text>)
      }
    } else {
      for (let ith = 0; ith < displayLines.length; ++ith) {
        const { text, id } = displayLines[ith]

        const isSelected = ith === 0
        const trimmed = this.trimLine(text, cursor, screen)

        elems.push(<Text key={id} inverse={isSelected}>{trimmed}</Text>)
      }
    }

    return <>{elems}</>
  }
}
