import { leafFn, leafI, typedLeaf } from '@wonderlandlabs/forest/lib/types'
import { Act, Beat, NewBeat } from '~/types'
import BeatModel from '~/utils/BeatModel'
import dayjs from 'dayjs'
import { DURATION } from '~/consts'
import { dataManager } from '~/lib/dataManager'
import NewBeatModalState from '~/components/pages/NewBeatModal/NewBeatModal.state'

export type NewActModalStateValue = {
  name: string,
  newBeats: NewBeat[],
};

type leafType = typedLeaf<NewActModalStateValue>;

function newBeat(name) {
  return {
    name,
    camera_angle: 'front medium',
    duration: 10,
    content: '',
    notes: '',
  }
}

const NewActModalState = (props) => {
  const $value: NewActModalStateValue = {
    newBeats: [],
    name: ''
  };

  return {
    name: "NewActModal",
    $value,

    selectors: {
      newBeatField(state: leafType, index: number, field: string) {
        const beat = state.value.newBeats[index];
        return beat && field in beat ? beat[field] : '';
      },
      newBeatsToSave(state: leafType) {
        const { newBeats } = state.value;
        return newBeats.filter((b) => !!b.name);
      }
    },

    actions: {
      updateBeat(state: leafType, index: number, data: NewBeat) {
        const beat = state.value.newBeats[index];
        const newBeats = [...state.value.newBeats];
        newBeats[index] = {...beat, ...data};
        state.do.set_newBeats(newBeats);
      },
      close(state: leafType) {
        if (props.onClose) {
          props.onClose();
        }
        state.do.reset();
      },
      reset(state: leafType, skipContext?: boolean) {
        state.do.set_newBeats([]);
        state.do.set_name('');
      },
      init(state: leafType) {
        state.do.reset(true);

        state.do.set_newBeats([
          newBeat('Beat One'),
          newBeat('Beat Two'),
          newBeat('Beat Three')
        ]);
      },
      async save(state: leafType) {
        const { name} = state.value;
        await dataManager.do.newActAndBeats({ name, project_id: props.pid }, state.$.newBeatsToSave());
        state.do.close();
      }
    }
  };
};

export default NewActModalState;
