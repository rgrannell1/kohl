
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

import mappings from '../keypress/index.js'
import {
  Key,
  KohlProps,
  Mode,
  KohlState
} from '../commons/types.js'

import ink from 'ink'
import Line from '../app/Line.js'
const { Newline } = ink

const ttyReadStream = () => {
  const fd = fs.openSync('/dev/tty', 'r+')
  const stream = new tty.ReadStream(fd, { })

  stream.setRawMode(true)
  return stream
}

export class Kohl extends React.Component<KohlProps, KohlState> {
  static MAX_LINES = 20_000
  constructor (props:KohlProps) {
    super(props)

    const outputStream = props.outputStream ?? process.stdout

    this.state = {
      ...Kohl.defaultState('stdin', new CircularBuffer(Kohl.MAX_LINES)),
      screen: {
        rows: outputStream.rows,
        columns: outputStream.columns
      },
      ttyIn: props.ttyIn ?? ttyReadStream(),
      lineStream: props.lineStream ?? process.stdin,
      outputStream,
      fileStore: new Map<string, KohlState>()
    }
  }
  /**
   * Initialise default state for Kohl
   *
   * React "helpfully" doesn't like nested state objects, so this state is a mess. Rather than using a File
   * object to capture file information, we snapshot states into fileStore before switching to another file
   * stored in fileStore.
   *
   * @param fileId a human-readable ID for the file
   * @param lines a circular buffer containing line data
   *
   * @returns
   */
  static defaultState (fileId:string, lines:CircularBuffer<Line>) {
    return {
      fileId,
      cursor: {
        position: 0,
        column: 0
      },
      patterns: {
        search: '',
        highlight: ''
      },
      mode: Mode.Default,
      command: '',
      output: {
        state: {},
        status: 0
      },
      lines,
      lineId: 0
    }
  }
  readKeyStrokes () {
    readline.emitKeypressEvents(this.state.ttyIn)
    this.state.ttyIn.on('keypress', this.handleKeyPress.bind(this))
  }
  ingestLine (line:string, state:KohlState) {
    state.lines.add(new Line(line))

    return {
      console: {
        rows: state.outputStream.rows,
        columns: state.outputStream.columns
      },
      lines: state.lines,
      lineId: state.lineId + 1
    }
  }
  readStdin () {
    this.state.lineStream
      .pipe(split())
      .pipe(through(line => {
        this.state.lines.add(new Line(line))
      }))
      .on('end', () => {
        this.setState({
          lineId: this.state.lineId + 1
        })
      })
  }
  clearOnResizing () {
    // -- TODO find an unmount, find a more efficient method.
    const resizePid = setInterval(() => {
      const rows = this.state.outputStream.rows
      const columns = this.state.outputStream.columns

      if (rows !== this.state.screen.rows || columns !== this.state.screen.columns) {
        console.clear()
        this.forceUpdate()
      }

      if (typeof rows === 'undefined') {
        throw new TypeError('stdout-rows count not defined; are you piping stdout to a file or program?')
      }
      if (typeof columns === 'undefined') {
        throw new TypeError('stdout-columns count not defined; are you piping stdout to a file or program?')
      }

      this.setState({
        resizePid,
        screen: { rows, columns }
      })
    }, 500)
  }
  componentDidMount () {
    this.readKeyStrokes()
    this.readStdin()
    this.clearOnResizing()
  }
  componentWillUnmount () {
    this.state.ttyIn.removeListener('keypress', this.handleKeyPress)
    clearInterval(this.state.resizePid)
  }
  handleKeyPress (_:any, key:Key) {
    for (const [pred, handler] of mappings.entries()) {
      if (pred(key)) {
        return handler(this, key)
      }
    }

    throw new Error(`unhandled key ${key.sequence}`)
  }
  getState () {
    return this.state
  }
  render () {
    const state = this.state

    return <>
      <Header cursor={state.cursor} lines={state.lines} patterns={state.patterns}/>
      <Body cursor={state.cursor} lines={state.lines} screen={state.screen} patterns={state.patterns}/>
      <Newline/>
      <Footer mode={state.mode} output={state.output} command={state.command}/>
    </>
  }
}
