#!/usr/bin/env node
import * as fs from 'fs';
import docopt from 'docopt';
import React from 'react';
import ink from 'ink';
import * as tty from 'tty';
import { Kohl } from '../components/Kohl.js';
const { render } = ink;
const docs = `
Name:
  kohl — highlight logs.
Usage:
  kohl
  kohl (-h | --help | --version)

Description:
  kohl is a command-line tool that highlights logs.

Options:
  -h, --help                          Display this documentation.
  --version                           Display the package version.

Authors:
  Róisín Grannell

Version:
  v0.2.0

Copyright:
  The MIT License

  Copyright (c) 2020 Róisín Grannell

  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software, and to permit
  persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies
  or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
  OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
`;
const main = () => {
    docopt.docopt(docs, {});
    const fd = fs.openSync('/dev/tty', 'r+');
    render(React.createElement(React.StrictMode, null,
        React.createElement(Kohl, null)), {
        stdin: new tty.ReadStream(fd, {}),
        stdout: new tty.WriteStream(fd),
        patchConsole: false
    });
};
main();
//# sourceMappingURL=kohl.js.map