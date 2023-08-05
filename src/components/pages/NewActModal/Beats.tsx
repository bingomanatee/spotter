import useForestFiltered from '~/components/utils/useForestFiltered'
import styles from '~/components/pages/NewActModal/NewActModal.module.scss'
import { Input, Text } from '@chakra-ui/react'
import { NewBeat } from '~/types'
import { CAMERA_ANGLE, DURATION, NAME } from '~/consts'
import { leafI } from '@wonderlandlabs/forest/lib/types'

function NewBeat({ state, index, newBeat }: { state: leafI, newBeat: NewBeat, index: number }) {

  return <>
    <section>
      <div className={styles['beat-grid']}>
        <Input name={`name-${index}`} value={state.$.newBeatField(index, NAME)}
               onChange={(e) => state.do.setNewBeatField(e, index, NAME)}/>

        <Input type="number" min={0} step={1}
               isNumeric
               textAlign="right"
               name={`duration-${index}`} value={Number(state.$.newBeatField(index, DURATION))}
               onChange={(e) => state.do.setNewBeatField(e, index, DURATION)}/>

        <Input name={`cameraAngle-${index}`} value={state.$.newBeatField(index, CAMERA_ANGLE)}
               onChange={(e) => state.do.setNewBeatField(e, index, CAMERA_ANGLE)}/>
      </div>
    </section>
  </>

}

export function Beats({ state }: { state: leafI }) {
  const { newBeats } = useForestFiltered(state, ['newBeats']);

  return <div>
    <div className={styles['beat-grid']}>
      <Text textStyle="label-v">Name</Text>
      <Text textStyle="label-v">Seconds</Text>
      <Text textStyle="label-v">Camera Angle</Text>
    </div>
    {newBeats.map((beat, index) => (<NewBeat key={beat.id} newBeat={beat} index={index} state={state}/>))}
    <Text fontSize="xs" textStyle="info">Beats without names will not be added</Text>
  </div>
}
