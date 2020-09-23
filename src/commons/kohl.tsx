
import React from 'react'
import readline from 'readline'

import * as tty from 'tty'
import * as fs from 'fs'
import split from 'split'
import through from 'through'

import { Header } from '../components/Header.js'
import { Footer } from '../components/Footer.js'
import { Body } from '../components/Body.js'

import CircularBuffer from './circular-buffer.js'

import mappings from '../app/keypress/index.js'
import {
  KohlProps,
  Mode,
  LineData,
  KohlState
} from './types.js'

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

    this.state = {
      screen: {
        rows: process.stdout.rows,
        columns: process.stdout.columns
      },
      cursor: {
        position: 0,
        column: 0
      },
      selection: {
        count: 0,
        total: 0
      },
      patterns: {
        search: '',
        highlight: ''
      },
      mode: Mode.Default,
      command: '',
      output: {
        status: 0
      },
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
  handleKeyPress (ch:any, key:any) {
    for (const [pred, handler] of mappings.entries()) {
      if (pred(key)) {
        return handler(this, key)
      }
    }

    throw new Error(key)
  }
  render () {
    const {
      command,
      cursor,
      lines,
      mode,
      output,
      screen,
      selection
    } = this.state

    return <>
      <Header cursor={cursor} selection={selection}/>
      <Body cursor={cursor} lines={lines} screen={screen}/>
      <Newline/>
      <Footer mode={mode} output={output} command={command}/>
    </>
  }
}
