import { NAME } from '~/consts'

type DataRecord = {
  id: string  ,
  created_at: string,
  active: boolean
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
  name: string,
  duration: number,
  content: string,
  camera_angle: string,
  notes: string,
  order?: number,
  act_id?: string,
}

export function isNewBeat(arg: any) : arg is NewBeat {
  return !!(arg && typeof arg === 'object' && arg.name && 'duration' in arg )
}

export type Beat = {
  order: number,
  act_id: string,
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

export type NewProject = {
  name: string,
}

export type Project = {user_id: string} & NewProject & DataRecord;


export type User = {
  id: string,
  email: string,
  name?: string
}
