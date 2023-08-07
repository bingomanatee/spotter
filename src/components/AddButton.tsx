import { Box, Button, Text } from '@chakra-ui/react'
import AddButtonIcon from '~/components/icons/AddButtonIcon'

export function AddButton({ children, onClick, ...rest }) {
  const iconColor = rest.disabled ? 'add-green-disabled' : "add-green"
  const icon = <Box h="24px" w="24px" ml={2} color={iconColor}><AddButtonIcon/></Box>;
  return (
    <Button onClick={onClick}
            variant="edit-type-button"
            rightIcon={icon}
            {...rest}
    >
      <Text textStyle={rest.disabled ? 'disabled-text' : ''}>  {children}</Text>
    </Button>
  )
}
