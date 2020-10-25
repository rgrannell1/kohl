
import React from 'react'
import {
  Inkling,
  KeyPress
} from 'inkling'
import { Kohl } from '../../src/components/Kohl.js'

const createApp = () => {
  return new Inkling(({stdin, stdout, ttyIn}) => {
    return <Kohl ttyIn={ttyIn} lineStream={stdin} outputStream={stdout}/>
  })
}

const testExit = () => {
  let $kohl = createApp()

  $kohl.press(new KeyPress('q'))
}

const testCommandDisplay = () => {
  let $kohl = createApp()

  for (let char of '/testquery') {
    $kohl.press(new KeyPress(char))
  }

  $kohl.press(new KeyPress('q'))
  $kohl.press(KeyPress.ESCAPE)
  $kohl.press(new KeyPress('q'))
}

testExit()
testCommandDisplay()
