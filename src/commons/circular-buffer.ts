
export default class CircularBuffer <I> {
  idx: number
  private _size: number
  private _capacity: number
  readonly buffer: I[]

  constructor (capacity:number) {
    this.idx = 0
    this._size = 0
    this._capacity = capacity
    this.buffer = new Array(capacity)
  }

  size () {
    return this._size
  }

  capacity () {
    return this._capacity
  }

  add (elem:I) {
    this.buffer[this.idx % this._capacity] = elem
    this.idx++
    this._size = Math.min(this._size + 1, this._capacity)
  }

  has (elem:I) {
    for (const candidate of this.values()) {
      if (candidate === elem) {
        return true
      }
    }

    return false
  }

  get (elem:I) {
    for (const candidate of this.values()) {
      if (candidate === elem) {
        return candidate
      }
    }

    return null
  }

  values () {
    // -- start with the oldest modded by size
    const next = this.idx % this._size

    const elems = []
    // -- retrieve #size elements
    for (let ith = 0; ith < this._size; ++ith) {
      // -- construct a circular index starting from the oldest element
      const idx = (next + ith) % this._size
      elems.push(this.buffer[idx])
    }

    return elems
  }

  slice (start?:number, end?:number) {
    return this.values().slice(start, end)
  }
}
