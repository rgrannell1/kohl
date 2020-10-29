
import React from 'react'
import { KohlInking } from '../utils.js'
import {
  KeyPress
} from '@rgrannell/inkling'
import tap from 'tap'

/**
 * Check that the app displays "No Matches" by default, when no stdin frames are provided.
 */
const testExit = () => {
  let $kohl = new KohlInking()

  tap.includes($kohl.lastFrame(), 'No Matches' ,'mismatched empty stdin content')

  $kohl.q()

  throw new Error('kohl did not exit process upon hitting "q" at the top level; exit flow is broken')
}

testExit()
