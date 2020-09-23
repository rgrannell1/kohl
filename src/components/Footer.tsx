
import React from 'react'
import ink from 'ink'

const {
  Box,
  Text,
  Newline,
} = ink

import {
  CommandStatus,
  Mode
} from '../commons/types.js'

interface EnterProps {
  command: string
}

export class EnterCommand extends React.PureComponent<EnterProps> {
  render () {
    const { command } = this.props
    return <Box>
      <Text inverse>&gt; {command}</Text>
    </Box>

  }
}

interface ShowProps {
  command: string
  output: CommandStatus
}

export class ShowCommand extends React.PureComponent<ShowProps> {
  render () {
    const { output } = this.props

    if (output.status === 0) {
      return <Box>
        <Text inverse>✔️ </Text>
      </Box>
    } else if (output.status === 1) {
      return <Box>
        <Text inverse>✕ {output.message}</Text>
      </Box>
    } else {
      throw 'invalid status code.'
    }
  }
}

export class DefaultFooter extends React.PureComponent<{}> {
  render () {
    return <Box>
      <Text inverse>Press / to run command, q to exit, '?' for help</Text>
    </Box>
  }
}

interface FooterProps {
  mode: Mode,
  command: string,
  output: CommandStatus
}

export class Footer extends React.PureComponent<FooterProps> {
  render () {
    const { mode, command, output } = this.props

    if (mode === Mode.EnterCommand) {
      return <EnterCommand command={command}/>
    } else if (mode === Mode.ShowCommand) {
      return <ShowCommand output={output} command={command}/>
    } else {
      return <DefaultFooter ></DefaultFooter>
    }
  }
}
