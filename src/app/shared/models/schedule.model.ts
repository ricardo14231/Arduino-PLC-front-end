import { ClassTime } from "./classTime/ClassTime.model";

export interface Schedule {
  id_schedule?: number,
  fk_id_room: number,
  shift_morning: ClassTime[],
  shift_afternoon: ClassTime[],
  shift_night: ClassTime[],
  active_schedule: boolean,
  deleted_schedule?: boolean, 
  update_schedule?: number, 
  create_schedule?: number
}

