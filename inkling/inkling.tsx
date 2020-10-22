
import * as tty from 'tty'
import * as fs from 'fs'

import * as stream from 'stream'

import React from 'react'
import type { ReactElement } from 'react'
import {render} from 'ink-testing-library'

import { Kohl } from '../src/components/Kohl.js'
import { seq } from 'parsimmon'
import { stdin } from 'tap'

interface Instance {
  lastFrame: () => string | undefined,
  rerender: (tree:ReactElement) => void,
  frames: string[],
  unmount: () => void,
  cleanup: () => void
}

interface InkingOpts {
  input: any,
  ttyIn: any
}

interface ConstructorArgs {
  input?: any,
  ttyIn?: any
}

export default class Inkling {
  input:any
  ttyIn:any
  inside:Instance
  entries:string[]
  //component:ReactElement
  component:any

  constructor (component:(args:ConstructorArgs) => any, opts:Partial<InkingOpts>) {
    const fd = fs.openSync('/dev/tty', 'r+')
    this.input = this.stubStdin() //opts.input || process.stdin
    this.ttyIn = opts.ttyIn || new tty.ReadStream(fd)

    this.component = component({
      input: this.input,
      ttyIn: this.ttyIn
    })

    this.inside = render(this.component)
    this.entries = []

    return this
  }
  stubStdin () {
    const self = this
    const stdin = new stream.Readable()

    stdin.read = function () {

      if (self.entries.length > 0) {
        this.push(self.entries.pop())
      }

      if (self.entries === null) {
        this.push(null)
      }
    }

    return stdin
  }
  async wait (time:number) {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }
  stdin (content:string) {
    this.entries.push(content)
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
