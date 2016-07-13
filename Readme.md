
# `slate-auto-replace-text`

A Slate plugin to automatically replace a string of matching text when typed.


## Install

```
npm install slate-auto-replace-text
```


## Simple Usage

```js
import Replace from 'slate-auto-replace-text'

const plugins = [
  Replace('(c)', '©')
]
```

#### Arguments

- `trigger: String` — the string of text to match for replacing.
- `replacement: String` — the string of text to replace the trigger with.
- `[options: Object]` — a dictionary of extra options, see [Advanced Usage](#advanced-usage)

  
## Advanced Usage

```js
import Replace from 'slate-auto-replace-text'

const plugins = [
  AutoReplaceText({
    trigger: '"',
    matchBefore: /[a-zA-Z]$/,
    replacement: '”'
  }),
  AutoReplaceText({
    trigger: /^[a-zA-Z0-9]$/,
    matchBefore: /(?:^|[^a-zA-Z0-9])(")$/,
    replacement: char => `“${char}`
  })
]
```

#### Arguments

- `options: Object` — a dictionary of options.
  - `trigger: String || Regexp` — the trigger to match the inputed character against.
  - `replacement: String || Function` — the string or function to replace the character with.
  - `[matchBefore: Regexp]` — a regexp that must match the text before the trigger for the replacement to occur.
  - `[matchAfter: Regexp]` — a regexp that must match the text after the trigger for the replacement to occur.
  - `[ignoreIn: Array]` — an array of block types to ignore replacement inside.
  - `[onlyIn: Array]` — an array of block types to only replace inside.


## License

The MIT License

Copyright &copy; 2016, [Ian Storm Taylor](https://ianstormtaylor.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
