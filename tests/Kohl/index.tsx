
import React from 'react'
import Inkling from 'inkling'
import { Kohl } from '../../src/components/Kohl.js'

const createApp = () => {
  return new Inkling(({stdin, stdout, ttyIn}) => {
    return <Kohl ttyIn={ttyIn} lineStream={stdin} outputStream={stdout}/>
  })
}

const testExit = () => {
  let $kohl = createApp()

//  $kohl.stdin.write('a\n')
//  $kohl.stdin.write('b\n')
//  $kohl.stdin.write('c\n')
//  $kohl.stdin.write('d\n')

  $kohl.press({
    name: 'q',
    sequence: 'q',
    meta: false,
    ctrl: false,
    shift: false
  })
}

testExit()
