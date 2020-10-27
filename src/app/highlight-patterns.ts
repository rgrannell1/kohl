
import ansi from 'ansi-styles'

import {
  PatternMatchData,
  SequenceData
} from '../commons/types'

import {
  sequenceBy,
  isString,
  isRegexp,
  hashSignature
} from '../commons/utils.js'

export const matchStringPattern = (line:string, pattern:string) => {
  // -- return matches for string literals. Not implemented by default
  let id = 0
  const results = []

  for (let ith = 0; ith <= line.length - pattern.length; ++ith) {
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

export const matchPattern = (line:string, pattern:string | RegExp) => {
  const lineType = Object.prototype.toString.call(pattern).slice(8, -1).toLowerCase()

  if (isString(pattern)) {
    return matchStringPattern(line, pattern)
  } else if (isRegexp(pattern)) {
    const results = [...line.matchAll(pattern)].map((match, ith):PatternMatchData => {
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
  const allMatches:PatternMatchData[] = []
  const id = 0
  // -- match each pattern as many times as possible using `matchAll`
  for (const pattern of patterns) {
    // -- note: does not work with strings;
    allMatches.push (...matchPattern(line, pattern))
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

/**
 *
 *
 * @param parts
 */
export const joinHighlightedParts = (parts:SequenceData[]) => {
  return sequenceBy(hasSameId, parts).map(stretch => {
    const chars = stretch.map(group => group.char)
    const [{ id }] = stretch

    return formatText(chars.join(''), id)
  }).join('')
}

let cache = new Map<string, string>()

/**
 * Cache highlighted lines. Maps preserve insertion order so
 * removing head entries will remove the least-recently-used items. Given user's are normally
 * scrolling it makes sense to remove from the head.
 *
 * @param cache a cache of lines
 */
const clearCache = (cache:any) => {
  const maxSize = 1e3

  if (cache.size <= maxSize) {
    return
  } else {
    cache = new Map()

    let count = 0
    for (let key of Object.entries(cache)) {
      cache.remove(key)
      count++

      // -- arbitrary.
      if (count > maxSize / 2) {
        break
      }
    }
  }
}

/**
 * highlight the visible string subsection. This is the computationally intensive part of the program
 * so it's memoised. This is measured as producting approximately an x10 performance gain for this function.
 *
 * @param text the line text
 * @param patterns the search and highlight patterns for the program
 * @param start the start index of the string subsection
 * @param end the end index of the string subsection
 *
 * @returns an ansi string
 */
export const highlightLineSegmentPatterns = (text:string, patterns:Pattern[], start:number, end:number) => {
  const signature = hashSignature([text, patterns, start, end])
  const cacheEntry = cache.get(signature)

  clearCache(cache)

  if (typeof cacheEntry !== 'undefined') {
    return cacheEntry
  }

  const result = joinHighlightedParts(highlightPatterns(text, patterns).slice(start, end))

  cache.set(signature, result)

  return result
}
