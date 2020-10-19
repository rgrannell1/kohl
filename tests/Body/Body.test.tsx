
import tap from 'tap'
import React from 'react'
import {render} from 'ink-testing-library'

import {
  createLines
} from '../utils.js'

import {
  Body
} from '../../src/components/Body.js'

const cases = [
  {
    cursor: {
      position: 0,
      column: 0
    },
    lines: [],
    screen: {
      rows: 10,
      columns: 100
    },
    patterns: {
      search: '',
      highlight: ''
    },
    expected: 'No Matches Found'
  }
]

const runBodyComponent = () => {
  for (const { cursor, lines, screen, patterns, expected } of cases) {
    const buff = createLines(lines)

    const {lastFrame} = render(<Body cursor={cursor} lines={buff} screen={screen} patterns={patterns}/>)
    tap.includes(lastFrame(), expected)
  }
}

runBodyComponent()
