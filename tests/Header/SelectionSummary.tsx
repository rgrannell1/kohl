
import tap from 'tap'
import React from 'react'
import {render} from 'ink-testing-library';

import {
  SelectionSummary
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
  output: string
}

const cases:Case[] = []

// -- empty case
cases.push({
  lines: [],
  patterns: {
    search: '',
    highlight: ''
  },
  output: '0 / 0 (100%)'
})

// -- lines but no matching patterns
cases.push({
  lines: ['a', 'b', 'c'],
  patterns: {
    search: 'd',
    highlight: ''
  },
  output: '0 / 3 (0%)'
})

// -- single match
cases.push({
  lines: ['a', 'b', 'c'],
  patterns: {
    search: 'a',
    highlight: ''
  },
  output: '1 / 3 (33%)'
})

// -- all match
cases.push({
  lines: ['a', 'a', 'a'],
  patterns: {
    search: 'a',
    highlight: ''
  },
  output: '3 / 3 (100%)'
})


const runSelectionSummaryTests = () => {
  for (const { lines, patterns, output } of cases) {
    const {lastFrame} = render(<SelectionSummary lines={createLines(lines)} patterns={patterns}/>)

    tap.equal(lastFrame(), output)
  }
}

runSelectionSummaryTests()
