
import React from 'react'
import Inkling from 'inkling'
import { Kohl } from '../../src/components/Kohl.js'

let $kohl = new Inkling(({stdin, stdout, ttyIn}) => {
  return <Kohl ttyIn={ttyIn} lineStream={stdin} outputStream={stdout}/>
})

$kohl.stdin.write('a')
$kohl.stdin.write('b')
$kohl.stdin.write('c')
$kohl.stdin.write('d')

$kohl.press({
  name: 'q',
  sequence: 'q',
  meta: false,
  ctrl: false,
  shift: false
})
