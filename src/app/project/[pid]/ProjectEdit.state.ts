import { leafI, typedLeaf } from '@wonderlandlabs/forest/lib/types'
import { Project, User } from '~/types'
import { dataManager } from '~/lib/dataManager'

export type ProjectEditStateValue = {
  notLoggedIn: boolean,
  loading: boolean,
  loaded: boolean,
  project: Project | null,
  user: User | null
};

type leafType = typedLeaf<ProjectEditStateValue>;

const ProjectEditState = (props) => {
  const $value: ProjectEditStateValue = {
    loading: false,
    notLoggedIn: false,
    loaded: false, project: null,
    user: null
  };
  return {
    name: "ProjectEdit",
    $value,

    selectors: {},

    actions: {
      async loadProject(state: leafType) {
        const project = await dataManager.child('projects')!
          .do.fetch(props.projectId);
        console.log('fetched', project);
        if (project) {
          state.do.set_project(project);
        }
        state.do.set_loaded(true);
      },
      load(state: leafType, user: User) {
        if (user && !state.value.loading) {
          state.do.set_notLoggedIn(false);
          state.do.set_user(user);
          state.do.set_loading(true);
          state.do.loadProject();
        }
      },
      noUser(state: leafType) {
        const { user, loading } = state.value;

        if (!(user)) {
          state.do.set_notLoggedIn(true);
        }
      }
    }
  };
}
export default ProjectEditState;
