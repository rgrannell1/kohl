
import React from 'react'
import { KohlInking } from '../utils.js'
import {
  KeyPress
} from '@rgrannell/inkling'
import tap from 'tap'

/**
 * check that typing a command displays as expected.
 */
const testCommandDisplay = () => {
  let $kohl = new KohlInking()

  for (let char of '/testquery') {
    $kohl.press(new KeyPress(char))
  }

  tap.includes($kohl.lastFrame(), '> testquery', 'did not find "testquery" in body')

  $kohl.press(new KeyPress('q'))
  $kohl.press(KeyPress.ESCAPE)
  $kohl.press(new KeyPress('q'))
}

testCommandDisplay()
