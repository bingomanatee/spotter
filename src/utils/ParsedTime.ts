import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

function strToTime(timeString: string) {
  let parts = timeString.trim().split(':').map((str: string) => Number(str));
  return dayjs.duration({
    minutes: parts[0] || 0,
    seconds: parts[1] || 0
  })
}

export default class ParsedTime {
  private times = [];

  constructor(timeString: string) {
    const parts = timeString.split('-');
    parts.forEach((part) => {
      this.times.push(strToTime(part));
    })
  }

  get duration() {
    if (this.start === this.end){
      return dayjs.duration(0, 's');
    }
    return this.end.subtract(this.start);
  }

  get seconds() {
    return this.duration.asSeconds();
  }

  get start() {
    return this.times[0] || null;
  }

  get end() {
    return this.times[1] || this.times[0] || null;
  }
}
