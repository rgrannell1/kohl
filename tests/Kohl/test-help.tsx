
import React from 'react'
import { KohlInking } from '../utils.js'
import {
  KeyPress
} from '@rgrannell/inkling'
import tap from 'tap'

/**
 * Check that the app displays "No Matches" by default, when no stdin frames are provided.
 */
const testHelp = () => {
  let $kohl = new KohlInking()

  $kohl.press(new KeyPress('?'))

  // -- check the header displays
  tap.includes($kohl.lastFrame(), 'kohl    line 0      0 / 0 (100%)\n')

  // -- excerps from the help file
  const lines = [
    'Kohl - A pager that highlights logs',
    '1 arg: highlight literal text',
    'https://github.com/rgrannell1/kohl/issues'
  ]

  // -- check the expected row content displays.
  lines.forEach(line => {
    tap.includes($kohl.lastFrame(), line)
  })

  // -- check the footer displays
  tap.includes($kohl.lastFrame(), 'Press / to run command, q to exit, \'?\' for help')

  // -- test exit works from built-in documents
  $kohl.press(new KeyPress('q'))
  $kohl.press(new KeyPress('q'))

  throw new Error('kohl did not exit process upon hitting "q" at the top level; exit flow is broken')
}

testHelp()
