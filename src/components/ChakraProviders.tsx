'use client'
import { extendTheme } from '@chakra-ui/react'
import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys)

// define the base component styles
const tabBaseStyle = definePartsStyle({
  color: 'blackAlpha.200',
  // define the part you're going to style
  tab: {
    m: 0,
    fontWeight: 600,
    size: 'sm',
    borderWidth: '0 0 3px 0 !important',
    _selected: {
      color: 'orange.500'
    },
  },
  tabpanel: {
    p: 0,
  },
})

// export the component theme
const tabsTheme = defineMultiStyleConfig({
  baseStyle: tabBaseStyle,
  defaultProps: {
    size: 'sm',
  }
});

const PREVIS_PANEL = {
  bg: 'white',
  borderColor: 'blackAlpha.300',
  borderWidth: 1,
  borderStyle: 'solid',
  p: 2,
  position: 'relative'
}

const PREVIS_TITLE = {
  mt: 5,
  size: 'sm',
  fontSize: 'md',
  fontWeight: 600,
  color: 'black',
  textAlign: 'center',
  numLines: 1,
  zIndex: 15,
  position: 'relative'
}

const theme = extendTheme({
  layerStyles: {
    'runsheet-cell': {
      p: 0,
      m: 0
    },
    'act-previs': {
      ...PREVIS_PANEL,
      borderColor: 'purple.400',
      borderWidth: '2px',
      borderRadius: '8px'
    },
    'act-previs-start': {
      ...PREVIS_PANEL,
      backgroundColor: 'transparent'
    },
    'beat-previs': {
      ...PREVIS_PANEL,
      backgroundColor: 'whiteAlpha.900',
      borderWidth: 0,
    borderRadius: '8px',
      position: 'relative',
    },
    'beat-previs-time': {
      position: 'absolute',
      right: 20,
      bottom: 0,
      left: 20,
      textAlign: 'center',
      fontSize: 'xs',
      zIndex: 10,
    },
    'text-document': {
      px: 16,
      py: 10,
      h: '100%',
      overflowY: 'auto'
    },
    acts: {
      p: 0,
    },
    'page-frame': {
      width: '100%',
      height: '100%',
      m: 0,
      p: 0,
      backgroundColor: 'gray.200',
      overflow: 'hidden'
    },
    keyHintRow: {
      alignItems: 'baseline',
      backgroundColor: 'rgba(255,255,255,0.8)',
      px: 3,
      py: 2
    },
    newFrame: {
      position: "absolute",
      zIndex: "50",
      background: "black", color: "white",
      pad: 2,
      overflow: "hidden",
    },
    keyHint: {
      px: '3px',
      py: '2px',
      borderRadius: '0.333em',
      borderColor: 'gray.500',
      borderWidth: '1px',
      mr: 4,
      backgroundColor: 'white',
      width: 10,
      justifyContent: 'center',
      flexDirection: 'row',
    }
  },
  colors: {
    accent: 'hsl(30,100%,50%)',
    'dark-accent': 'hsl(30,100%,33%)',
    'x-dark-accent': 'hsl(30,50%,25%)',
    'light-accent': 'hsl(30,100%,75%)',
    'x-light-accent': 'hsl(30,100%,85%)',
    'form-title': 'hsl(244,50%,25%)',
    'nav-x-light': 'hsl(200,100%,90%)',
    'nav-light': 'hsl(200,86%,80%)',
    'nav': 'hsl(200,55%,50%)',
    'nav-dark': 'hsl(200,100%,25%)',
    'editLink': 'hsl(228,70%,50%)',
    'active-button-back': 'hsl(30,50%,25%)',
    'button-back': 'hsl(30,0%,85%)',
    'active-button': 'hsl(30,100%,75%)',
    'inactive-button': 'hsl(150,20%,33%)',
  },
  components: {
    Tabs: tabsTheme,
    Button: {
      baseStyle: {
        textTransform: 'uppercase',
        fontWeight: 300,
        px: '8px',
        py: '2px',
        borderRadius: '0.333em',
        lineHeight: '100%',
        _hover: {
          color: 'blue.700'
        }
      },

      variants: {
        'previs-button': {
          size: 'sm',
          fontSize: 'xs',
          fontWeight: 400,
          color: 'blackAlpha.500',
          isRound: true,
          lineHeight: 1.1,
          height: 'default',
          backgroundColor: 'blackAlpha.100',
          px: 2.5,
          py: 1,
          position: 'absolute',
          zIndex: 20,
          borderRadius: 0,
          _hover: {
            color: 'black',
            backgroundColor: 'light-accent',
          }
        },
        nav: {
          borderColor: 'nav-x-light',
          background: 'white',
          _hover: {
            color: 'nav-dark',
            backgroundColor: 'nav-x-light',
          }
        },
        delete: {
          borderColor: 'red.100',
          color: 'red.500',
          background: 'white',
          _hover: {
            color: 'red.800',
            backgroundColor: 'red.50',
          }
        },
        submit: {
          borderWidth: '1px',
          borderColor: 'light-accent',
          backgroundColor: 'white',
          _hover: {
            color: 'x-dark-accent',
            backgroundColor: 'x-light-accent'
          }
        }
      }
    },
    FormLabel: {
      baseStyle: {
        fontStyle: 'italic',
        color: 'form-title',
        fontWeight: 400,
        fontSize: 'sm',
        mb: '2px'
      }
    },
    Card: {
      variants: {
        ['form-card']: {
          container: {
            borderRadius: 0,
            boxShadow: 'lg',
            Input: {
              backgroundColor: 'white'
            }
          },
          footer: {
            justifyContent: 'flex-end',
            align: 'center',
            width: '100%',
            p: 1
          }
        },
        ['list-item']: {
          header: {
            p: [1, 1.5],
          },
          container: {
            w: "100%",
            m: [0.25, 0.5],
            p: 0,
            borderRadius: 0
          },
          body: {
            borderRadius: 0,
            px: 1.5,
            py: 0.5,

          },
          footer: {
            justifyContent: 'flex-end',
            align: 'center',
            width: '100%',
            p: 1
          }
        }
      }
    },
    Heading: {
      baseStyle: {},
      variants: {
        'act-previs-title': {
          ...PREVIS_TITLE,
          color: 'purple.600',
        },
        'beat-previs-title': {
          ...PREVIS_TITLE
        },
        'act-head': {
          level: 3,
          sie: 'md',
          fontSize: 'md',
          color: 'white',
          pr: 4,
          py: 2
        },
        'page-head': {
          level: 1,
          size: 'lg',
          fontSize: 'md',
          color: 'blackAlpha.600',
          textAlign: 'center',
          pt: 8,
          pb: 4
        }
      }
    },
    Text: {},
  },

  textStyles: {
    'previs-id': {
      fontSize: '9px',
      position: 'absolute',
      left: '2px',
      top: '2px'
    },
    'label-v': {
      color: 'blackAlpha.500',
      fontSize: 'sm',
      textAlign: 'center',
      numLines: 1,
      textTransform: 'uppercase'
    },
    'label': {
      color: 'blackAlpha.500',
      fontSize: 'sm',
      px: 2,
      py: 0.5,
      numLines: 1,
      textTransform: 'uppercase'
    },
    'previs-content': {
      p: 2,
      fontSize: '9pt',
      fontWeight: 500,
      zIndex: 10,
      position: 'relative',
      backgroundColor: 'whiteAlpha.400',
      mt: 4,
    },
    runsheet: {
      fontFamily: 'var(--font-space-mono), monospace',
      fontWeight: 400,
      fontSize: '10pt !important',
      p: 0,
      color: "blackAlpha.800",
      textTransform: 'none',
      pr: 4,
    },
    'runsheet-head': {
      fontFamily: 'var(--font-space-mono), monospace',
      fontWeight: 400,
      fontSize: '10pt !important',
      p: 0,
      color: "purple.700",
      textTransform: 'none'
    },
    par: {
      fontSize: 'md',
      mb: '8',
      mt: '4'
    },
    code: {
      fontFamily: 'var(--font-space-mono), monospace',
      fontSize: 'sm',
      lineHeight: '100%'
    },
    info: {
      fontSize: 'sm',
      color: 'gray.600',
      py: 2,
    }
  }
});

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export function ChakraProviders({ children }: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}
