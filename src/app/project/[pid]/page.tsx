"use client"
// import styles from './page.module.css'
import { Box, Heading, Spinner } from '@chakra-ui/react'

import actState from '~/lib/actState'
import Acts from '~/components/pages/Acts'
import useForestFiltered from '~/components/utils/useForestFiltered'
import NewBeatModal from '~/components/pages/NewBeatModal/NewBeatModal'
import { useEffect } from 'react'
import NewActModal from '~/components/pages/NewActModal/NewActModal'
import { userManager } from '~/lib/userManager'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import ProjectEdit from '~/app/project/[pid]/ProjectEdit'

export default function ProjectView({params}) {
  const router = useRouter()
console.log('project view props', params)
  useEffect( () => {
    const supabase = createClientComponentClient();
    userManager.do.init(supabase, router)
  }, [router])

  return <ProjectEdit projectId ={params?.pid}/>
}
