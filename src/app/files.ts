
import {
  Mode
} from '../commons/types.js'

import CircularBuffer from '../commons/circular-buffer.js'
import Line from '../app/Line.js'

export const help = () => {
  return [
    'Kohl',
    '',
    'Library:',
    '  jump:',
    '  q:',
    '  search:',
    '  searchq:',
    '  searchRegexp:',
    '  show:',
    '  showq:',
    '  showRegexp:',
  ].join('\n')
}

export const loadFile = (content:string) => {
  const lines = content.split('\n')
  const buff = new CircularBuffer<Line>(lines.length)

  for (const line of lines) {
    buff.add(new Line(line))
  }

  return {
    cursor: {
      position: 0,
      cursor: 0
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
    lines: buff,
    lineId: 0
  }
}
