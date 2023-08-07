import { Act, Beat, isNewBeat, NewAct, NewBeat, NewProject, Project } from '~/types'
import { typedLeaf } from '@wonderlandlabs/forest/lib/types'
import { Forest } from '@wonderlandlabs/forest'
import axios from 'axios'
import { c } from '@wonderlandlabs/collect'
import { sortBy } from 'lodash';

export type ProjectsStateValue = Map<string, Project>
type projectValueType = typedLeaf<ProjectsStateValue>;

export type ActsStateValue = Map<string, Act>
export type actValueType = typedLeaf<ActsStateValue>;

export type BeatStateValue = Map<String, Beat>;
export type beatValueType = typedLeaf<BeatStateValue>

const projectsValue: projectValueType = new Map();
const actsValue: actValueType = new Map();
const beatsValue: beatValueType = new Map();

type dmLeaf = typedLeaf<{}>;

export const dataManager = new Forest({
  $value: {},
  actions: {
    async loadProject(state: dmLeaf, projectId: string) {
      if (!projectId) {
        console.error('loadProject: no projectId');
        return;
      }
      await state.child('projects')!.do.fetch(projectId);
      await state.child('acts')!.do.load(projectId); // also asserts beats
    },
    async newActAndBeats(state: dmLeaf, act: NewAct, beats?: NewBeat[]) {
      if (!act.project_id) {
        console.error('cannot create new act withoot project id:', act);
        return;
      }
      const savedAct = await state.child('acts')!.do.create(act);
      const goodBeats = beats.filter(beat => isNewBeat(beat));
      if (goodBeats?.length && savedAct?.id) {
        await state.child('beats')!.do.createMany(goodBeats, savedAct.id);
      }
      state.do.loadProject(act.project_id);
      return savedAct;
    }
  },
  children: {
    projects: {
      $value: projectsValue,
      actions: {
        async load(state: projectValueType) {
          const { data } = await axios.post('/api/projects');
          console.log('--- projects from post:', data)
          if (Array.isArray(data?.projects)) {
            state.value = data.projects.reduce((memo, project) => {
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
        async create(state: projectValueType, newProject: NewProject) {
          const { data: { project } } = await axios.post('/api/project', newProject)
          if (project.id) {
            state.set(project.id, project);
          }
          return project;
        },
        async delete(state: projectValueType, id: string) {
          console.log('deleting project ', id);
          await axios.delete(`/api/project/${id}`);
          const newProjects = new Map(state.value);
          newProjects.delete(id);
          state.value = newProjects;
        }
      }
    },
    acts: {
      $value: actsValue,
      actions: {
        async load(state: actValueType, projectId: string) {
          if (!projectId) {
            console.log('--- acts/load: no project id');
            return;
          }
          const { data } = await axios.get(`/api/acts/${projectId}`);
          console.log('--- data from acts load:', data)
          const { acts } = data;
          if (Array.isArray(acts)) {
            acts.forEach((act) => {
              act.beats.forEach((beat) => {
                dataManager.child('beats')!.set(beat.id, beat);
              })
              delete act.beats;
            });
            state.value = acts.reduce((memo, record) => {
              if (record.active) {
                memo.set(record.id, record);
              } else {
                console.log('inactive act - ignoring', record);
              }
              return memo;
            }, new Map());
            console.log('acts are now ', state.value);
          } else {
            console.log('NOT loading acts:', data);
          }
        },
        async fetch(state: actValueType, id: string) {
          const { data } = await axios.get('/api/act/' + id);
          if (data.act) {
            state.set(data.act.id, data.act);
          }
          return data.act;
        },
        async create(state: actValueType, newAct: NewAct) {
          const { data: { act } } = await axios.post('/api/act', newAct);

          console.log('new act is ', act);
          if (act?.id) {
            state.set(act.id, act);
          }
          return act;
        }
      }
    },
    beats: {
      $value: beatsValue,
      actions: {
        async load(state: beatValueType, actId: string) {
          const { data } = await axios.get(`/api/beats/${actId}`);
          if (Array.isArray(data?.beats?.data)) {
            state.value = data.beats.data.reduce((memo, record) => {
              if (record.active) {
                memo.set(record.id, record);
              }
              return memo;
            }, new Map(state.value));
          }
        },
        async fetch(state: beatValueType, id: string) {
          const { data } = await axios.get('/api/beat/' + id);
          if (data.beat) {
            state.set(data.beat.id, data.beat);
          }
          return data.beat;
        },
        async create(state: beatValueType, newBeat: NewBeat) {
          const { data: beat } = await axios.post('/api/beat', newBeat)
          if (beat.id) {
            state.set(beat.id, beat);
          }
        },
        async createMany(state: beatValueType, beats: NewBeat[], actId: string) {
         const  newBeats = beats.map((beat) => ({ ...beat, act_id: actId }));
          const { data } = await axios.post(`/api/beats/${actId}`, { beats: newBeats })
          if (Array.isArray(data.beats)) {
            data.beats.forEach((beat) => {
              state.set(beat.id, beat);
            });
          }
        }
      },
      selectors: {
        forAct(state: beatValueType, actId: string) {
          return sortBy(c(state.value)
            .clone()
            .filter((beat) => beat.act_id === actId && beat.active)
            .values, 'order');
        }
      }
    },
  }

});
