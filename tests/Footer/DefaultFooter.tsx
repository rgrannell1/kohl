
import tap from 'tap'
import React from 'react'
import {render} from 'ink-testing-library'

import {
  DefaultFooter
} from '../../src/components/Footer.js'

const runDefaultFooterTests = () => {
  const {lastFrame} = render(<DefaultFooter/>)

  tap.includes(lastFrame(), "Press / to run command, q to exit, '?' for help")
}

runDefaultFooterTests()
