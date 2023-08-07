import { Avatar, Box, Button, Flex, Heading, HStack, Spinner, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { AddButton } from '~/components/AddButton'
import NewActModal from '~/components/pages/NewActModal/NewActModal'
import dayjs from 'dayjs'
import { Act, Beat, Project } from '~/types'
import DeleteDialog from '~/components/DeleteDialog'
import { dataManager } from '~/lib/dataManager'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { sortBy } from 'lodash';
import { EditButton } from '~/components/EditButton'

function DeleteProject(props: { project: Project }) {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const router = useRouter();

  const commitDelete = useCallback(async () => {
    await dataManager.child('projects')!.do.delete(props.project.id);
    router.push('/projects');
  }, [props.project.id]);

  return <>
    <Button onClick={onOpen}
            variant="edit-type-button"
            leftIcon={<CloseIcon color="delete"/>}>Delete</Button>
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

function ActTicket(props: { project: Project, act: Act, beats: Beat[] }) {
  const { act, project, beats } = props;
  if (act.project_id !== project.id || (!act.active)) {
    return null;
  }

  return (
    <Flex layerStyle="act-ticket" direction="row" align="center">
      <Text textStyle="act-order">{act.order}</Text>
      <Box zIndex={20} position="absolute" right={0} top={0}><EditButton>Edit Act</EditButton></Box>
      <VStack alignItems="left" ml={4} width="200px">
        <Heading noOfLines={1} size="md">{act.name}</Heading>
      </VStack>
      <HStack spacing={0}>
        {sortBy(beats, 'order').map((beat) => (
          <Box key={beat.id} layerStyle="act-ticket-beat-outer">
            <Heading variant="atb-name">{beat.name}</Heading>
            <HStack align="center">
              <Box layerStyle="act-ticket-beat">
                <Heading variant="atb-duration" as="h4">
                  {beat.duration}
                </Heading>
                <Text textStyle="atb-title-sub">seconds</Text>
              </Box>
            </HStack>
          </Box>
        ))}

      </HStack>

    </Flex>)
}

export function ProjectTicket(props: {
  loaded: any,
  project: Project,
  loading: any,
  beats: Map<string, Beat[]>,
  acts: Act[]
}) {
  const { loading, loaded, project, acts, beats } = props;

  const { onOpen, isOpen, onClose } = useDisclosure()
  if (!loaded) {
    return loading ? <Spinner size="xl"/> : null;
  }

  if (!project) {
    return <Text textStyle="info">Your project cannot be loaded</Text>
  }

  return <>
    <Flex direction="row" justify="space-between" align="baseline">
      <Box width="200px" > <Text>&quot;{project.name}&quot;</Text></Box>

      <HStack spacing={6}>
        <DeleteProject project={props.project}/>
        <AddButton onClick={onOpen}>Add Act</AddButton>
      </HStack>

      <Box width="200px" textAlign="right" >
        <Text textStyle="info">created {dayjs(project.created_at).format('MMMM D, YYYY')}</Text>
      </Box>
    </Flex>
    <VStack alignItems="start">
      {sortBy(acts, 'order').map((act) => (
        <ActTicket
          key={act.id}
          act={act}
          beats={beats.get(act.id) || []}
          project={project}
        />))}
    </VStack>

    {isOpen ? <NewActModal isOpen={isOpen} onClose={onClose} pid={props.project.id}/> : null}

  </>

}
