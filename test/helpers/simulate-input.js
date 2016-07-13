
import Utils from 'react-addons-test-utils'

/**
 * Simulate inputing a `string` into an `el`.
 *
 * @param {Element} el
 * @param {String} string
 */

function simulateInput(el, string) {
  string
    .split('')
    .forEach((char) => {
      Utils.Simulate.input(el, { data: char })
    })
}

/**
 * Export.
 */

export default simulateInput
