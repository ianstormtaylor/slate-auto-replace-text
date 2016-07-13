
import escapeRegex from 'escape-regex-string'
import typeOf from 'component-type'

/**
 * A Slate plugin to automatically replace a string of matching text when typed.
 *
 * @param {Mixed} ...args
 * @return {Object}
 */

function AutoReplaceTextPlugin(...args) {
  let opts

  // Allow for double string argument shorthand.
  if (args.length > 1) {
    opts = args[2] ? { ...args[2] } : {}
    const parsed = parseTrigger(args[0])
    opts.trigger = normalizeTrigger(parsed.trigger)
    opts.matchBefore = parsed.matchBefore
    opts.replacement = normalizeReplacement(args[1])
  } else {
    opts = { ...args[0] }
    opts.trigger = normalizeTrigger(opts.trigger)
    opts.replacement = normalizeReplacement(opts.replacement)
  }

  const {
    trigger,
    matchBefore,
    matchAfter,
    replacement,
    onlyIn,
    ignoreIn
  } = opts

  if (!trigger) throw new Error('You must provide a `trigger`.')
  if (!replacement) throw new Error('You must provide a `replacement`.')

  /**
   * On before input, trigger a replacement if the character matches.
   *
   * @param {Event} e
   * @param {State} state
   * @param {Editor} editor
   * @return {State}
   */

  function onBeforeInput(e, state, editor) {
    if (state.isExpanded) return
    if (!trigger(e)) return

    const block = state.startBlock
    const type = block.type
    if (onlyIn && !onlyIn.includes(type)) return
    if (ignoreIn && ignoreIn.includes(type)) return

    const matches = getMatches(state)
    if (!matches) return

    const { start, end } = getOffsets(matches, state.startOffset)
    const text = replacement(e.data, matches)

    e.preventDefault()

    return state
      .transform()
      .moveToOffsets(start, end)
      .insertText(text)
      .apply()
  }

  /**
   * Try to match a `state` with the `matchBefore` and `matchAfter` regexes.
   *
   * @param {State} state
   * @return {Object}
   */

  function getMatches(state) {
    const { startText, startOffset } = state
    const { text } = startText
    let after = null
    let before = null

    if (matchAfter) {
      const string = text.slice(startOffset)
      after = string.match(matchAfter)
    }

    if (matchBefore) {
      const string = text.slice(0, startOffset)
      before = string.match(matchBefore)
    }

    // If both sides, require that both are matched, otherwise null.
    if (matchBefore && matchAfter && !before) after = null
    if (matchBefore && matchAfter && !after) before = null

    // Return null unless we have a match.
    if (!before && !after) return null
    return { before, after }
  }

  /**
   * Return the offsets for `matches` with `start` offset.
   *
   * @param {Object} matches
   * @param {Number} start
   * @return {Object}
   */

  function getOffsets(matches, start) {
    const { before, after } = matches
    let end = start

    if (before && before[1]) start -= before[1].length
    if (after && after[1]) end += after[1].length

    return { start, end }
  }

  /**
   * Return the plugin.
   */

  return {
    onBeforeInput
  }
}

/**
 * Parse a `trigger` string into a trigger and before matcher.
 *
 * @param {String} trigger
 * @return {Object}
 */

function parseTrigger(trigger) {
  const index = trigger.length - 1
  const before = trigger.slice(0, index)
  const last = trigger.slice(index)
  return {
    trigger: last,
    matchBefore: new RegExp(`(${escapeRegex(before)})$`)
  }
}

/**
 * Normalize a `trigger` option to a matching function.
 *
 * @param {Mixed} trigger
 * @return {Function}
 */

function normalizeTrigger(trigger) {
  switch (typeOf(trigger)) {
    case 'regexp': return e => !!e.data.match(trigger)
    case 'string': return e => e.data == trigger
  }
}

/**
 * Normalize a `replacement` option to a function.
 *
 * @param {Mixed} replacement
 * @return {Function}
 */

function normalizeReplacement(replacement) {
  switch (typeOf(replacement)) {
    case 'function': return replacement
    case 'string': return char => replacement
  }
}

/**
 * Export.
 */

export default AutoReplaceTextPlugin
