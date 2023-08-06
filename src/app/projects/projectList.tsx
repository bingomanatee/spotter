import { Project } from '~/types'
import { Avatar, Box, Flex, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import GoIcon from '~/components/icons/GoIcon'
import { memo } from 'react'
import { useRouter } from 'next/navigation'

const PAIcon = memo(() => {
  return <Box height={8} color="white" ml={8}>
    <GoIcon/>
  </Box>
})

function ProjectListItem(props: { project: Project }) {
  const router = useRouter();
  const { project } = props;
  return (
    <Flex m={4}>
      <Button w="100%" height="auto" py={2} backgroundColor="blackAlpha.50"
              onClick={() => router.push(`/project/${project.id}`)}
      >
        <Flex w="100%" direction="row" justify="space-between" alignItems="center">
          <Avatar name={project.name} size="lg" iconLabel={project.name}></Avatar>
          <VStack spacing={0}>
            <Text py={0} size="sm">{project.name}</Text>
            <Text py={0} textStyle="info" fontSize="xs">{project.id}</Text>
          </VStack>
          <PAIcon/>
        </Flex>
      </Button>
    </Flex>
  );
}

export function ProjectsList(props: { projects: Project[] }) {
  const { projects } = props;
  if (!projects.length) {
    return (
      <Box maxWidth="50vw">
        <Text textStyle="info">You have not created any projects</Text>
      </Box>
    )
  }

  return (<Box maxHeight="max(50vh, 300px)" overflowY="auto">
    {projects.map(project => (<ProjectListItem key={project.id} project={project}/>))}
  </Box>)
}
