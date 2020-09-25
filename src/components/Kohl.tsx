
import React from 'react'
import readline from 'readline'

import * as tty from 'tty'
import * as fs from 'fs'
import split from 'split'
import through from 'through'

import { Header } from './Header.js'
import { Footer } from './Footer.js'
import { Body } from './Body.js'

import CircularBuffer from '../commons/circular-buffer.js'

import mappings from '../app/keypress/index.js'
import {
  Key,
  KohlProps,
  Mode,
  LineData,
  KohlState
} from '../commons/types.js'

import ink from 'ink'
const { Newline } = ink

const lineMatchesPattern = (pattern:string, line:string):Boolean => {
  return line.includes(pattern)
}

export class Kohl extends React.Component<{}, KohlState> {
  constructor (props:KohlProps) {
    super(props)

    const fd = fs.openSync('/dev/tty', 'r+')
    const ttyIn = new tty.ReadStream(fd, { })
    const lines:CircularBuffer<LineData> = new CircularBuffer(20_000)

    const screen = {
      rows: process.stdout.rows,
      columns: process.stdout.columns
    }

    // -- the current row and line position of the available text.
    const cursor = {
      position: 0,
      column: 0
    }

    // -- the total line count, and the selected line-count
    const selection = {
      count: 0,
      total: 0
    }
    const patterns = {
      search: '',
      highlight: ''
    }
    const output = {
      state: {},
      status: 0
    }

    this.state = {
      screen,
      cursor,
      selection,
      patterns,
      mode: Mode.Default,
      command: '',
      output,
      ttyIn,
      lines,
      displayLines: [],
      lineId: 0
    }
  }
  readKeyStrokes () {
    readline.emitKeypressEvents(this.state.ttyIn)
    this.state.ttyIn.on('keypress', this.handleKeyPress.bind(this))
    this.state.ttyIn.setRawMode(true)
  }
  ingestLine (line:string, state:KohlState) {
    const isMatch = lineMatchesPattern(state.patterns.search, line)
    const selection = {
      count: state.selection.count + (isMatch ? 1 : 0),
      total: state.selection.total + 1
    }

    state.lines.add({
      text: line,
      id: state.lineId
    })

    return {
      console: {
        rows: process.stdout.rows,
        columns: process.stdout.columns
      },
      selection,
      lines: state.lines,
      lineId: state.lineId + 1
    }
  }
  readStdin () {
    process.stdin
      .pipe(split())
      .pipe(through(line => {
        this.setState(this.ingestLine.bind(this, line))
      }))
  }
  componentDidMount () {
    this.readKeyStrokes()
    this.readStdin()
  }
  componentWillUnmount () {
    this.state.ttyIn.removeListener('keypress', this.handleKeyPress)
  }
  handleKeyPress (ch:any, key:Key) {
    for (const [pred, handler] of mappings.entries()) {
      if (pred(key)) {
        return handler(this, key)
      }
    }

    throw new Error(`unhandled key ${key.sequence}`)
  }
  render () {
    const {
      command,
      cursor,
      lines,
      mode,
      output,
      screen,
      patterns
    } = this.state

    return <>
      <Header cursor={cursor}/>
      <Body cursor={cursor} lines={lines} screen={screen} patterns={patterns}/>
      <Newline/>
      <Footer mode={mode} output={output} command={command}/>
    </>
  }
}
