
import tty from 'tty'
import P from 'parsimmon'
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
  ttyIn: tty.ReadStream,
  screen: Screen,
  cursor: Cursor,
  selection: Selection,
  patterns: Patterns,
  mode: Mode,
  command: string,
  output: ExecuteResult,
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

export type CommandStatus = Partial<KohlProps>

export interface ExecuteResult {
  readonly status: number,
  readonly message?: string,
  readonly state: Partial<KohlProps>
}

export type LibraryFunction = (state:KohlProps, ...args:any[]) => CommandStatus
export interface LibraryFunctionMetadata {
  description: string,
  parameters: number
}

export interface Library {
  [key:string]: LibraryFunction & LibraryFunctionMetadata
}

export enum LanguageParts {
  Call,
  Jump
}

export interface Language {
  [key: string]: (p:P.Language) => P.Parser<any>
}

type isKey = (key:Key) => Boolean
type onElem = (ref:React.Component, key:Key) => any

export type KeyMapping = Map<isKey, onElem>
