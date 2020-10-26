
import React from 'react'
import { createApp } from '../utils.js'
import {
  KeyPress
} from '@rgrannell/inkling'
import tap from 'tap'

/**
 * Check that the app displays "No Matches" by default, when no stdin frames are provided.
 */
const testStdin = async () => {
  let $kohl = createApp()

  $kohl.stdin.write('testline0\n')
  $kohl.stdin.write('testline1\n')
  $kohl.stdin.write('testline2\n')

  // -- load stdin.
  await $kohl.waitUntil((frame:string) => {
    return frame.includes('testline0') && frame.includes('testline1') && frame.includes('testline2')
  }, 3_000)

  // -- check header has updated (currently failing without pressing up first). This should be removed
  // -- in future
  $kohl.press(new KeyPress('up'))

  tap.includes($kohl.lastFrame(), 'kohl    line 0      3 / 3 (100%)')

  $kohl.press(new KeyPress('q'))
}

testStdin()
