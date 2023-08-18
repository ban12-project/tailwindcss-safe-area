import * as prettier from 'prettier'
import { diff } from 'jest-diff'
import { expect } from '@jest/globals'
import type { MatcherFunction } from 'expect'

function format(input: string) {
  return prettier.format(input, {
    parser: 'css',
    printWidth: 100,
  })
}

// Compare two CSS strings with all whitespace removed
// This is probably naive but it's fast and works well enough.
const toMatchCss: MatcherFunction<[argument: unknown]> = async function (received, argument) {
  if (typeof received !== 'string' || typeof argument !== 'string') {
    throw new Error('These must be of type string!')
  }

  function stripped(str: string) {
    return str.replace(/\s/g, '').replace(/;/g, '')
  }

  const options = {
    comment: 'stripped(received) === stripped(argument)',
    isNot: this.isNot,
    promise: this.promise,
  }

  const pass = stripped(received) === stripped(argument)
  const [formattedReceived, formattedArgument] = await Promise.all([
    format(received),
    format(argument),
  ])

  const message = pass
    ? () => {
        return (
          this.utils.matcherHint('toMatchCss', undefined, undefined, options) +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(formattedReceived)}\n` +
          `Received: ${this.utils.printReceived(formattedArgument)}`
        )
      }
    : () => {
        const actual = formattedReceived
        const expected = formattedArgument

        const diffString = diff(expected, actual, {
          expand: this.expand,
        })

        return (
          this.utils.matcherHint('toMatchCss', undefined, undefined, options) +
          '\n\n' +
          (diffString && diffString.includes('- Expect')
            ? `Difference:\n\n${diffString}`
            : `Expected: ${this.utils.printExpected(expected)}\n` +
              `Received: ${this.utils.printReceived(actual)}`)
        )
      }

  return { actual: received, message, pass }
}

const toIncludeCss: MatcherFunction<[argument: unknown]> = async function (received, argument) {
  if (typeof received !== 'string' || typeof argument !== 'string') {
    throw new Error('These must be of type string!')
  }

  function stripped(str: string) {
    return str.replace('/* prettier-ignore */', '').replace(/\s/g, '').replace(/;/g, '')
  }

  const options = {
    comment: 'stripped(received).includes(stripped(argument))',
    isNot: this.isNot,
    promise: this.promise,
  }

  const pass = stripped(received).includes(stripped(argument))
  const [formattedReceived, formattedArgument] = await Promise.all([
    format(received),
    format(argument),
  ])

  const message = pass
    ? () => {
        return (
          this.utils.matcherHint('toIncludeCss', undefined, undefined, options) +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(formattedReceived)}\n` +
          `Received: ${this.utils.printReceived(formattedArgument)}`
        )
      }
    : () => {
        const actual = formattedReceived
        const expected = formattedArgument

        const diffString = diff(expected, actual, {
          expand: this.expand,
        })

        return (
          this.utils.matcherHint('toIncludeCss', undefined, undefined, options) +
          '\n\n' +
          (diffString && diffString.includes('- Expect')
            ? `Difference:\n\n${diffString}`
            : `Expected: ${this.utils.printExpected(expected)}\n` +
              `Received: ${this.utils.printReceived(actual)}`)
        )
      }

  return { actual: received, message, pass }
}

const toMatchFormattedCss: MatcherFunction<[argument: unknown]> = async function (
  received = '',
  argument = ''
) {
  if (typeof received !== 'string' || typeof argument !== 'string') {
    throw new Error('These must be of type string!')
  }

  function format(input: string) {
    return prettier.format(input.replace(/\n/g, ''), {
      parser: 'css',
      printWidth: 100,
    })
  }
  const options = {
    comment: 'stripped(received) === stripped(argument)',
    isNot: this.isNot,
    promise: this.promise,
  }

  const [formattedReceived, formattedArgument] = await Promise.all([
    format(received),
    format(argument),
  ])
  const pass = formattedReceived === formattedArgument

  const message = pass
    ? () => {
        return (
          this.utils.matcherHint('toMatchCss', undefined, undefined, options) +
          '\n\n' +
          `Expected: not ${this.utils.printExpected(formattedReceived)}\n` +
          `Received: ${this.utils.printReceived(formattedArgument)}`
        )
      }
    : () => {
        const actual = formattedReceived
        const expected = formattedArgument

        const diffString = diff(expected, actual, {
          expand: this.expand,
        })

        return (
          this.utils.matcherHint('toMatchCss', undefined, undefined, options) +
          '\n\n' +
          (diffString && diffString.includes('- Expect')
            ? `Difference:\n\n${diffString}`
            : `Expected: ${this.utils.printExpected(expected)}\n` +
              `Received: ${this.utils.printReceived(actual)}`)
        )
      }

  return { actual: received, message, pass }
}

expect.extend({
  toMatchCss,
  toIncludeCss,
  toMatchFormattedCss,
})

declare module 'expect' {
  interface AsymmetricMatchers {
    toMatchCss(argument: string): void
    toIncludeCss(argument: string): void
    toMatchFormattedCss(argument: string): void
  }
  interface Matchers<R> {
    toMatchCss(argument: string): R
    toIncludeCss(argument: string): R
    toMatchFormattedCss(argument: string): R
  }
}
