
import React from 'react'
import {
  Inkling,
  KeyPress
} from '@rgrannell/inkling'
import { Kohl } from '../src/components/Kohl.js'

import CircularBuffer from '../src/commons/circular-buffer.js'
import Line from '../src/app/Line.js'

/**
 * Construct a lines buffer from text lines.
 *
 * @param lines
 */
export const createLines = (lines:string[]) => {
  const buff = new CircularBuffer<Line>(100)

  for (const line of lines) {
    buff.add(new Line(line))
  }

  return buff
}

export class KohlInking extends Inkling {
  constructor () {
    super(({stdin, stdout, ttyIn}) => {
      return <Kohl ttyIn={ttyIn} lineStream={stdin} outputStream={stdout}/>
    })
  }
  q () {
    this.press(new KeyPress('q'))
  }
  escape () {
    this.press(KeyPress.ESCAPE)
  }
  toStdin (lines:string[]) {
    lines.forEach(line => {
      this.stdin.write(`${line}\n`)
    })
  }
}
