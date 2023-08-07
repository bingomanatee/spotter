"use client"
// import styles from './page.module.css'
import { Box, Heading, HStack, Text, Input } from '@chakra-ui/react'

import actState from '~/lib/actState'
import Acts from '~/components/pages/Acts'
import useForestFiltered from '~/components/utils/useForestFiltered'
import NewBeatModal from '~/components/pages/NewBeatModal/NewBeatModal'
import { useCallback, useEffect, useState } from 'react'
import NewActModal from '~/components/pages/NewActModal/NewActModal'
import { userManager } from '~/lib/userManager'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { AddButton } from '~/components/AddButton'
import { ExitButton } from '~/components/ExitButton'
import beep from 'browser-beep';
import { dataManager } from '~/lib/dataManager'

const beeper = beep({ frequency: 830 });


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClientComponentClient();
    userManager.do.init(supabase, router)
  }, [router])

  const [name, setName] = useState('');
  const updateName = useCallback((e) => {
    setName(e.target?.value || '');
  }, [setName]);

  const save = useCallback(async () => {
    const project = await dataManager.child('projects')!.do.create({ name });
    console.log('created ', project);
    if (project?.id) {
      router.push('/project/' + project.id);
    }
  }, [name]);

  return (
    <Box layerStyle="page-frame">
      <Box layerStyle="page-frame-inner">
        <Heading>Create Project</Heading>
        <HStack my={8} spacing={4}>
          <Text whiteSpace="nowrap" textStyle="label">Project Name</Text>
          <Input required value={name} onChange={updateName} name="name" flex={1}/>
          <AddButton
            onClick={() => name ? save() : beeper()}
            disabled={!name}>Create Project</AddButton>
        </HStack>
        <Box m={10} w="100%" align="center">
          <ExitButton onClick={() => router.push('/projects')}>Return to Projects</ExitButton>
        </Box>
      </Box>
    </Box>
  )
}
