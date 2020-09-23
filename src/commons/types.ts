
import CircularBuffer from "./circular-buffer";

export interface LineData {
  text: string,
  id: number
}

export enum Mode {
  Default,
  ShowCommand,
  EnterCommand
}

export interface Screen {
  rows: number,
  columns: number
}

export interface Cursor {
  position: number,
  column: number
}

export interface Selection {
  count: number,
  total: number
}

export interface Patterns {
  search: string,
  highlight: string
}

export type Lines = CircularBuffer<LineData>

export interface KohlProps {
  screen: Screen,
  cursor: Cursor,
  selection: Selection,
  patterns: Patterns,
  mode: Mode,
  command: string,
  lines: Lines
}

export interface KohlState {
  ttyIn: any,
  screen: Screen,
  cursor: Cursor,
  selection: Selection,
  patterns: Patterns,
  mode: Mode,
  command: string,
  output: CommandStatus,
  lines: Lines,
  displayLines: LineData[],
  lineId: number
}

export interface Key {
  ctrl: Boolean,
  meta: Boolean,
  shift: Boolean,
  sequence: string,
  name: string | undefined
}

export interface CommandStatus {
  status: 0 | 1,
  message?: string,
  result?: Partial<KohlProps>
}
