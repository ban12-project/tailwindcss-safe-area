import { expect } from '@jest/globals'
import path from 'path'
import { pathToFileURL } from 'url'
import { compile } from 'tailwindcss'
import safeArea from '../src'
import { css } from './run'
import '../jest/custom-matchers'

const candidates = [
  'top-safe',
  'right-safe',
  'm-safe',
  'mx-safe',
  'p-safe',
  'scroll-ms-safe',
  'scroll-p-safe',
  'top-safe-max-1',
  '-top-safe-max-1',
  'top-safe-max-[1px]',
  'top-safe-max-[var(--css-variable)]',
  'supports-[padding:max(0px)]:top-safe-max-1',
  'scroll-m-safe-max-1',
]

async function compileWithPlugin(plugin: unknown) {
  return compile('@plugin "safe-area"; @tailwind utilities;', {
    base: process.cwd(),
    loadModule: async () => ({
      module: plugin,
      base: process.cwd(),
    }),
  })
}

it('supports Tailwind CSS v4 plugin compatibility from source', async () => {
  const compiler = await compileWithPlugin(safeArea)
  const result = compiler.build(candidates)

  await expect(result).toIncludeCss(css`
    .-top-safe-max-1 {
      top: max(calc(0.25rem * -1), env(safe-area-inset-top));
    }
  `)

  await expect(result).toIncludeCss(css`
    .top-safe {
      top: env(safe-area-inset-top);
    }
  `)

  await expect(result).toIncludeCss(css`
    .right-safe {
      right: env(safe-area-inset-right);
    }
  `)

  await expect(result).toIncludeCss(css`
    .m-safe {
      margin: env(safe-area-inset-top) env(safe-area-inset-right)
        env(safe-area-inset-bottom) env(safe-area-inset-left);
    }
  `)

  await expect(result).toIncludeCss(css`
    .mx-safe {
      margin-right: env(safe-area-inset-right);
      margin-left: env(safe-area-inset-left);
    }
  `)

  await expect(result).toIncludeCss(css`
    .p-safe {
      padding: env(safe-area-inset-top) env(safe-area-inset-right)
        env(safe-area-inset-bottom) env(safe-area-inset-left);
    }
  `)

  await expect(result).toIncludeCss(css`
    .scroll-ms-safe {
      scroll-margin-inline-start: env(safe-area-inset-left);
    }
  `)

  await expect(result).toIncludeCss(css`
    .scroll-p-safe {
      scroll-padding: env(safe-area-inset-top) env(safe-area-inset-right)
        env(safe-area-inset-bottom) env(safe-area-inset-left);
    }
  `)

  await expect(result).toIncludeCss(css`
    .top-safe-max-1 {
      top: max(0.25rem, env(safe-area-inset-top));
    }
  `)

  await expect(result).toIncludeCss(css`
    .top-safe-max-\[1px\] {
      top: max(1px, env(safe-area-inset-top));
    }
  `)

  await expect(result).toIncludeCss(css`
    .top-safe-max-\[var\(--css-variable\)\] {
      top: max(var(--css-variable), env(safe-area-inset-top));
    }
  `)

  await expect(result).toIncludeCss(css`
    .scroll-m-safe-max-1 {
      scroll-margin: max(0.25rem, env(safe-area-inset-top))
        max(0.25rem, env(safe-area-inset-right)) max(0.25rem, env(safe-area-inset-bottom))
        max(0.25rem, env(safe-area-inset-left));
    }
  `)

  await expect(result).toIncludeCss(css`
    .supports-\[padding\:max\(0px\)\]\:top-safe-max-1 {
      @supports (padding: max(0px)) {
        top: max(0.25rem, env(safe-area-inset-top));
      }
    }
  `)
})

it('supports Tailwind CSS v4 @plugin loading from dist', async () => {
  const compiler = await compile('@plugin "./dist/index.mjs"; @tailwind utilities;', {
    base: process.cwd(),
    loadModule: async (id, base) => ({
      module: (await import(pathToFileURL(path.resolve(base, id)).href)).default,
      base,
    }),
  })

  const result = compiler.build(['top-safe', 'scroll-m-safe-max-1', '-top-safe-max-1'])

  await expect(result).toIncludeCss(css`
    .-top-safe-max-1 {
      top: max(calc(0.25rem * -1), env(safe-area-inset-top));
    }
  `)

  await expect(result).toIncludeCss(css`
    .top-safe {
      top: env(safe-area-inset-top);
    }
  `)

  await expect(result).toIncludeCss(css`
    .scroll-m-safe-max-1 {
      scroll-margin: max(0.25rem, env(safe-area-inset-top))
        max(0.25rem, env(safe-area-inset-right)) max(0.25rem, env(safe-area-inset-bottom))
        max(0.25rem, env(safe-area-inset-left));
    }
  `)
})
