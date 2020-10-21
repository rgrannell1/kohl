
import * as stream from 'stream'
import tty from 'tty'
import P from 'parsimmon'
import CircularBuffer from './circular-buffer'
import Line from '../app/Line'

export type Pattern = string | RegExp

/**
 * The application mode:
 *
 * - Default: scroll through logs
 * - ShowCommand: display executed command output
 * - EnterCommand: Type in a command
 */
export enum Mode {
  Default,
  ShowCommand,
  EnterCommand
}

/**
 * Data representing a highlighted section of a string. The starting and end index,
 * and an ID for the match.
 */
export interface PatternMatchData {
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
  lineStream: stream.Readable,
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

export interface LibraryFunction {
  (state:KohlProps, ...args:any[]): CommandStatus
  readonly description: string,
  readonly parameters: number
}

export interface Library {
  [key:string]: LibraryFunction
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

export interface Call {
  type: LanguageParts.Call,
  proc: string,
  args: string[]
}
