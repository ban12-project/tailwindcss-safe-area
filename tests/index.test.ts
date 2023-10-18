import { expect } from '@jest/globals'
import { html, css, run } from './run'
import '../jest/custom-matchers'
import { Config } from 'tailwindcss'

it('safe area', () => {
  const config: Config = {
    content: [
      {
        raw: html`
          <div class="top-safe right-safe bottom-safe left-safe"></div>

          <div class="m-safe"></div>
          <div class="mx-safe"></div>
          <div class="my-safe"></div>
          <div class="mt-safe mr-safe mb-safe ml-safe"></div>
          <div class="ms-safe me-safe"></div>
          <div class="ms-safe-top ms-safe-right ms-safe-bottom ms-safe-left"></div>
          <div class="me-safe-top me-safe-right me-safe-bottom me-safe-left"></div>

          <div class="p-safe"></div>
          <div class="px-safe"></div>
          <div class="py-safe"></div>
          <div class="pt-safe pr-safe pb-safe pl-safe"></div>
          <div class="ps-safe-top ps-safe-right ps-safe-bottom ps-safe-left"></div>
          <div class="pe-safe-top pe-safe-right pe-safe-bottom pe-safe-left"></div>

          <div class="scroll-safe-m"></div>
          <div class="scroll-safe-mx"></div>
          <div class="scroll-safe-my"></div>
          <div class="scroll-safe-mt scroll-safe-mr scroll-safe-mb scroll-safe-ml></div>

          <div class="scroll-safe-p"></div>
          <div class="scroll-safe-px"></div>
          <div class="scroll-safe-py"></div>
          <div class="scroll-safe-pt scroll-safe-pr scroll-safe-pb scroll-safe-pl></div>
        `,
      },
    ],
    theme: {},
    corePlugins: { preflight: false },
  }

  const input = css`
    @tailwind utilities;
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .top-safe {
        top: env(safe-area-inset-top);
      }

      .right-safe {
        right: env(safe-area-inset-right);
      }

      .bottom-safe {
        bottom: env(safe-area-inset-bottom);
      }

      .left-safe {
        left: env(safe-area-inset-left);
      }

      .m-safe {
        margin-top: env(safe-area-inset-top);
        margin-right: env(safe-area-inset-right);
        margin-bottom: env(safe-area-inset-bottom);
        margin-left: env(safe-area-inset-left);
      }

      .mx-safe {
        margin-right: env(safe-area-inset-right);
        margin-left: env(safe-area-inset-left);
      }

      .my-safe {
        margin-top: env(safe-area-inset-top);
        margin-bottom: env(safe-area-inset-bottom);
      }

      .mt-safe {
        margin-top: env(safe-area-inset-top);
      }

      .mr-safe {
        margin-right: env(safe-area-inset-right);
      }

      .mb-safe {
        margin-bottom: env(safe-area-inset-bottom);
      }

      .ml-safe {
        margin-left: env(safe-area-inset-left);
      }

      .ms-safe-top {
        margin-inline-start: env(safe-area-inset-top);
      }

      .ms-safe-right {
        margin-inline-start: env(safe-area-inset-right);
      }

      .ms-safe-bottom {
        margin-inline-start: env(safe-area-inset-bottom);
      }

      .ms-safe-left {
        margin-inline-start: env(safe-area-inset-left);
      }

      .me-safe-top {
        margin-inline-end: env(safe-area-inset-top);
      }

      .me-safe-right {
        margin-inline-end: env(safe-area-inset-right);
      }

      .me-safe-bottom {
        margin-inline-end: env(safe-area-inset-bottom);
      }

      .me-safe-left {
        margin-inline-end: env(safe-area-inset-left);
      }

      .p-safe {
        padding-top: env(safe-area-inset-top);
        padding-right: env(safe-area-inset-right);
        padding-bottom: env(safe-area-inset-bottom);
        padding-left: env(safe-area-inset-left);
      }

      .px-safe {
        padding-right: env(safe-area-inset-right);
        padding-left: env(safe-area-inset-left);
      }

      .py-safe {
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
      }

      .pt-safe {
        padding-top: env(safe-area-inset-top);
      }

      .pr-safe {
        padding-right: env(safe-area-inset-right);
      }

      .pb-safe {
        padding-bottom: env(safe-area-inset-bottom);
      }

      .pl-safe {
        padding-left: env(safe-area-inset-left);
      }

      .ps-safe-top {
        padding-inline-start: env(safe-area-inset-top);
      }

      .ps-safe-right {
        padding-inline-start: env(safe-area-inset-right);
      }

      .ps-safe-bottom {
        padding-inline-start: env(safe-area-inset-bottom);
      }

      .ps-safe-left {
        padding-inline-start: env(safe-area-inset-left);
      }

      .pe-safe-top {
        padding-inline-end: env(safe-area-inset-top);
      }

      .pe-safe-right {
        padding-inline-end: env(safe-area-inset-right);
      }

      .pe-safe-bottom {
        padding-inline-end: env(safe-area-inset-bottom);
      }

      .pe-safe-left {
        padding-inline-end: env(safe-area-inset-left);
      }

      .scroll-safe-m {
        scroll-margin-top: env(safe-area-inset-top);
        scroll-margin-right: env(safe-area-inset-right);
        scroll-margin-bottom: env(safe-area-inset-bottom);
        scroll-margin-left: env(safe-area-inset-left);
      }
      .scroll-safe-mx {
        scroll-margin-left: env(safe-area-inset-left);
        scroll-margin-right: env(safe-area-inset-right);
      }
      .scroll-safe-my {
        scroll-margin-top: env(safe-area-inset-top);
        scroll-margin-bottom: env(safe-area-inset-bottom);
      }
      .scroll-safe-mt {
        scroll-margin-top: env(safe-area-inset-top);
      }
      .scroll-safe-mr {
        scroll-margin-right: env(safe-area-inset-right);
      }
      .scroll-safe-mb {
        scroll-margin-bottom: env(safe-area-inset-bottom);
      }
      .scroll-safe-ml {
        scroll-margin-left: env(safe-area-inset-left);
      }

      .scroll-safe-p {
        scroll-padding-top: env(safe-area-inset-top);
        scroll-padding-right: env(safe-area-inset-right);
        scroll-padding-bottom: env(safe-area-inset-bottom);
        scroll-padding-left: env(safe-area-inset-left);
      }
      .scroll-safe-px {
        scroll-padding-left: env(safe-area-inset-left);
        scroll-padding-right: env(safe-area-inset-right);
      }
      .scroll-safe-py {
        scroll-padding-top: env(safe-area-inset-top);
        scroll-padding-bottom: env(safe-area-inset-bottom);
      }
      .scroll-safe-pt {
        scroll-padding-top: env(safe-area-inset-top);
      }
      .scroll-safe-pr {
        scroll-padding-right: env(safe-area-inset-right);
      }
      .scroll-safe-pb {
        scroll-padding-bottom: env(safe-area-inset-bottom);
      }
      .scroll-safe-pl {
        scroll-padding-left: env(safe-area-inset-left);
      }
    `)
  })
})

