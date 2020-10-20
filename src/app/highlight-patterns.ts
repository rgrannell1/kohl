
import ansi from 'ansi-styles'

import {
  MatchData,
  SequenceData
} from '../commons/types'

import {
  sequenceBy,
  isString,
  isRegexp
} from '../commons/utils.js'

const matchStringPattern = (line:string, pattern:string) => {
  // -- return matches for string literals. Not implemented by default
  let id = 0
  const results = []

  for (let ith = 0; ith < line.length - pattern.length; ++ith) {
    const sliced = line.slice(ith, line.length)

    if (sliced.startsWith(pattern)) {
      results.push({
        start: ith,
        end: ith + pattern.length,
        id
      })

      ith += pattern.length
      id++
    }
  }

  return results
}

const matchPattern = (line:string, pattern:string | RegExp) => {
  const lineType = Object.prototype.toString.call(pattern).slice(8, -1).toLowerCase()

  if (isString(pattern)) {
    return matchStringPattern(line, pattern)
  } else if (isRegexp(pattern)) {
    const results = [...line.matchAll(pattern)].map((match, ith):MatchData => {
      if (typeof match.index === 'undefined') {
        throw new TypeError('index was not defined.')
      }

      return {
        start: match.index,
        end: match.index + match[0].length,
        id: ith
      }
    })

    return results
  } else {
    throw new TypeError('invalid type provided.')
  }
}

type Pattern = string | RegExp

export const highlightPatterns = (line:string, patterns:Pattern[]) => {
  const allMatches:MatchData[] = []

  const id = 0
  // -- match each pattern as many times as possible using `matchAll`
  for (const pattern of patterns) {
    // -- note: does not work with strings;
    allMatches.push(...matchPattern(line, pattern))
  }

  // -- convert to characters and indices.
  const sequence = line.split('').map((char, index):SequenceData => {
    return { char, index }
  })

  // -- tag each character by match, preferring later matches.
  for (const match of allMatches) {
    for (const data of sequence) {
      const isInMatch = data.index >= match.start && data.index < match.end
      if (isInMatch) {
        data.id = match.id
      }
    }
  }

  return sequence
}

interface Elem {
  id: number
}

const displayColours = [
  'green',
  'red',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'black',
  'white',
  'gray',
  'grey'
]

const displayText = displayColours.map((colour:string) => {
  return (text:string) => {
    return `${ansi[colour].open}${text}${ansi[colour].close}`
  }
})

const formatText = (chars:string, id?:number) => {
  if (typeof id !== 'undefined' && Number.isInteger(id)) {
    const colourId = id % displayText.length
    return displayText[colourId](chars)
  } else {
    return chars
  }
}

const hasSameId = (elem0:Elem, elem1:Elem) => {
  return elem0.id === elem1.id
}

export const formatString = (parts:SequenceData[]) => {
  let message = ''

  const grouped = sequenceBy(hasSameId, parts)
  for (const stretch of grouped) {
    const chars = stretch.map(group => group.char)
    const [{ id }] = stretch

    message += formatText(chars.join(''), id)
  }

  return message
}
