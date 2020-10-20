
import tty from 'tty'
import P from 'parsimmon'
import CircularBuffer from './circular-buffer'
import Line from '../app/Line'

export enum Mode {
  Default,
  ShowCommand,
  EnterCommand
}

export interface MatchData {
  start: number,
  end: number,
  id: number
}

export interface SequenceData {
  char: string,
  index: number,
  id?: number
}

export interface Screen {
  readonly rows: number,
  readonly columns: number
}

export interface Cursor {
  readonly position: number,
  readonly column: number
}

export interface Patterns {
  readonly search: string,
  readonly highlight: string | RegExp
}

export type Lines = CircularBuffer<Line>

export interface KohlProps {
  readonly screen: Screen,
  readonly cursor: Cursor,
  readonly patterns: Patterns,
  readonly mode: Mode,
  readonly command: string,
  readonly lines: Lines
}

export type FileStore = Map<string, KohlState>

export interface KohlState {
  fileId: string,
  ttyIn: tty.ReadStream,
  screen: Screen,
  cursor: Cursor,
  patterns: Patterns,
  mode: Mode,
  command: string,
  output: ExecuteResult,
  lines: Lines,
  lineId: number,
  fileStore: FileStore
}

export interface Key {
  readonly ctrl: Boolean,
  readonly meta: Boolean,
  readonly shift: Boolean,
  readonly sequence: string,
  readonly name: string | undefined
}

export type CommandStatus = Partial<KohlState>

export interface ExecuteResult {
  readonly status: number,
  readonly message?: string,
  readonly state: Partial<KohlState>
}

export type LibraryFunction = (state:KohlProps, ...args:any[]) => CommandStatus
export interface LibraryFunctionMetadata {
  readonly description: string,
  readonly parameters: number
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

export interface Bounds {
  readonly left: number,
  readonly right: number,
  readonly top: number,
  readonly bottom: number
}
