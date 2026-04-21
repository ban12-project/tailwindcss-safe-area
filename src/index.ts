import plugin from 'tailwindcss/plugin'

type SafeSide = 'top' | 'right' | 'bottom' | 'left'
type Declaration = Record<string, string>
type UtilityGenerator = (value: string) => Declaration

type PluginApi = {
  addUtilities(utilities: Record<string, Declaration>): void
  matchUtilities(
    utilities: Record<string, UtilityGenerator>,
    options: {
      values: Record<string, string>
      supportsNegativeValues: boolean
    }
  ): void
  theme(path: string): Record<string, string>
}

type DeclarationSpec = {
  property: string
  sides: SafeSide[]
}

type UtilitySpec = {
  className: string
  declarations: DeclarationSpec[]
}

const safeArea = (side: SafeSide) => `env(safe-area-inset-${side})`

const joinSafeAreas = (sides: SafeSide[], valueHandler = (value: string) => value) =>
  sides.map((side) => valueHandler(safeArea(side))).join(' ')

const utility = (
  className: string,
  declarations: Array<[property: string, sides: SafeSide[]]>
): UtilitySpec => ({
  className,
  declarations: declarations.map(([property, sides]) => ({ property, sides })),
})

const allSides: SafeSide[] = ['top', 'right', 'bottom', 'left']

const utilities: UtilitySpec[] = [
  utility('top-safe', [['top', ['top']]]),
  utility('right-safe', [['right', ['right']]]),
  utility('bottom-safe', [['bottom', ['bottom']]]),
  utility('left-safe', [['left', ['left']]]),

  utility('m-safe', [['margin', allSides]]),
  utility('mx-safe', [
    ['marginRight', ['right']],
    ['marginLeft', ['left']],
  ]),
  utility('my-safe', [
    ['marginTop', ['top']],
    ['marginBottom', ['bottom']],
  ]),
  utility('mt-safe', [['marginTop', ['top']]]),
  utility('mr-safe', [['marginRight', ['right']]]),
  utility('mb-safe', [['marginBottom', ['bottom']]]),
  utility('ml-safe', [['marginLeft', ['left']]]),
  utility('ms-safe-top', [['marginInlineStart', ['top']]]),
  utility('ms-safe-right', [['marginInlineStart', ['right']]]),
  utility('ms-safe-bottom', [['marginInlineStart', ['bottom']]]),
  utility('ms-safe-left', [['marginInlineStart', ['left']]]),
  utility('me-safe-top', [['marginInlineEnd', ['top']]]),
  utility('me-safe-right', [['marginInlineEnd', ['right']]]),
  utility('me-safe-bottom', [['marginInlineEnd', ['bottom']]]),
  utility('me-safe-left', [['marginInlineEnd', ['left']]]),

  utility('p-safe', [['padding', allSides]]),
  utility('px-safe', [
    ['paddingRight', ['right']],
    ['paddingLeft', ['left']],
  ]),
  utility('py-safe', [
    ['paddingTop', ['top']],
    ['paddingBottom', ['bottom']],
  ]),
  utility('pt-safe', [['paddingTop', ['top']]]),
  utility('pr-safe', [['paddingRight', ['right']]]),
  utility('pb-safe', [['paddingBottom', ['bottom']]]),
  utility('pl-safe', [['paddingLeft', ['left']]]),
  utility('ps-safe-top', [['paddingInlineStart', ['top']]]),
  utility('ps-safe-right', [['paddingInlineStart', ['right']]]),
  utility('ps-safe-bottom', [['paddingInlineStart', ['bottom']]]),
  utility('ps-safe-left', [['paddingInlineStart', ['left']]]),
  utility('pe-safe-top', [['paddingInlineEnd', ['top']]]),
  utility('pe-safe-right', [['paddingInlineEnd', ['right']]]),
  utility('pe-safe-bottom', [['paddingInlineEnd', ['bottom']]]),
  utility('pe-safe-left', [['paddingInlineEnd', ['left']]]),

  utility('scroll-m-safe', [['scrollMargin', allSides]]),
  utility('scroll-mx-safe', [
    ['scrollMarginLeft', ['left']],
    ['scrollMarginRight', ['right']],
  ]),
  utility('scroll-my-safe', [
    ['scrollMarginTop', ['top']],
    ['scrollMarginBottom', ['bottom']],
  ]),
  utility('scroll-ms-safe', [['scrollMarginInlineStart', ['left']]]),
  utility('scroll-me-safe', [['scrollMarginInlineEnd', ['right']]]),
  utility('scroll-mt-safe', [['scrollMarginTop', ['top']]]),
  utility('scroll-mr-safe', [['scrollMarginRight', ['right']]]),
  utility('scroll-mb-safe', [['scrollMarginBottom', ['bottom']]]),
  utility('scroll-ml-safe', [['scrollMarginLeft', ['left']]]),

  utility('scroll-p-safe', [['scrollPadding', allSides]]),
  utility('scroll-px-safe', [
    ['scrollPaddingLeft', ['left']],
    ['scrollPaddingRight', ['right']],
  ]),
  utility('scroll-py-safe', [
    ['scrollPaddingTop', ['top']],
    ['scrollPaddingBottom', ['bottom']],
  ]),
  utility('scroll-ps-safe', [['scrollPaddingInlineStart', ['left']]]),
  utility('scroll-pe-safe', [['scrollPaddingInlineEnd', ['right']]]),
  utility('scroll-pt-safe', [['scrollPaddingTop', ['top']]]),
  utility('scroll-pr-safe', [['scrollPaddingRight', ['right']]]),
  utility('scroll-pb-safe', [['scrollPaddingBottom', ['bottom']]]),
  utility('scroll-pl-safe', [['scrollPaddingLeft', ['left']]]),
]

const toDeclaration = (
  spec: UtilitySpec,
  valueHandler?: (propertyValue: string) => string
): Declaration =>
  spec.declarations.reduce<Declaration>((declarations, { property, sides }) => {
    declarations[property] = joinSafeAreas(sides, valueHandler)
    return declarations
  }, {})

const safeAreaPlugin: any = plugin(function safeArea({ addUtilities, matchUtilities, theme }: PluginApi) {
  addUtilities(
    utilities.reduce<Record<string, Declaration>>((values, spec) => {
      values[`.${spec.className}`] = toDeclaration(spec)
      return values
    }, {})
  )

  matchUtilities(
    utilities.reduce<Record<string, (value: string) => Declaration>>((values, spec) => {
      values[`${spec.className}-max`] = (value) =>
        toDeclaration(spec, (propertyValue) => `max(${value}, ${propertyValue})`)
      return values
    }, {}),
    {
      values: theme('spacing'),
      supportsNegativeValues: true,
    }
  )
})

export default safeAreaPlugin
