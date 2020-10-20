

import {
  Key,
  KohlState
} from '../commons/types'

export const hasName = (val:string) => {
  return (key:Key) => {
    return key.name === val
  }
}

export const hasSequence = (val:string) => {
  return (key:Key) => {
    return key.sequence === val
  }
}

const asKeyBinding = (key:Key) => {
  if (!key) {
    return
  }

  let id = ''

  if (key.ctrl) {
    id += 'ctrl + '
  }

  if (key.shift) {
    id += 'shift + '
  }

  if (key.sequence) {
    id += key.sequence
  } else if (key.name) {
    id += key.name
  }

  return id
}

export const keypress = (binding:string) => {
  return (key:Key) => {
    return asKeyBinding(key) === binding
  }
}

type KeyHandler = (state:KohlState) => Partial<KohlState> | undefined

export const keyHandler = (handler:KeyHandler) => {
  return (elem:React.Component) => {
    elem.setState((state:KohlState) => {
      return handler(state)
    })
  }
}
