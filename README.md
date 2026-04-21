# @ban12/tailwindcss-safe-area

A plugin for Tailwind CSS v3.2+ and v4 that provides utilities for safe area.

## Installation

Install the plugin from npm:

```sh
npm install -D @ban12/tailwindcss-safe-area
```

With Tailwind CSS v3, add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@ban12/tailwindcss-safe-area'),
    // ...
  ],
}
```

With Tailwind CSS v4, load the plugin from your CSS:

```css
@import "tailwindcss";
@plugin "@ban12/tailwindcss-safe-area";
```

## Usage

Supported css attributes `top` `right` `bottom` `left` `margin` `padding` `margin-inline-start` `margin-inline-end` `padding-inline-start` `padding-inline-end` `scroll-margin` and `scroll-padding`, pre-setting `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`:

```html
<div class="top-safe mx-safe p-safe"></div>
```

```css
.top-safe {
  top: env(safe-area-inset-top);
}

.mx-safe {
  margin-right: env(safe-area-inset-right);
  margin-left: env(safe-area-inset-left);
}

.p-safe {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

### With `max()` and `@supports`

> The `max()` CSS function lets you set the largest (most positive) value from a list of comma-separated expressions as the value of a CSS property value, the @supports CSS at-rule lets you specify CSS declarations that depend on a browser's support for CSS features:

```html
<div class="top-safe-max-1 supports-[padding:max(0px)]:top-safe-max-1"></div>
```

```css
.top-safe-max-1 {
  top: max(0.25rem, env(safe-area-inset-top));
}
@supports (padding: max(0px)) {
  .supports-\[padding\:max\(0px\)\]\:top-safe-max-1 {
    top: max(0.25rem, env(safe-area-inset-top));
  }
}
```

## Reference

Class name and generated css attribute:

| Name                                                             | CSS                                             |
| ---------------------------------------------------------------- | ----------------------------------------------- |
| `top-safe mt-safe pt-safe [ms \| me \| ps \| pe]-safe-top`       | `safe-area-inset-top`                           |
| `right-safe mr-safe pr-safe [ms \| me \| ps \| pe]-safe-right`   | `safe-area-inset-right`                         |
| `bottom-safe mb-safe pb-safe [ms \| me \| ps \| pe]-safe-bottom` | `safe-area-inset-bottom`                        |
| `left-safe ml-safe pl-safe [ms \| me \| ps \| pe]-safe-left`     | `safe-area-inset-left`                          |
| `m-safe p-safe scroll-m-safe scroll-p-safe`                      | `top \| right \| bottom \| left`                |
| `mx-safe px-safe scroll-mx-safe scroll-px-safe`                  | `safe-area-inset-left \| safe-area-inset-right` |
| `my-safe py-safe scroll-my-safe scroll-py-safe`                  | `safe-area-inset-top \| safe-area-inset-bottom` |
| `scroll-ms-safe scroll-ps-safe`                                  | `safe-area-inset-left`                          |
| `scroll-me-safe scroll-pe-safe`                                  | `safe-area-inset-right`                         |

Every utility also supports a `-max-*` form using the Tailwind spacing scale or an arbitrary value:

```html
<div class="pb-safe-max-4 scroll-m-safe-max-[12px]"></div>
```
