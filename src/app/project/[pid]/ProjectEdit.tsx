import { useEffect } from 'react';
import stateFactory from './ProjectEdit.state.ts';
import useForest from '~/components/utils/useForest'
import { Box, Heading } from '@chakra-ui/react'
import useForestFiltered from '~/components/utils/useForestFiltered'
import { userManager } from '~/lib/userManager'
import { ProjectTicket } from '~/app/project/[pid]/ProjectTicket'
import { ProjectEditProps } from '~/app/project/[pid]/types'
import { dataManager } from '~/lib/dataManager'
import { c } from '@wonderlandlabs/collect'

export default function ProjectEdit(props: ProjectEditProps) {
  const user = useForestFiltered(userManager, (value) => {
    console.log('uff value is ', value);
    return value.user;
  });

  const [value, state] = useForest([stateFactory, props], (localState) => {
    setTimeout(() => {
      if (!user) {
        state.do.noUser();
      }
    }, 2000);

    const sub = dataManager.child('acts')!.subscribe(
      (value) => {
        const acts = c(value).getReduce((list, act) => {
          if (act.project_id === props.projectId && act.active) {
            list.push(act);
          }
          return list;
        }, []);
        localState.do.set_acts(acts);
      });

    const sub2 = dataManager.child('beats')!.subscribe(
      (value) => {

        const beats = c(value).getReduce((list, beat) => {
          if (list.has(beat.act_id)) {
            list.get(beat.act_id).push(beat);
          } else {
            list.set(beat.act_id, [beat])
          }
          return list;
        }, new Map());
        console.log('beats:', beats, 'from props', props);
        localState.do.set_beats(beats)
      }
    )

    return () => {
      sub?.unsubscribe();
      sub2?.unsubscribe()
    };
  });

  useEffect(() => {
    console.log('value: ', value, 'laoading', value.loading);
    if (user && !value.loading) {
      state.do.load(user);
    }
  }, [value, state, user])

  const { loading, project, loaded, acts, beats } = value;

  return (<Box layerStyle="page-frame">
    <Box layerStyle="page-frame-inner">
      <Heading variant="page-head-with-sub">Edit Project</Heading>
      <Heading variant="page-subhead" fontSize="xs">{props.projectId}</Heading>
      <ProjectTicket loaded={loaded}
                     loading={loading}
                     project={project}
                     beats={beats}
                     acts={acts}/>
    </Box>

  </Box>);
}
