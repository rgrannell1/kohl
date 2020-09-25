
import {
  isString,
  isRegexp
} from '../commons/checks.js'

import {
  MatchData,
  SequenceData
} from '../commons/types'

const matchStringPattern = (line:string, pattern:string) => {
  // -- return matches for string literals. Not implemented by default
  let id = 0
  const results = [ ]

  for (let ith = 0; ith < line.length - pattern.length; ++ith) {
    let sliced = line.slice(ith, line.length)

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

export const highlightPatterns = (line:string, patterns:string[]) => {
  const allMatches:MatchData[] = []

  let id = 0
  // -- match each pattern as many times as possible using `matchAll`
  for (const pattern of patterns.filter(pattern => pattern.length > 0)) {
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
      let isInMatch = data.index >= match.start && data.index < match.end
      if (isInMatch) {
        data.id = match.id
      }
    }
  }

  return sequence
}
