
import React from 'react'
import { Editor } from 'slate'

/**
 * Create a new `Editor` with `initial` state and `plugins`.
 *
 * @param {State} initial
 * @param {Array} plugins
 * @return {Editor}
 */

function createEditor(initial, plugins) {
  return class Test extends React.Component {
    state = initial;
    onChange = (state) => this.setState({ state })
    render = () => {
      return (
        <Editor
          onChange={this.onChange}
          plugins={plugins}
          state={this.state.state}
        />
      )
    }
  }
}

/**
 * Export.
 */

export default createEditor
