
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

export class CursorLinePosition extends React.PureComponent<CursorLineProps> {
  render ( ) {
    return <Box minWidth={12}>
      <Text>
        line {this.props.position}
      </Text>
    </Box>
  }
}

interface SelectionSummaryProps {
  lines: Lines,
  patterns: Patterns
}

interface SelectionSummaryState {
  lineLength: number
}

export class SelectionSummary extends React.Component<SelectionSummaryProps, SelectionSummaryState> {
  constructor (props:SelectionSummaryProps) {
    super(props)

    this.state = {
      lineLength: 0
    }
  }
  ratio (selected:number, total:number) {
    return total === 0
      ? 100
      : Math.round((selected / total) * 100)
  }
  shouldComponentUpdate () {
    // -- pure components perform shallow reference checks, meaning lines can change in length
    // -- without triggering a re-render. This insures a re-render takes place.

    const hasSameLength = this.state.lineLength !== this.props.lines.size()

    if (!hasSameLength) {
      this.setState({
        lineLength: this.props.lines.size()
      })

      return true
    }

    return false
  }
  render () {
    const {
      lines,
      patterns
    } = this.props

    const filter = new LinesFilter({
      lines: lines,
      patterns: patterns
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
