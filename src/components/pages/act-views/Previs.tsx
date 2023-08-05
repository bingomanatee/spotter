import useForestFiltered from '~/components/utils/useForestFiltered'
import actState from '~/lib/actState'
import styles from './styles.module.scss'
import { Fragment } from 'react'
import { BeatPanel } from '~/components/pages/act-views/BeatPanel'
import { ActPanel } from '~/components/pages/act-views/ActPanel'

// https://creator.nightcafe.studio/creation/l5cOVZNQcQK505eOVCPJ
function BeatPanels({ actId }: { actId: number }) {
  const beats = useForestFiltered(actState,
    (value: Record<string, any>) => {
      return value.beats.get(actId) || []
    }
  );

  return (<Fragment>
    {beats.map((beat) => (<BeatPanel key={beat.id} actId={actId} beat={beat}/>))}
  </Fragment>)
}

export default function Previs() {
  const { acts } = useForestFiltered(actState, ['acts']);

  return (
    <div className={styles.previs}>
      <ActPanel act={{ id: 0, name: '' }} isStart/>
      {acts.map((act) =>
        <Fragment key={act.id}>
          <ActPanel act={act}/>
          <BeatPanels actId={act.id}/>
        </Fragment>
      )}
      <ActPanel act={{ id: 0, name: '' }} isEnd/>
    </div>
  )

}
