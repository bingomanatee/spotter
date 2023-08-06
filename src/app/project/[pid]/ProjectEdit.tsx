import { useState, useEffect, useCallback } from 'react';
import styles from './ProjectEdit.module.scss';
import stateFactory from './ProjectEdit.state.ts';
import useForest from '~/components/utils/useForest'
import { Box, Flex, Button, Heading, HStack, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import useForestFiltered from '~/components/utils/useForestFiltered'
import { userManager } from '~/lib/userManager'
import dayjs from 'dayjs'
import AddButtonIcon from '~/components/icons/AddButtonIcon'
import { CloseIcon } from '@chakra-ui/icons'
import { AddButton } from '~/components/AddButton'
import NewActModal from '~/components/pages/NewActModal/NewActModal'

type ProjectEditProps = { projectId: string }

function ProjectTicket(props: { loaded: any, project: any, loafing: any }) {
  const { loading, loaded, project } = props;

  const {onOpen, isOpen, onClose} = useDisclosure()
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
        <Button backgroundColor="white" leftIcon={<CloseIcon color="delete" />}>Delete</Button>
        <AddButton onClick={onOpen}>Add Act</AddButton>
      </HStack>

      <Box width="15%" textAlign="right">
        <Text textStyle="info">created {dayjs(project.created_at).format('MMMM D, YYYY')}</Text>
      </Box>
    </Flex>
    <NewActModal isOpen={isOpen} onClose={onClose} pid={props.project.id} />
  </>

}

export default function ProjectEdit(props: ProjectEditProps) {
  const user = useForestFiltered(userManager, (value) => {
    console.log('uff value is ', value);
    return value.user;
  });
  const [value, state] = useForest([stateFactory, props], () => {
    setTimeout(() => {
      if (!user) {
        state.do.noUser();
      }
    }, 2000)
  });

  useEffect(() => {
    console.log('value: ', value, 'laoading', value.loading);
    if (user && !value.loading) {
      state.do.load(user);
    }
  }, [value, state, user])

  const { loading, project, loaded } = value;

  return (<Box layerStyle="page-frame">
    <Box layerStyle="page-frame-inner">
      <Heading variant="page-head-with-sub">Edit Project</Heading>
      <Heading variant="page-subhead" fontSize="xs">{props.projectId}</Heading>
      <ProjectTicket loaded={loaded} loafing={loading} project={project}/>
    </Box>

  </Box>);
}
