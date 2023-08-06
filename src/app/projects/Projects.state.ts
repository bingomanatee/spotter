import { leafI, typedLeaf } from '@wonderlandlabs/forest/lib/types'
import axios from 'axios'
import { Project } from '~/types'
import { dataManager } from '~/lib/dataManager'

export type ProjectsStateValue = {projects: Project[], loaded: boolean, loadError: string | null};

type leafType = typedLeaf<ProjectsStateValue>;

const ProjectsState = () => {
  const $value: ProjectsStateValue = { loadError: null, projects: [], loaded: false};
  return {
    name: "Projects",
    $value,

    selectors: {},

    actions: {
      async init(state: leafType) {
        try {
          await dataManager.child('projects').do.load();
          state.do.set_projects(Array.from(dataManager.child('projects')!.value.values()));
          state.do.set_loaded(true)
        } catch (err) {
          state.do.set_loaded(true);
          state.do.set_loadError(err instanceof Error ? err.message : 'unknown error')
        }
      }
    }
  };
};

export default ProjectsState;
