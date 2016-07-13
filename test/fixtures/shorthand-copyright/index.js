
import AutoReplaceText from '../../..'
import Utils from 'react-addons-test-utils'
import createEditor from '../../helpers/create-editor'
import simulateInput from '../../helpers/simulate-input'

export default function test(state) {
  const text = state.getTextNodes().first()
  state = state
    .transform()
    .collapseToStartOf(text)
    .focus()
    .apply()

  const plugins = [
    AutoReplaceText('(c)', '©')
  ]

  const editor = createEditor(state, plugins)
  const el = Utils.renderIntoDocument(editor)
  const content = el.querySelector('[contenteditable]')

  simulateInput(content, '(c)')

  return editor.state.state
}
