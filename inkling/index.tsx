
import React from 'react'
import Inkling from './inkling.js'
import { Kohl } from '../src/components/Kohl.js'

const run = async () => {
  const $kohl = new Inkling(({input, ttyIn}) => {
    return <Kohl lineStream={input} ttyIn={ttyIn}/>
  }, { })

  $kohl.stdin('foo\n')
  $kohl.stdin('foo\n')
  $kohl.stdin('foo\n')

  console.log($kohl.component.getState())
  console.log($kohl.inside.lastFrame())
}

run()
