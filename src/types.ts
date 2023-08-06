import { NAME } from '~/consts'

export type Act = {
  id: number,
  name: string,
}

export type NewBeat = {
  "name": string,
  "time": string,
  "content": string,
  "cameraAngle": string,
  "notes": string
}

export type Beat = {
  "id": number,
} & NewBeat;

/**
 * this is a _very_ forgiving test; mainly to differentiate between id values and beat objects.
 */
export function isBeat(arg: unknown) : arg is Beat {
  return !!(arg && typeof arg === 'object' && NAME in arg && 'id' in arg && 'time' in arg)
}

export const isPromise = (input: any): input is Promise<any> => {
  return input && (typeof input.then === 'function')
    && (typeof input.catch === 'function')
    && (typeof input.finally === 'function')
}

export type Project = {
  id: string,
  user_id: string,
  order: Number,
  created: string,
  name: string,
  active: number,
}
