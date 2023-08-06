import { Box, Button, Text } from '@chakra-ui/react'
import AddButtonIcon from '~/components/icons/AddButtonIcon'
import ExitButtonIcon from '~/components/icons/exitButtonIcon'

export function ExitButton({ children, onClick, ...rest }) {
  const icon = <Box h="24px" w="24px" ml={4} color="nav"><ExitButtonIcon/></Box>;
  return (
    <Button onClick={onClick}
            backgroundColor="transparent"
            color="add-green-dark"
            alignItems="center"
            p={2} lineHeight={1.2}
            h="auto"
            sx={{ paddingInlineStart: 0, paddingInlineEnd: 0 }}
            size="lg" leftIcon={icon}
            {...rest}>
      <Text textStyle={rest.disabled ? 'disabled-text' : ''}>{children || 'Cancel'}</Text>
    </Button>
  )
}
