
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
  static OCCUPIED_VERTICAL_LINES = 5
  trimLine(line:string, cursor:Cursor, screen:Screen) {
    const start = cursor.column
    const end = start + screen.columns

    return line.slice(start, end).padEnd(1)
  }
  freeLines (screen:Screen) {
    return screen.rows - Body.OCCUPIED_VERTICAL_LINES
  }
  getBounds (cursor:Cursor, screen:Screen) {
    // -- note neesd to be patched

    if (typeof cursor.column === 'undefined') {
      cursor
    }

    return {
      left: cursor.column,
      right: cursor.column + screen.columns,
      top: cursor.position,
      bottom: cursor.position + this.freeLines(screen)
    }
  }
  render () {
    const {
      cursor,
      lines,
      screen,
      patterns
    } = this.props

    const filter = new LinesFilter({ lines, patterns })
    const displayLines = filter.displayLines(this.getBounds(cursor, screen), {
      showLineNumber: false
    })

    const elems = []
    if (displayLines.length === 0) {
      elems.push(<Text key={nanoid()} inverse>No Matches Found</Text>)

      const fillCount = this.freeLines(screen) - 1
      for (let ith = 0; ith < fillCount; ++ith) {
        elems.push(<Text key={nanoid()}> </Text>)
      }
    } else {
      for (let ith = 0; ith < displayLines.length; ++ith) {
        const { text, id } = displayLines[ith]

        const isSelected = ith === 0
        const trimmed = text.length === 0
          ? ' '
          : text

        elems.push(<Text key={id} inverse={isSelected}>{trimmed}</Text>)
      }
    }

    return <>{elems}</>
  }
}
