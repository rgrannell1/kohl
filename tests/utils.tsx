
import CircularBuffer from '../src/commons/circular-buffer.js'
import Line from '../src/app/Line.js'
import { Cursor } from '../src/commons/types.js'

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

export const expectedBody = (cursor:Cursor, lines:Line[]) => {
//  const expected = []

//  return expected
}
