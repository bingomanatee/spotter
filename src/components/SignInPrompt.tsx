import { Button, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'


export default function SignInPrompt({ children }) {
  const router = useRouter();
  return (
    <HStack spacing={8} alignItems="baseline">
      <Text textStyle="info">{children || 'Please sign in'}
      </Text>
      <Button size="sm">Sign In to Spotter </Button>
    </HStack>
  )
}
