"use client"

import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import Link, { useRouter } from 'next/navigation'

export default function Welcome({ children }) {
  const router = useRouter();
  return (
    <Box layerStyle="page-frame">
      <Box layerStyle="page-frame-inner">
        <Heading size="xl">Welcome to Spotter</Heading>
        <Text size="lg">
          Spotter allows you to edit sequential media (video/audio)
          with event timestamps and content
        </Text>
        <HStack justify="center" m={4}>
          <Button onClick={() => router.push('/projects')} colorScheme="teal">View or Create a Project</Button>
        </HStack>
        {children}
      </Box>
    </Box>);
}
