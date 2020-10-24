
import mustache from 'mustache'
import chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'
import CircularBuffer from '../commons/circular-buffer.js'
import Line from '../app/Line.js'

import { library } from '../library/index.js'
import { fileURLToPath } from 'url'
import { Kohl } from '../components/Kohl.js'
import {
  KohlState,
  LibraryFunction
} from '../commons/types.js'
const __dirname = fileURLToPath(import.meta.url)

type LibraryPair = [string, LibraryFunction]

/**
 * Render the help-page
 *
 * @returns the rendered help-page
 */
export const help = () => {
  // -- read library functions
  const libraryEntries = Object.entries(library).sort((datum0, datum1) => {
    return datum0[0] > datum1[0] ? -1 : +1
  })

  // -- assemble information about the command library in the view.
  const view = {
    procedures: libraryEntries.map((pair:LibraryPair) => {
      const [name, data] = pair
      return {
        name: chalk.underline(name),
        parameters: data.parameters,
        description: data.description
      }
    })
  }

  // -- read help template syncronously
  const content = fs.readFileSync(path.join(__dirname, '../../files/help.mustache'))

  return mustache.render(content.toString(), view)
}

export const loadFile = (content:string):Partial<KohlState> => {
  const lines = content.split('\n')
  const buff = new CircularBuffer<Line>(lines.length)

  for (const line of lines) {
    buff.add(new Line(line))
  }

  return Kohl.defaultState('help', buff)
}
