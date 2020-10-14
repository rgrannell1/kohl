
import * as assert from 'assert'
import React from 'react'
import {render} from 'ink-testing-library';

import {
  SelectionSummary
} from '../src/components/Header.js'
import CircularBuffer from '../src/commons/circular-buffer.js';

const {lastFrame} = render(<SelectionSummary lines={new CircularBuffer(10)} patterns={{}}/>)

assert.strictEqual(lastFrame(), '0 / 0 (100%)')
