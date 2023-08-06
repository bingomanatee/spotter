import { leafI, typedLeaf } from '@wonderlandlabs/forest/lib/types'

export type ProjectEditStateValue = {};

type leafType = typedLeaf<ProjectEditStateValue>;

const ProjectEditState = (props) => {
  const $value: ProjectEditStateValue = {};
  return {
    name: "ProjectEdit",
    $value,

    selectors: {},

    actions: {}
  };
};

export default ProjectEditState;
