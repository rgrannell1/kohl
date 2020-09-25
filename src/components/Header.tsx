
import React from 'react'
import ink from 'ink'
import FilterLines from '../app/filter-lines'

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

class SelectionSummary extends React.PureComponent<any> {
  ratio (selected:number, total:number) {
    return Number.isNaN(selected / total)
      ? 100
      : Math.round((selected / total) * 100)
  }
  computeSelection () {
    return {
      selected: 10,
      total: 10
    }
  }
  render () {
    const filter = new FilterLines({
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
  lines: any,
  patterns: Patterns
}

export class Header extends React.Component<HeaderProps> {
  render () {
    const {
      cursor,
      lines,
      patterns
    } = this.props

    return <Box>
      <Box minWidth={8}>
        <Text>kohl<Newline/></Text>
      </Box>
      <CursorLinePosition position={this.props.cursor.position}/>
      <SelectionSummary lines={lines} patterns={patterns}/>
    </Box>
  }
}
