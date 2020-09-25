
// TODO patch selection.
export default class FilterLines {
  state:any
  constructor (state:any) {
    this.state = state
  }
  total () {
    return this.state.lines.size()
  }
  selected () {
    return this.state.lines.size()
  }
}
