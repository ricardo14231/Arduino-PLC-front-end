import { ClassTime } from "../classTime/ClassTime.model";

export interface ScheduleCrud {
  id_schedule: number,
  id_room: number,
  name_room: string,
  shift: string,
  shift_time: ClassTime[],
  active_schedule: boolean
}