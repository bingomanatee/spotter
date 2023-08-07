import actState from '~/lib/actState'
import { Act, Beat, isBeat } from '~/types'
import ParsedTime from '~/utils/ParsedTime'
import dayjs from 'dayjs'


export default class BeatModel {
  constructor(public readonly id: number | Beat, actId?: number) {
    if (isBeat(id)) {
      this.beat = id;
      if (actId) {
        this.act = actState.$.act(actId, true).act;
      } else {
        this.act = actState.$.beat(this.beat.id).act
      }
    } else if (actId) {
      this.act = actState.$.act(actId, true).act;
      if (!this.beat) {
        this.beat = actState.$.beat(id, true).beat;
      }
    } else {
      const { act, beat } = actState.$.beat(id, !!this.beat);
      this.act = act;
      if (!this.beat) {
        this.beat = beat;
      }
    }

    if (this.beat) {
      const parsed = new ParsedTime(this.beat.time);
      this.startTime = parsed.start;
      this.duration = parsed.seconds;
    }
  }

  public readonly beat: Beat | null
  public act: Act | null;

  get name(): string {
    return this.beat?.name || '';
  }

  get camera_angle(): string {
    return this.beat?.camera_angle || '';
  }

  get content(): string {
    return this.beat?.content || '';
  }

  get notes(): string {
    return this.beat?.notes || '';
  }

  get isNull() {
    return !this.beat;
  }

  isBefore(model: BeatModel) {
    return this.endSecond < model.endSecond;
  }

  // ------- time

  public startTime; // Duration
  public duration : number;

  // computed from startTime, duration
  get endTime() {
    if (!this.startTime) return dayjs.duration(0, 's');
    return this.startTime.add(this.duration, 's');
  }

  get endSecond() : number {
    if (!this.endTime) return 0;
    return this.endTime.asSeconds();
  }
  get startSecond() : number {
    if (!this.startTime) return 0;
    return this.startTime.asSeconds();
  }

}
