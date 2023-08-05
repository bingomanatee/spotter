"use client"
// import styles from './page.module.css'
import { Box, Heading, Spinner } from '@chakra-ui/react'

import actState from '~/lib/actState'
import Acts from '~/components/pages/Acts'
import useForestFiltered from '~/components/utils/useForestFiltered'
import NewBeatModal from '~/components/pages/NewBeatModal/NewBeatModal'
import { useEffect } from 'react'
import NewActModal from '~/components/pages/NewActModal/NewActModal'

export default function Home() {

  const { loadState, newBeat, newAct } = useForestFiltered(actState,
    ['loadState', 'acts', 'newBeat', 'newAct']);

  useEffect(() => {
    actState.do.init();
  }, [])
  return (
    <Box layerStyle="page-frame">
      <Box flex={0}>
        <Heading variant="page-head">Spotter Track Sheet</Heading>
        {newBeat.context ? <Box position="absolute" top="4em" right="4em" width="300px">
          {`newBeat: ${newBeat.context} : ${newBeat.id} `}
        </Box> : null}
        {newAct.context ?<Box position="absolute" top="4em" right="4em" width="300px">
          {`newAct: ${newAct.context} : ${newAct.id} `}
        </Box> : null}
      </Box>
      <Box flex={1} overflowY="auto">
        {loadState === 'loading' ? <Spinner size="xl"/> : ''}
        {loadState === 'loaded' ? <Acts/> : ''}
      </Box>
      {newBeat.context ? <NewBeatModal context={newBeat.context} id={newBeat.id}/> : null}
      {newAct.context ? <NewActModal context={newAct.context} id={newAct.id}/> : null}
    </Box>
  )
}
