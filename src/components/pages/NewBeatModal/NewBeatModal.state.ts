import { leafI, typedLeaf } from '@wonderlandlabs/forest/lib/types'
import { NewBeatModalProps } from '~/components/pages/NewBeatModal/types'
import actState from '~/lib/actState'
import { Act, Beat } from '~/types'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import ParsedTime from '~/utils/ParsedTime'

dayjs.extend(duration)

export type NewBeatModalStateValue = {
  context: string,
  id: number | null,
  act: Act | null,
  beat: Beat | null,
  duration: number,
  isOpen: boolean,
  name: string,
  content: string,
  notes: string,
  cameraAngle: string,
};

type leafType = typedLeaf<NewBeatModalStateValue>;

const NewBeatModalState = (props: NewBeatModalProps) => {
  const $value: NewBeatModalStateValue = {
    context: props.context,
    id: props.id | null,
    act: null, // the parent act
    beat: null, // the preceding beat,
    duration: 20,
    isOpen: !!(props.context),
    name: '',
    content: '',
    notes: '',
    cameraAngle: ''
  };
  return {
    name: "NewBeatModal",
    $value,

    selectors: {
      endOfLastBeat(state: leafType) {
        const { beat } = state.value;
        if (!beat) {
          return 0;
        }
        const time = new ParsedTime(beat.time);
        return time.end || time.start;
      }
    },


    actions: {
      addBeat(state: leafType) {
        const { content, notes, duration, act, beat, name, cameraAngle } = state.value;
        console.log('addBeat: with ', beat, act, name, content);

        if (!act) {
          console.error('cannot add beat - no reot act');
          return;
        }

        if (!beat) {
          console.error('cannot add beat - no basis beat');
        }

        if (!name || !content) {
          console.error('cannot add beat - needs name and content')
        }
        const prevTime = new ParsedTime(beat.time);

        const startTime = prevTime.end;
        const endTime = startTime.add(duration, 'seconds');
        const time = `${startTime.format('m:ss')}-${endTime.format('m:ss')}`;
        const newBeat = { name, content, notes, time, cameraAngle };
        console.log('---- adding new beat', newBeat);
        actState.do.addBeat(act.id, newBeat)
        state.do.close();
      },
      close(state) {
        state.do.reset();
        actState.child('newBeat')!.do.close();
      },

      reset(state: leafType) {
        state.do.set_name('');
        state.do.set_duration(10);
        state.do.set_cameraAngle('');
        state.do.set_content('');
        state.do.set_notes('');

        state.do.set_id(null);
        state.do.set_context('');
        state.do.set_isOpen(false);
      },
      init(state: leafType) {
        switch (state.value.context) {
          case 'beat':
            const { beat, act } = actState.$.beat(state.value.id);
            console.log('loading beat/act', beat, act);
            state.do.set_beat(beat);
            state.do.set_act(act);
            break;
        }
      }
    }
  };
};

export default NewBeatModalState;
