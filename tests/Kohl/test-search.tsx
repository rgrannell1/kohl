
import React from 'react'
import { createApp } from '../utils.js'
import {
  KeyPress
} from 'inkling'
import tap from 'tap'

/**
 * Check that the app displays "No Matches" by default, when no stdin frames are provided.
 */
const testSearch = async () => {
  let $kohl = createApp()

  $kohl.stdin.write('testline0\n')
  $kohl.stdin.write('testline1\n')
  $kohl.stdin.write('testline2\n')

  // -- load stdin.
  await $kohl.waitUntil((frame:string) => {
    return frame.includes('testline0') && frame.includes('testline1') && frame.includes('testline2')
  }, 3_000)

  for (let char of '/search "testline1"') {
    $kohl.press(new KeyPress(char))
  }

  // -- check the search is input correctly
  await $kohl.waitUntil((frame:string) => frame.includes('> search "testline1"'), 3_000)

  $kohl.press(new KeyPress('return'))

  // -- check header is narrowed
  tap.includes($kohl.lastFrame(), 'kohl    line 0      1 / 3 (33%)')

  // -- check content is still visible
  tap.includes($kohl.lastFrame(), 'testline1')

  if ($kohl.lastFrame().includes('testline0') || $kohl.lastFrame().includes('testline2')) {
    throw new Error('search did not remove irrelevant lines')
  }

  $kohl.press(new KeyPress('escape'))
  $kohl.press(new KeyPress('q'))
}

testSearch()
