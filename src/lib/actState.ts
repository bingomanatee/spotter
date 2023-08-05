import { Forest } from '@wonderlandlabs/forest'
import { leafI } from '@wonderlandlabs/forest/lib/types'
import axios from 'axios'
import { Act, Beat, NewBeat } from '~/types'
import BeatModel from '~/utils/BeatModel'

const actState = new Forest({
  $value: {
    acts: [],
    loadState: 'start',
    loadError: '',
    beats: new Map(), // indexed by the act id they belong to, as an array of beats
    viewMode: 'runsheet'
  },
  actions: {
    addBeatAfter(state: leafI, context: string, id?: number) {
      state.child('newBeat')!.do.initNew(context, id);
    },
    async uploadBeatImage(state: leafI, beatId: number, files: any, onClose: () => void) {
      console.log('uploading', files, 'to', beatId);
      //@TODO: throttle size
      // note -- POST is used to upload FILES; PUT is used to upload URLS.
      const data = new FormData();
      data.append('imageFile', files[0])
      axios.post(`/api/images/beats/${beatId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onClose();
    },
    async loadBeats(state: leafI, actId: number) {
      try {
        const { data } = await axios.get(`/api/acts/beats/${actId}`)
        if (!data?.beats) {
          return;
        }
        const newMap = new Map(state.value.beats);
        newMap.set(actId, data.beats);
        state.do.set_beats(newMap);
      } catch (err) {
        console.error('error in beats api:', err);
      }
    },
    async putBeatImage(stae: leafI, beatId: string, imageUrl: string) {
      const { data } = await axios.put(`/api/images/beats/${beatId}`, { imageUrl });
      console.log('image url data:', data);
      return data;
    },
    async init(state: leafI) {
      if (state.value.loadState !== 'start') {
        return;
      }
      state.do.loadActs();
    },
    async loadActs(state: leafI) {
      state.do.set_loadState('loading');
      try {
        const { data } = await axios.get('/api/acts');
        if (data && 'acts' in data) {
          state.do.set_loadState('loaded');
          state.do.set_acts(data.acts);
          state.do.set_beats(new Map());
          data.acts.forEach((act) => state.do.loadBeats(act.id)); // note - not waiting for async resolution
        } else {
          throw new Error('badly formatted api response');
        }
      } catch (err) {
        state.do.set_loadState('error');
        if (err instanceof Error) {
          state.do.set_loadError(err.message);
        } else {
          state.do.set_loadError('-- unreadable error --')
        }
      }
    },
    async addBeat(state: leafI, actId: number, beat: NewBeat) {
      try {
        await axios.post('/api/acts/beats/' + actId, beat);
        state.do.loadBeats(actId);
      } catch (err) {
        console.log('--error in adding a beat:', err);
      }
      //@TODO: offset time duration of beats that follow the newly added one to prevent overlaps
    },
    // triggers a modal
    openActAfterAct(state: leafI, actId: number) {
      state.child('newAct')!.do.openActAfterAct(actId);
    },
    async addAct(state: leafI, name: string, beats: NewBeat[]) {
      await axios.post('/api/acts', { name, beats });
      return state.do.loadActs();
    },
    async deleteAct(state: leafI, actId: number) {
      await axios.delete(`/api/acts/${actId}`);
      return state.do.loadActs();
    },
    async deleteBeat(state: leafI, beatId: number, actId) {
      await axios.delete(`/api/acts/${actId}/beats/${beatId}`);
      return state.do.loadActs();
    },
  },

  selectors: {
    async getBeatImage(_state, beatId: number) {
      const { data } = await axios.get('/api/images/beats/' + beatId);
      return data;
    },
    lastBeat(state: leafI, actId: number): BeatModel | null {
      const { act, beats } = state.$.act(actId);
      if (!beats.length) {
        return null;
      }
      const models: BeatModel[] = beats.map((beat) => new BeatModel(beat, actId));
      return models.reduce((model: BeatModel | null, beatModel) => {
        return model && beatModel.isBefore(model) ? model : beatModel
      }, null)
    },
    act(state: leafI, actId: number, noContext?: boolean): { act: Act | null, beats?: Beat[] } {
      const { acts, beats } = state.value;
      if (!actId) {
        return { act: null, beats: [] };
      }
      const actIdNum = Number(actId);
      const act = acts.find((a) => Number(a.id) === actIdNum);
      if (noContext) {
        return { act };
      }

      const actBeats = beats.get(actId) || [];
      const beatModels: BeatModel[] = actBeats.map((beat) => {
        return new BeatModel(beat);
      }).sort((m1, m2) => {
        return m1.startSecond - m2.startSecond
      });

      const { startTime, endTime } = beatModels.reduce((memo, model) => {
        let { startTime, endTime } = memo;
        if ((!startTime) || (startTime.asSeconds() > model.startSecond)) {
          startTime = model.startTime;
        }
        if ((!endTime) || endTime.asSeconds() < model.endSecond) {
          endTime = model.endTime;
        }
        return { startTime, endTime }
      }, {});
      let startSeconds = startTime ? startTime.asSeconds() : 0;
      let endSeconds = endTime ? endTime.asSeconds() : 0;
      return {
        act,
        beats: actBeats,
        beatModels: beatModels,
        startTime, endTime,
        startSeconds, endSeconds
      };
    },
    /**
     * returns either a "context object" with the beat, its act, and its's aats beats,
     * or if noContext === true, just the beat in a context
     *
     */
    beat(state: leafI, beatId: number, noContext?: boolean): { beat: Beat | null, act?: Act | null, beats?: Beats[] } {
      let beat = null;
      let actId = null;
      let beatIdNum = Number(beatId);
      state.value.beats.forEach((
        beatList, aid
      ) => {
        if (!(beat && actId)) {
          let match = beatList.find((b) => Number(b.id) === beatIdNum);
          if (match) {
            console.log('found beat ', beatId, 'in ', beatList, ':', match)
            actId = Number(aid);
            beat = match;
          } else {
            console.log('no beat ', beatId, 'in', beatList.map((b) => b.id))
          }
        }
      })

      if (!beat) {
        return noContext ? { beat: null } : { beat, actId };
      } else if (noContext) {
        return { beat };
      }

      let { act } = state.$.act(actId, true);

      return { beat, act, beats: state.value.beats.get(actId) };
    }
  },

  children: {
    newAct: {
      $value: {
        context: '',
        id: null
      },
      actions: {
        close(state: leafI) {
          state.do.set_context('');
          state.do.set_id(null);
        },
        openActAfterAct(state: leafI, actId: number) {
          state.do.set_context('after-act');
          state.do.set_id(actId);
        }
      }
    },
    newBeat: {
      $value: {
        context: '',
        id: null
      },

      actions: {
        initNew(state: leafI, context: string, id?: number) {
          state.do.set_context(context);
          state.do.set_id(id || null);
        },
        close(state: leafI) {
          state.do.set_context('');
          state.do.set_id(null);
        }
      }
    }
  }
})

export default actState;
