import useForestFiltered from '~/components/utils/useForestFiltered'
import actState from '~/lib/actState'
import styles from './styles.module.scss'
import { Fragment, useMemo } from 'react'
import { BeatPanel } from '~/components/pages/act-views/BeatPanel'
import { ActPanel } from '~/components/pages/act-views/ActPanel'
import BeatModel from '~/utils/BeatModel'

// https://creator.nightcafe.studio/creation/l5cOVZNQcQK505eOVCPJ
function BeatPanels({ actId, beatModels }: { actId: number, beatModels: BeatModel[] }) {

  return (<Fragment>
    {beatModels.map((beat) => (<BeatPanel key={beat.id} actId={actId} beat={beat.beat!}/>))}
  </Fragment>)
}

export default function Previs() {
  const { acts, beats } = useForestFiltered(actState, ['acts', 'beats']);

  const actData = useMemo(() => {
    return acts.map((act) => {
      return actState.$.act(act.id)
    }).sort((ad1, ad2) => {
      return ad2.startSecond - ad1.startSecond
    }); //@TODO: leverage actData
  }, [acts, beats]);

  return (
    <div className={styles.previs}>
      <ActPanel act={{ id: 0, name: '' }} isStart/>
      {actData.map((data) =>
        <Fragment key={data.act.id}>
          <ActPanel act={data.act}/>
          <BeatPanels actId={data.act.id} beatModels={data.beatModels} />
        </Fragment>
      )}
      <ActPanel act={{ id: 0, name: '' }} isEnd/>
    </div>
  )

}
