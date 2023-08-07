import { Box, Button, Text } from '@chakra-ui/react'
import EditButtonIcon from '~/components/icons/EdiButtonIcon'

export function EditButton({ children, onClick, ...rest }) {
  const iconColor = rest.disabled ? 'edit-yellow-disabled' : "edit-yellow"
  const icon = <Box h="24px" w="24px" ml={2} color={iconColor}><EditButtonIcon/></Box>;
  return (
    <Button onClick={onClick}
            color="add-green-dark"
            variant="edit-type-button"
            rightIcon={icon}
            {...rest}
    >
      <Text textStyle={rest.disabled ? 'disabled-text' : ''}>  {children}</Text>
    </Button>
  )
}
