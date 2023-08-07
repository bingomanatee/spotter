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

const PAGE_HEAD = {
  as: 'h1',
  size: 'lg',
  fontSize: '3xl',
  fontWeight: 300,
  color: 'blackAlpha.600',
  textAlign: 'center',
  pb: 4
}

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

const COLORS = {
  accent: 'hsl(30,100%,50%)',
  'add-green': 'hsl(170,100%,30%)',
  'edit-yellow': 'hsl(68,80%,60%)',
  'add-green-disabled': 'hsla(170,100%,30%, 33%)',
  'edit-yellow-disabled': 'hsla(68,100%,60%, 33%)',
  'delete': 'hsl(0,100%,39%)',
  'add-green-dark': 'hsl(170,100%,15%)',
  'dark-accent': 'hsl(30,100%,33%)',
  'x-dark-accent': 'hsl(30,50%,25%)',
  'light-accent': 'hsl(30,100%,75%)',
  'x-light-accent': 'hsl(30,100%,85%)',
  'form-title': 'hsl(244,50%,25%)',
  'nav-x-light': 'hsl(200,100%,75%)',
  'nav-light': 'hsl(200,86%,50%)',
  'nav': 'hsl(200,55%,33%)',
  'nav-dark': 'hsl(200,100%,15%)',
  'editLink': 'hsl(228,70%,50%)',
  'active-button-back': 'hsl(30,50%,25%)',
  'button-back': 'hsl(30,0%,85%)',
  'active-button': 'hsl(30,100%,75%)',
  'inactive-button': 'hsl(150,20%,33%)',
};

const COMPONENTS = {
  Tabs: tabsTheme,
  Button: {
    baseStyle: {
      textTransform: 'uppercase',
      fontWeight: 300,
      p: 0,
      borderRadius: '0.333em',
      lineHeight: '100%',
      _hover: {
        color: 'blue.700'
      }
    },

    variants: {
      'edit-type-button': {
        backgroundColor: "white",
        alignItems: "center",
        p: 1,
        lineHeight: 1,
        h: "auto",
        sx: { paddingInlineStart: 0, paddingInlineEnd: 0 }
      },
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
      'atb-duration': {
        fontWeight: 300,
        m: 0,
        size: "lg",
        p: 0,
        lineHeight: '90%',
      },
      'atb-name': {
        as: 'h4',
        sie: 'md',
        fontSize: 'sm',
        noOfLines: 1,
        pt: 1,
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
        ...PAGE_HEAD
      },
      'page-subhead': {
        ...PAGE_HEAD,
        fontSize: 'md',
        fontWeight: 400
      },
      'page-head-with-sub': {
        ...PAGE_HEAD,
        pb: 0
      }
    }
  },
  Text: {},
  Avatar: {
    variants: {
      order: {
        position: 'absolute',
        left: '3px',
        bottom: '3px',
        size: "sm",
        backgroundColor:"blackAlpha.200",
        color:"black"
      }
    }
  }
};
const TEXT_STYLES = {
  'atb-title-sub': {
    m: 0,
    p: 0,
    fontSize: 'xs',
  },
  'act-order': {
    position: 'absolute',
    left: 2,
    bottom: 1,
    width: '50px',
    fontSize: 'sm',
  },
  'list-item-head': {
    as: 'section',
    px: 4,
    py: 2,
    numLines: 1,
    fontSize: 'lg',
    fontWeight: 500
  },
  'disabled-text': {
    color: 'blackAlpha.300'
  },
  'previs-id': {
    fontSize: '9px',
    position: 'absolute',
    left: '2px',
    top: '2px'
  },
  'label-v': {
    color: 'blackAlpha.700',
    fontSize: 'sm',
    textAlign: 'center',
    numLines: 1,
    textTransform: 'uppercase'
  },
  'label': {
    color: 'blackAlpha.700',
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
};

const LAYER_STYLES = {
  'nav-frame': {
    direction: "row",
    align: "center",
    py: 0, pt: 2, h: 8,
    px: 4,
    w: "100%",
    as: "header",
    zIndex: 100000,
  },
  'act-ticket': {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'teal.300',
    px: 4,
    py: 2,
    my: 0.5,
    boxShadow: 'lg',
    position: 'relative',
    minHeight: '100px',
    w: '100%'
  },
  'act-ticket-beat-outer': {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '5px',
    px: 4,
    maxWidth: '250px',
    ml: 2
  },
  'act-ticket-beat': {
    p: 1,
    alignItems: 'center',
  },
  'runsheet-cell': {
    p: 0,
    m: 0
  },
  'layout-frame': {
    direction: 'column',
    justify: 'stretch',
    width: '100%',
    height: '100%',
    m: 0,
    p: 0,
    as: 'article',
    overflow: 'hidden'
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
  'page-frame-inner': {
    px: 16,
    py: 8,
  },
  'page-frame': {
    width: '100%',
    height: '100%',
    m: 0,
    p: 0,
    overflowY: 'auto'
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
}

const theme = extendTheme({
  layerStyles: LAYER_STYLES,
  colors: COLORS,
  components: COMPONENTS,
  textStyles: TEXT_STYLES
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
