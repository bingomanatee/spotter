import { leafFn, leafI, typedLeaf } from '@wonderlandlabs/forest/lib/types'
import { Act, Beat } from '~/types'
import actState from '~/lib/actState'
import BeatModel from '~/utils/BeatModel'
import dayjs from 'dayjs'
import { DURATION } from '~/consts'

export type NewActModalStateValue = {
  context: string,
  id: number | null,
  beat: BeatModel | null,
  act: Act | null,
  name: '',
};

type leafType = typedLeaf<NewActModalStateValue>;

function newBeat(name) {
  return {
    name,
    content: '',
    cameraAngle: 'front medium',
    duration: 10,
    notes: '',
  }
}

const NewActModalState = (props) => {
  console.log('new action state: ', props);
  const $value: NewActModalStateValue = {
    context: props.context,
    id: props.id,
    beat: null, // the beat model preceding this one - can be null
    act: null, // the act preceding this one
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

      start(state: leafType) {
        const { beat } = state.value;
        if (!beat) {
          return dayjs.duration(0, 's');
        }
        return beat.endTime;
      },

      end(state: leafType) {
        const { newBeats } = state.value;
        const start = state.$.start();
        let time = start;
        newBeats.forEach((beat) => {
          time = time.add(beat.duration, 's');
        });
        return time;
      },

      isOpen(state: leafType) {
        const { context, act } = state.value;
        switch (context) {
          case 'after-act':
            return !!act;
            break;
        }
        return false;
      },
      newBeatsToSave(state: leafType) {
        const {newBeats } = state.value;
        let timeStamp = state.$.start();
        return newBeats.filter((b) => !!b.name)
          .map((beat) => {
            const duration = beat.duration;
            let endStamp = timeStamp.add(duration, 's');
            let time = timeStamp.format('m:ss') + '-' + endStamp.format('m:ss');
            timeStamp = endStamp;
            let out = {...beat, time};
            delete out.duration;
            return out;
          })
      }
    },

    actions: {
      setNewBeatField(state: leafType, e: MouseEvent, index: number, field: string) {
        console.log('snob', e, index, field);
        const newBeats = [...state.value.newBeats];
        const newBeat = newBeats[index];
        if (!newBeat) {
          console.log('cannot find new beat ', index);
          return;
        }

        let value = e.target.value;
        if (field === DURATION) {
          value = Number(value);
        }
        console.log('updated ', ...newBeats)
        newBeats[index] = { ...newBeat, [field]: value }
        console.log('.... to ', ...newBeats);
        state.do.set_newBeats(newBeats);
      },
      close(state: leafType) {
        actState.child('newAct')!.do.close();
        state.do.reset();
      },
      reset(state: leafType, skipContext?: boolean) {
        if (!skipContext) {
          state.do.set_context('');
          state.do.set_id(null);
        }
        state.do.set_newBeats([]);
        state.do.set_beat(null);
        state.do.set_act(null);
      },
      init(state: leafType) {
        const { context, id } = state.value;
        state.do.reset(true);
        switch (context) {
          case 'after-act':
            state.do.set_act(actState.$.act(id, true).act);
            state.do.set_beat(actState.$.lastBeat(id));
            state.do.set_newBeats([
              newBeat('Beat One'),
              newBeat('Beat Two'),
              newBeat('Beat Three')
            ]);
            break;
        }
      },
      save(state: leafType) {
        const {name} = state.value;
        actState.do.addAct(name, state.$.newBeatsToSave());
        state.do.close();
      }
    }
  };
};

export default NewActModalState;
