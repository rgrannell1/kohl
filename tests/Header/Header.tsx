
import tap from 'tap'
import React from 'react'
import {render} from 'ink-testing-library'

import {
  Header
} from '../../src/components/Header.js'

import {
  createLines
} from '../utils.js'

interface Case {
  lines: string[],
  patterns: {
    search: string,
    highlight: string
  },
  cursor: {position:number}
  output: string
}

const cases:Case[] = []

cases.push({
  lines: [],
  patterns: {
    search: '',
    highlight: ''
  },
  output: 'kohl    line 0      0 / 0 (100%)\n',
  cursor: {
    position: 0
  }
})

const runHeaderTests = () => {
  for (const {lines, patterns, cursor, output} of cases) {
    const buff = createLines(lines)
    const {lastFrame} = render(<Header lines={buff} patterns={patterns} cursor={cursor}/>)
    tap.equal(lastFrame(), output)
  }
}

runHeaderTests()
