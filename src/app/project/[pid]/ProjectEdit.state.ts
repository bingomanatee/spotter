import { leafI, typedLeaf } from '@wonderlandlabs/forest/lib/types'
import { Act, Project, User } from '~/types'
import { dataManager } from '~/lib/dataManager'
import { ProjectEditProps } from '~/app/project/[pid]/types'
import { c } from '@wonderlandlabs/collect'

export type ProjectEditStateValue = {
  notLoggedIn: boolean,
  loading: boolean,
  loaded: boolean,
  project: Project | null,
  user: User | null,
  acts: Act[]
};

type leafType = typedLeaf<ProjectEditStateValue>;

const ProjectEditState = (props: ProjectEditProps) => {
  const $value: ProjectEditStateValue = {
    acts: [],
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
      async getProject(state: leafType) {
        console.log('ProjectEdit: getting project for ', props);
       await dataManager.do.loadProject(props.projectId);
        state.do.set_project(dataManager.child('projects')!.value.get(props.projectId));
        const acts = c(dataManager.child('acts')!.value)
          .getReduce((list, act) => {
            if (act.project_id === props.projectId && act.active) {
              list.push(act);
            }
            return list;
          }, []);
        state.do.set_acts(acts);
     //@TODO: get acts, beats
        state.do.set_loaded(true);
      },
      load(state: leafType, user: User) {
        if (user && !state.value.loading) {
          state.do.set_notLoggedIn(false);
          state.do.set_user(user);
          state.do.set_loading(true);
          state.do.getProject();
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
