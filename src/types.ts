import { NAME } from '~/consts'

type DataRecord = {
  id: number,
  created_at: string,
}

export type NewAct = {
  name: string,
  order?: number,
  project_id: string,
}

export type Act = {
  order: number
} & NewAct & DataRecord;

export type NewBeat = {
  "name": string,
  "duration": number,
  "content": string,
  "cameraAngle": string,
  "notes": string,
  order?: number,
}

export type Beat = {
  order: number
} & NewBeat & DataRecord;

/**
 * this is a _very_ forgiving test; mainly to differentiate between id values and beat objects.
 */
export function isBeat(arg: unknown): arg is Beat {
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

export type User = {
  id: string,
  email: string,
  name?: string
}
