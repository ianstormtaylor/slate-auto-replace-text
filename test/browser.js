
import assert from 'assert'
import fs from 'fs'
import metadata from 'read-metadata'
import path from 'path'
import { Raw } from 'slate'

/**
 * Tests.
 *
 * These tests don't work yet, since Phantom isn't good enough to test content
 * editable elements, and browser-side testing can loop over fixtures.
 */

describe('slate-auto-replace-text', () => {
  const dir = path.resolve(__dirname, 'fixtures')
  const fixtures = fs.readdirSync(fixtures)

  for (const fixture of fixtures) {
    const fixDir = path.resolve(__dirname, 'fixtures', fixture)
    const module = require(fixDir)
    const input = metadata.sync(path.resolve(fixDir, 'input.yaml'))
    const output = metadata.sync(path.resolve(fixDir, 'output.yaml'))

    it(fixture, () => {
      const state = Raw.deserialize(input)
      const out = module(state)
      const raw = Raw.serialize(out)
      assert.deepEqual(out, output)
    })
  }
})
