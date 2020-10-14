
import React from 'react'
import ink from 'ink'
import LinesFilter from '../app/LinesFilter.js'

import {
  Lines
} from '../commons/types'

const {
  Box,
  Text ,
  Newline,
} = ink

import {
  Patterns
} from '../commons/types'

interface CursorLineProps {
  position: number
}

class CursorLinePosition extends React.PureComponent<CursorLineProps> {
  render ( ) {
    return <Box minWidth={12}>
      <Text>
        line {this.props.position}
      </Text>
    </Box>
  }
}

export class SelectionSummary extends React.PureComponent<any> {
  ratio (selected:number, total:number) {
    return Number.isNaN(selected / total)
      ? 100
      : Math.round((selected / total) * 100)
  }
  render () {
    const filter = new LinesFilter({
      lines: this.props.lines,
      patterns: this.props.patterns
    })

    const total = filter.total()
    const selected = filter.selected()

    const ratio = this.ratio(selected, total)

    const strings = {
      ratio: ratio.toLocaleString(),
      total: total.toLocaleString(),
      selected: selected.toLocaleString()
    }

    return <Text>
      {strings.selected} / {strings.total} ({strings.ratio}%)
    </Text>
  }
}

interface HeaderProps {
  cursor: {
    position: number
  },
  lines: Lines,
  patterns: Patterns
}

export class Header extends React.PureComponent<HeaderProps> {
  render () {
    const {
      lines,
      patterns,
      cursor
    } = this.props

    return <Box>
      <Box minWidth={8}>
        <Text>kohl<Newline/></Text>
      </Box>
      <CursorLinePosition position={cursor.position}/>
      <SelectionSummary lines={lines} patterns={patterns}/>
    </Box>
  }
}
