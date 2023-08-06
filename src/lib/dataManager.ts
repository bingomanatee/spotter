import { Project } from '~/types'
import { typedLeaf } from '@wonderlandlabs/forest/lib/types'
import { Forest } from '@wonderlandlabs/forest'
import axios from 'axios'

export type ProjectsStateValue = Map<string, Project>

type projectValueType = typedLeaf<ProjectsStateValue>;

const projectsValue: projectValueType = new Map();

export const dataManager = new Forest({
  $value: {},
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
