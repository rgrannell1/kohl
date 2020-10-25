
import React from 'react'
import { createApp } from '../utils.js'
import {
  KeyPress
} from 'inkling'
import tap from 'tap'

const testExit = () => {
  let $kohl = createApp()

  tap.includes($kohl.lastFrame(), 'No Matches' ,'mismatched empty stdin content')

  $kohl.press(new KeyPress('q'))
}

testExit()
