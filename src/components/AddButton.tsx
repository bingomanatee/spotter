import { Box, Button, Text } from '@chakra-ui/react'
import AddButtonIcon from '~/components/icons/AddButtonIcon'

export function AddButton({ children, onClick, ...rest }) {
  const iconColor = rest.disabled ? 'add-green-disabled' : "add-green"
  const icon = <Box h="24px" w="24px" ml={4} color={iconColor}><AddButtonIcon/></Box>;
  return (
    <Button onClick={onClick}
            backgroundColor="transparent"
            color="add-green-dark"
            alignItems="center"
            p={2} lineHeight={1.2}
            h="auto"
            sx={{ paddingInlineStart: 0, paddingInlineEnd: 0 }}
            size="lg" rightIcon={icon}
            {...rest}
    >
      <Text textStyle={rest.disabled ? 'disabled-text' : ''}>  {children}</Text>
    </Button>
  )
}
