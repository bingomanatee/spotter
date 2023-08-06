import { NewAct, NewBeat, Project } from '~/types'
import { typedLeaf } from '@wonderlandlabs/forest/lib/types'
import { Forest } from '@wonderlandlabs/forest'
import axios from 'axios'

export type ProjectsStateValue = Map<string, Project>

type projectValueType = typedLeaf<ProjectsStateValue>;

const projectsValue: projectValueType = new Map();

type dmLeaf = typedLeaf<{}>;

export const dataManager = new Forest({
  $value: {},
  actions: {
    async newActAndBeats(state: dmLeaf, act: NewAct, beats?: NewBeat[]) {
      const savedAct = await state.child('acts')!.do.create(act);
      const beatsForAct = beats.map((beat) => ({ ...beat, act_id: savedAct.id }));
      await state.child('beats')!.do.createMany(beatsForAct);
      return savedAct;
    }
  },
  children: {
    projects: {
      $value: projectsValue,
      actions: {
        async load(state: projectValueType) {
          const { data } = await axios.post('/api/projects');
          console.log('--- data from post:', data)
          if (Array.isArray(data?.projects?.data)) {
            state.value = data.projects.data.reduce((memo, project) => {
              if (project.active) {
                memo.set(project.id, project);
              }
              return memo;
            }, new Map());
          }
        },
        async fetch(state: projectValueType, id: string) {
          const { data } = await axios.get('/api/project/' + id);
          if (data.project) {
            state.set(data.project.id, data.project);
          }
          return data.project;
        },
        async create(state: projectValueType, name: string) {
          const { data: project } = await axios.post('/api/project', { name })
          if (project.id) {
            state.set(project.id, project);
          }
        }
      }
    }
  }

});
