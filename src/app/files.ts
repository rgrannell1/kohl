
import {
  Mode
} from '../commons/types.js'
import {library} from '../library/index.js'

import mustache from 'mustache'

import chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'
import CircularBuffer from '../commons/circular-buffer.js'
import Line from '../app/Line.js'

import { fileURLToPath } from 'url'
const __dirname = fileURLToPath(import.meta.url)

export const help = () => {
  const libraryEntries = Object.entries(library).sort((datum0, datum1) => {
    return datum0[0] > datum1[0] ? -1 : +1
  })

  const view = {
    procedures: libraryEntries.map((pair:any) => {
      const [name, data] = pair
      return {
        name: chalk.underline(name),
        parameters: data.parameters,
        description: data.description
      }
    })
  }

  const content = fs.readFileSync(path.join(__dirname, '../../files/help.mustache'))

  return mustache.render(content.toString(), view)
}

export const loadFile = (content:string) => {
  const lines = content.split('\n')
  const buff = new CircularBuffer<Line>(lines.length)

  for (const line of lines) {
    buff.add(new Line(line))
  }

  return {
    fileId: 'help',
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
    lines: buff,
    lineId: 0
  }
}