it('should be possible to use variants', () => {
  const config: Config = {
    content: [
      {
        raw: html`
          <div class="ms-safe-top-max-1 pe-safe-top-max-1"></div>
          <div class="top-safe-max-1"></div>
          <div class="top-safe-max-[1px]"></div>
          <div class="top-safe-max-[var(--css-variable)]"></div>
          <div class="supports-[padding:max(0px)]:top-safe-max-1"></div>

          <div class="scroll-safe-m-max-1"></div>
          <div class="scroll-safe-p-max-1"></div>
        `,
      },
    ],
    theme: {},
    corePlugins: { preflight: false },
  }

  const input = css`
    @tailwind utilities;
  `

  return run(input, config).then((result) => {
    // TODO: The class order here may be different, which may be related to tailwincss.
    expect(result.css).toMatchFormattedCss(css`
      .ms-safe-top-max-1 {
        margin-inline-start: max(0.25rem, env(safe-area-inset-top));
      }

      .pe-safe-top-max-1 {
        padding-inline-end: max(0.25rem, env(safe-area-inset-top));
      }

      .scroll-safe-m-max-1 {
        scroll-margin-top: max(0.25rem, env(safe-area-inset-top));
        scroll-margin-right: max(0.25rem, env(safe-area-inset-right));
        scroll-margin-bottom: max(0.25rem, env(safe-area-inset-bottom));
        scroll-margin-left: max(0.25rem, env(safe-area-inset-left));
      }

      .scroll-safe-p-max-1 {
        scroll-padding-top: max(0.25rem, env(safe-area-inset-top));
        scroll-padding-right: max(0.25rem, env(safe-area-inset-right));
        scroll-padding-bottom: max(0.25rem, env(safe-area-inset-bottom));
        scroll-padding-left: max(0.25rem, env(safe-area-inset-left));
      }

      .top-safe-max-1 {
        top: max(0.25rem, env(safe-area-inset-top));
      }

      .top-safe-max-\[1px\] {
        top: max(1px, env(safe-area-inset-top));
      }

      .top-safe-max-\[var\(--css-variable\)\] {
        top: max(var(--css-variable), env(safe-area-inset-top));
      }

      @supports (padding: max(0px)) {
        .supports-\[padding\:max\(0px\)\]\:top-safe-max-1 {
          top: max(0.25rem, env(safe-area-inset-top));
        }
      }
    `)
  })
})
