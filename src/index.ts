import plugin from 'tailwindcss/plugin'
import { CSSRuleObject } from 'tailwindcss/types/config'

export default plugin(function safeArea({ addUtilities, matchUtilities, theme }) {
  const baseUtilities = {
    '.top-safe': {
      top: 'env(safe-area-inset-top)',
    },
    '.right-safe': {
      right: 'env(safe-area-inset-right)',
    },
    '.bottom-safe': {
      bottom: 'env(safe-area-inset-bottom)',
    },
    '.left-safe': {
      left: 'env(safe-area-inset-left)',
    },
    '.m-safe': {
      marginTop: 'env(safe-area-inset-top)',
      marginRight: 'env(safe-area-inset-right)',
      marginBottom: 'env(safe-area-inset-bottom)',
      marginLeft: 'env(safe-area-inset-left)',
    },
    '.mx-safe': {
      marginRight: 'env(safe-area-inset-right)',
      marginLeft: 'env(safe-area-inset-left)',
    },
    '.my-safe': {
      marginTop: 'env(safe-area-inset-top)',
      marginBottom: 'env(safe-area-inset-bottom)',
    },
    '.mt-safe': {
      marginTop: 'env(safe-area-inset-top)',
    },
    '.mr-safe': {
      marginRight: 'env(safe-area-inset-right)',
    },
    '.mb-safe': {
      marginBottom: 'env(safe-area-inset-bottom)',
    },
    '.ml-safe': {
      marginLeft: 'env(safe-area-inset-left)',
    },
    '.ms-safe-top': {
      marginInlineStart: 'env(safe-area-inset-top)',
    },
    '.ms-safe-right': {
      marginInlineStart: 'env(safe-area-inset-right)',
    },
    '.ms-safe-bottom': {
      marginInlineStart: 'env(safe-area-inset-bottom)',
    },
    '.ms-safe-left': {
      marginInlineStart: 'env(safe-area-inset-left)',
    },
    '.me-safe-top': {
      marginInlineEnd: 'env(safe-area-inset-top)',
    },
    '.me-safe-right': {
      marginInlineEnd: 'env(safe-area-inset-right)',
    },
    '.me-safe-bottom': {
      marginInlineEnd: 'env(safe-area-inset-bottom)',
    },
    '.me-safe-left': {
      marginInlineEnd: 'env(safe-area-inset-left)',
    },
    '.p-safe': {
      paddingTop: 'env(safe-area-inset-top)',
      paddingRight: 'env(safe-area-inset-right)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      paddingLeft: 'env(safe-area-inset-left)',
    },
    '.px-safe': {
      paddingRight: 'env(safe-area-inset-right)',
      paddingLeft: 'env(safe-area-inset-left)',
    },
    '.py-safe': {
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    },
    '.pt-safe': {
      paddingTop: 'env(safe-area-inset-top)',
    },
    '.pr-safe': {
      paddingRight: 'env(safe-area-inset-right)',
    },
    '.pb-safe': {
      paddingBottom: 'env(safe-area-inset-bottom)',
    },
    '.pl-safe': {
      paddingLeft: 'env(safe-area-inset-left)',
    },
    '.ps-safe-top': {
      paddingInlineStart: 'env(safe-area-inset-top)',
    },
    '.ps-safe-right': {
      paddingInlineStart: 'env(safe-area-inset-right)',
    },
    '.ps-safe-bottom': {
      paddingInlineStart: 'env(safe-area-inset-bottom)',
    },
    '.ps-safe-left': {
      paddingInlineStart: 'env(safe-area-inset-left)',
    },
    '.pe-safe-top': {
      paddingInlineEnd: 'env(safe-area-inset-top)',
    },
    '.pe-safe-right': {
      paddingInlineEnd: 'env(safe-area-inset-right)',
    },
    '.pe-safe-bottom': {
      paddingInlineEnd: 'env(safe-area-inset-bottom)',
    },
    '.pe-safe-left': {
      paddingInlineEnd: 'env(safe-area-inset-left)',
    },
    /* Scroll Margin */
    '.scroll-safe-m': {
      scrollMarginTop: 'env(safe-area-inset-top)',
      scrollMarginRight: 'env(safe-area-inset-right)',
      scrollMarginBottom: 'env(safe-area-inset-bottom)',
      scrollMarginLeft: 'env(safe-area-inset-left)',
    },
    '.scroll-safe-mx': {
      scrollMarginLeft: 'env(safe-area-inset-left)',
      scrollMarginRight: 'env(safe-area-inset-right)',
    },
    '.scroll-safe-my': {
      scrollMarginTop: 'env(safe-area-inset-top)',
      scrollMarginBottom: 'env(safe-area-inset-bottom)',
    },
    /* '.scroll-safe-ms': {
      scrollMarginInlineStart: 'env(safe-area-inset-left)',
    },
    '.scroll-safe-me': {
      scrollMarginInlineEnd: 'env(safe-area-inset-right)',
    }, */
    '.scroll-safe-mt': {
      scrollMarginTop: 'env(safe-area-inset-top)',
    },
    '.scroll-safe-mr': {
      scrollMarginRight: 'env(safe-area-inset-right)',
    },
    '.scroll-safe-mb': {
      scrollMarginBottom: 'env(safe-area-inset-bottom)',
    },
    '.scroll-safe-ml': {
      scrollMarginLeft: 'env(safe-area-inset-left)',
    },
    /* Scroll Padding */
    '.scroll-safe-p': {
      scrollPaddingTop: 'env(safe-area-inset-top)',
      scrollPaddingRight: 'env(safe-area-inset-right)',
      scrollPaddingBottom: 'env(safe-area-inset-bottom)',
      scrollPaddingLeft: 'env(safe-area-inset-left)',
    },
    '.scroll-safe-px': {
      scrollPaddingLeft: 'env(safe-area-inset-left)',
      scrollPaddingRight: 'env(safe-area-inset-right)',
    },
    '.scroll-safe-py': {
      scrollPaddingTop: 'env(safe-area-inset-top)',
      scrollPaddingBottom: 'env(safe-area-inset-bottom)',
    },
    /* '.scroll-safe-ps': {
      scrollPaddingInlineStart: 'env(safe-area-inset-left)',
    },
    '.scroll-safe-pe': {
      scrollPaddingInlineEnd: 'env(safe-area-inset-right)',
    }, */
    '.scroll-safe-pt': {
      scrollPaddingTop: 'env(safe-area-inset-top)',
    },
    '.scroll-safe-pr': {
      scrollPaddingRight: 'env(safe-area-inset-right)',
    },
    '.scroll-safe-pb': {
      scrollPaddingBottom: 'env(safe-area-inset-bottom)',
    },
    '.scroll-safe-pl': {
      scrollPaddingLeft: 'env(safe-area-inset-left)',
    },
  }
  addUtilities(baseUtilities)

  const genVariants = (
    selectorHandler: (selector: string) => string,
    propertyValueHandler: (value: string, propertyValue: string) => string,
    base = baseUtilities
  ) => {
    const genDeclaration = (declaration: Record<string, string>) => (value: string) =>
      Object.entries(declaration).reduce<CSSRuleObject>((properties, [property, propertyValue]) => {
        properties[property] = propertyValueHandler(value, propertyValue)
        return properties
      }, {})

    return Object.entries(base).reduce<Record<string, (value: string) => CSSRuleObject>>(
      (values, [selector, declaration]) => {
        values[selectorHandler(selector.slice(1))] = genDeclaration(declaration)
        return values
      },
      {}
    )
  }

  matchUtilities(
    genVariants(
      (selector) => `${selector}-max`,
      (value, propertyValue) => `max(${value}, ${propertyValue})`
    ),
    {
      values: theme('spacing'),
      supportsNegativeValues: true,
    }
  )
})
