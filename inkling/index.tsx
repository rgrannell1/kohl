
import * as tty from 'tty'
import * as fs from 'fs'

import React from 'react'
import type { ReactElement } from 'react'
import {render} from 'ink-testing-library'

import { Kohl } from '../src/components/Kohl.js'
import { seq } from 'parsimmon'

interface Instance {
  lastFrame: () => string | undefined,
  rerender: (tree:ReactElement) => void,
  frames: string[],
  unmount: () => void,
  cleanup: () => void
}

class Inkling {
  inside:Instance
  constructor (component:() => any) {
    this.inside = render(component())
    return this
  }
  async wait (time:number) {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }
  async stdin (content:string) {
    return new Promise(resolve => {
      process.stdin.write(content, () => resolve())
    })
  }
  async type (sequence:string) {
    const fd = fs.openSync('/dev/tty', 'r+')
    const writeStream = new tty.WriteStream(fd)


    for (const char in sequence.split('')) {
      await new Promise(resolve => {
        writeStream.write(char, () => {
          resolve()
        })
      })
    }
  }
}

const run = async () => {
  const $ref = new Inkling(() => <Kohl/>)
  await $ref.stdin('foo\nbar\nbaz')

  console.log($ref.inside.lastFrame())

  await $ref.wait(1000)
  await $ref.type('?/search foo\r')
  await $ref.wait(1000)

  console.log($ref.inside.lastFrame())

  // -- check content
}

run()
