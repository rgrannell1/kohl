
import React from 'react'
import ink from 'ink'

const {
  Box,
  Text ,
  Newline,
} = ink

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

interface SelectionSummaryProps {
  selected: number,
  total: number
}

class SelectionSummary extends React.PureComponent<SelectionSummaryProps> {
  ratio (selected:number, total:number) {
    return Number.isNaN(selected / total)
      ? 100
      : Math.round((selected / total) * 100)
  }
  render () {
    const {selected, total} = this.props
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
  selection: {
    count: number,
    total: number
  }
}

export class Header extends React.Component<HeaderProps> {
  render () {
    return <Box>
      <Box minWidth={8}>
        <Text>kohl<Newline/></Text>
      </Box>
      <CursorLinePosition position={this.props.cursor.position}/>
      <SelectionSummary selected={this.props.selection.count} total={this.props.selection.total}/>
    </Box>
  }
}
