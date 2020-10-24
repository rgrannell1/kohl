
import React from 'react'
import Inkling from 'inkling'
import { Kohl } from '../../src/components/Kohl.js'

const $kohl = new Inkling(({stdin, stdout, ttyIn}) => {
  return <Kohl ttyIn={ttyIn} lineStream={stdin} outputStream={stdout}/>
})

$kohl.stdin.write('a')
$kohl.stdin.write('b')
$kohl.stdin.write('c')
$kohl.stdin.write('d')

process.exit(0)
