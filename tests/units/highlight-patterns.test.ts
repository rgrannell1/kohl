
import tap from 'tap'
import {
  matchStringPattern,
  highlightPatterns
} from '../../src/app/highlight-patterns.js'

tap.test('returns expected matches for string patterns', test => {
  const match = matchStringPattern('test', 'test')

  tap.equals(match.length, 1, 'unexpected number of string matches')

  test.end()
})

tap.test('returns original line when provided no patterns', test => {
  const message = 'line'
  const lineData = highlightPatterns(message, [])

  for (let ith = 0; ith < message.length; ++ith) {
    tap.equals(lineData[ith].char, message[ith], 'character mismatch')
    tap.equals(lineData[ith].index, ith, 'index mismatch')
  }

  test.end()
})


tap.test('returns highlighted subsection when provided a string pattern', test => {
  const message = 'part one'
  const lineData =  highlightPatterns(message, [ 'part', 'one' ])

  for (let ith = 0; ith < message.length; ++ith) {
    tap.equals(lineData[ith].char, message[ith])
    tap.equals(lineData[ith].index, ith)

    if (ith < 4) {
      tap.equals(lineData[ith].id, 0)
    } else if (ith > 5) {
      tap.equals(lineData[ith].id, 0)
    }
  }

  test.end()
})
