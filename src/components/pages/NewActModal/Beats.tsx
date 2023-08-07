import useForestFiltered from '~/components/utils/useForestFiltered'
import styles from '~/components/pages/NewActModal/NewActModal.module.scss'
import { Input, Text } from '@chakra-ui/react'
import { NewBeat } from '~/types'
import { CAMERA_ANGLE, DURATION, NAME } from '~/consts'
import { leafI } from '@wonderlandlabs/forest/lib/types'
import { memo, useEffect, useState } from 'react'

function NewBeatRow({ state, index }: { state: leafI, index: number }) {


  const [name, setName] = useState(state.value.newBeats[index].name);
  const [duration, setDuration] = useState(state.value.newBeats[index].duration);
  const [camera_angle, setCamera_angle] = useState(state.value.newBeats[index].camera_angle);

  useEffect(() => {
    state.do.updateBeat(index, { name, duration, camera_angle })
  }, [name, duration, camera_angle])

  return <>
    <section>
      <div className={styles['beat-grid']}>
        <Input name={`name-${index}`} value={name}
               onChange={(e) => setName(e.target.value)}/>

        <Input type="number" min={0} step={1}
               isNumeric
               textAlign="right"
               name={`duration-${index}`} value={duration}
               onChange={(e) => setDuration(Number(e.target.value))}/>

        <Input name={`camera_angle-${index}`} value={camera_angle}
               onChange={(e) => setCamera_angle(e.target.value)}/>
      </div>
    </section>
  </>

}

const NewBeatM = memo(NewBeatRow);

export function Beats({ state }: { state: leafI }) {
  return <div>
    <div className={styles['beat-grid']}>
      <Text textStyle="label-v">Name</Text>
      <Text textStyle="label-v">Seconds</Text>
      <Text textStyle="label-v">Camera Angle</Text>
    </div>
    <NewBeatM index={0} state={state}/>
    <NewBeatM index={1} state={state}/>
    <NewBeatM index={2} state={state}/>
    <Text fontSize="xs" textStyle="info">Beats without names will not be added</Text>
  </div>
}
