import { Avatar, Box, Button, Flex, Heading, HStack, Spinner, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { AddButton } from '~/components/AddButton'
import NewActModal from '~/components/pages/NewActModal/NewActModal'
import dayjs from 'dayjs'
import { Act, Project } from '~/types'
import DeleteDialog from '~/components/DeleteDialog'
import { dataManager } from '~/lib/dataManager'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {sortBy} from 'lodash';

function DeleteProject(props: { project: Project }) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const router = useRouter();

  const commitDelete = useCallback(async () => {
    await dataManager.child('projects')!.do.delete(props.project.id);
    router.push('/projects');
  }, [props.project.id]);

  return <>
    <Button onClick={onOpen} backgroundColor="white" leftIcon={<CloseIcon color="delete"/>}>Delete</Button>
    {isOpen ? (
      <DeleteDialog
        title={`Delete project "${props.project.name}`}
        onDone={onClose}
        onDelete={commitDelete}
      >
        The project and all related acts and beats will be deactivated
      </DeleteDialog>
    ) : null}
  </>
}

function ActTicket(props: { project: Project, act: Act }) {
  const { act, project } = props;
  if (act.project_id !== project.id || (!act.active)) {
    return null;
  }

  return (<Box layerStyle="act-ticket">
    <Flex direction="row" align="center">
      <Avatar backgroundColor="blackAlpha.200" color="black" size="sm" name={`${act.order}`}></Avatar>
      <VStack alignItems="left" ml={4}>
        <Heading size="md">{act.name}</Heading>
        <Text textStyle="info">{act.id}</Text>
      </VStack>
    </Flex>
  </Box>)
}

export function ProjectTicket(props: { loaded: any, project: Project, loafing: any, acts: Act[] }) {
  const { loading, loaded, project, acts } = props;

  const { onOpen, isOpen, onClose } = useDisclosure()
  if (!loaded) {
    return loading ? <Spinner size="xl"/> : null;
  }

  if (!project) {
    return <Text textStyle="info">Your project cannot be loaded</Text>
  }

  return <>
    <Flex direction="row" justify="space-between" align="baseline">
      <Box width="15%"> <Text>&quot;{project.name}&quot;</Text></Box>

      <HStack spacing={6}>
        <DeleteProject project={props.project}/>
        <AddButton onClick={onOpen}>Add Act</AddButton>
      </HStack>

      <Box width="15%" textAlign="right">
        <Text textStyle="info">created {dayjs(project.created_at).format('MMMM D, YYYY')}</Text>
      </Box>
    </Flex>
    <VStack alignItems="start">
      {sortBy(acts, 'roder').map((act) => (<ActTicket key={act.id} act={act} project={project}/>))}
    </VStack>

    {isOpen ? <NewActModal isOpen={isOpen} onClose={onClose} pid={props.project.id}/> : null}

  </>

}
