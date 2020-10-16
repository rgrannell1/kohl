
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
