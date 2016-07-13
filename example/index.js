
import AutoReplaceText from '..'
import React from 'react'
import ReactDOM from 'react-dom'
import initialState from './state.json'
import { Editor, Raw } from 'slate'

class Example extends React.Component {

  plugins = [
    AutoReplaceText('(c)', '©'),
    AutoReplaceText('(tm)', '™'),
    AutoReplaceText('->', '⟶'),
    AutoReplaceText('<-', '⟵'),
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
  ];

  state = {
    state: Raw.deserialize(initialState)
  };

  onChange = (state) => {
    this.setState({ state })
  }

  render = () => {
    return (
      <Editor
        onChange={this.onChange}
        plugins={this.plugins}
        state={this.state.state}
      />
    )
  }

}

const example = <Example />
const root = document.body.querySelector('main')
ReactDOM.render(example, root)
