"use client"

import { useEffect } from 'react';
import stateFactory from './Projects.state.ts';
import { SUPABASE_CLIENT_KEY, userManager } from '~/lib/userManager'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Box, Heading, HStack, Spinner } from '@chakra-ui/react'
import useForestFiltered from '~/components/utils/useForestFiltered'
import { ProjectsList } from '~/app/projects/projectList'
import useForest from '~/components/utils/useForest'
import SignInPrompt from '~/components/SignInPrompt'
import { JSXElement } from '@babel/types'
import { AddButton } from '~/components/AddButton'

type ProjectsProps = {}

export default function Projects(props: ProjectsProps) {
  const router = useRouter();
  const user = useForestFiltered(userManager, (value) => {
    console.log('uff value is ', value);
    return value.user;
  });
  console.log('PROJECTS')

  useEffect(() => {
    if (!userManager.getMeta(SUPABASE_CLIENT_KEY)) {
      const supabase = createClientComponentClient();
      userManager.do.init(supabase, router)
    }

  }, [router]);

  const [value, state] = useForest([stateFactory, props],
    async (localState) => {
      localState.do.init();
    });

  const { projects, loaded } = value;

  console.log('user = ', user, 'from', userManager.value);

  let promptButton : JSXElement | null = <AddButton
    onClick={() => router.push('/project/add')}>
    Create a new Project
  </AddButton>;
  if (!loaded) {
    promptButton = null;
  } else if (!user) {
    promptButton = <SignInPrompt>Sign in to create a new project</SignInPrompt>
  }

  return (<Box p={12}>
    <HStack justifyContent="space-between" width="100%" alignItems="baseline">
      <Heading>Projects</Heading>
      {promptButton}
    </HStack>
    {loaded ? <ProjectsList projects={projects}/> : <Spinner size="xl"/>}
  </Box>);
}
