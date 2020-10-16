
import tap from 'tap'
import React from 'react'
import {render} from 'ink-testing-library'

import {
  CursorLinePosition
} from '../../src/components/Header.js'

const runCursorLinePosition = () => {
  for (let ith = 0; ith < 10; ++ith) {
    let output = `line ${ith}`

    const {lastFrame} = render(<CursorLinePosition position={ith}/>)
    tap.equal(lastFrame(), output)
  }
}

runCursorLinePosition()
