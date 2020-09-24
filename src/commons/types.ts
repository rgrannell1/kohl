
import CircularBuffer from "./circular-buffer";

export interface LineData {
  readonly text: string,
  readonly id: number
}

export enum Mode {
  Default,
  ShowCommand,
  EnterCommand
}

export interface Screen {
  readonly rows: number,
  readonly columns: number
}

export interface Cursor {
  readonly position: number,
  readonly column: number
}

export interface Selection {
  readonly count: number,
  readonly total: number
}

export interface Patterns {
  readonly search: string,
  readonly highlight: string
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
  readonly ctrl: Boolean,
  readonly meta: Boolean,
  readonly shift: Boolean,
  readonly sequence: string,
  readonly name: string | undefined
}

export interface CommandStatus {
  readonly status: 0 | 1,
  readonly message?: string,
  readonly state?: Partial<KohlProps>
}

interface LibraryResult {
  readonly status: 0 | 1,
  readonly message?: string,
  readonly state: Partial<KohlProps>
}

export interface Library {
  [key:string]:(state:KohlProps, ...args:any[]) => LibraryResult
}
