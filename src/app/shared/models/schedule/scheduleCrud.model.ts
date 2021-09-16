import { ClassTime } from "../classTime/ClassTime.model";

export interface ScheduleCrud {
  idSchedule: number,
  idRoom: number,
  nameRoom: string,
  shift: string,
  shiftTime: ClassTime[],
  activeSchedule: boolean
}