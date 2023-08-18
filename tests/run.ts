import path from 'path'
import { fileURLToPath } from 'url'
import postcss from 'postcss'
import tailwind, { Config } from 'tailwindcss'
import safeArea from '../src'

const __filename = fileURLToPath(import.meta.url)

export let css = String.raw
export let html = String.raw
export let javascript = String.raw

export function run(input: string, config: Config, plugin = tailwind) {
  let { currentTestName } = expect.getState()

  config.plugins ??= []
  if (!config.plugins.includes(safeArea)) {
    config.plugins.push(safeArea)
  }

  return postcss(plugin(config)).process(input, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  })
}
