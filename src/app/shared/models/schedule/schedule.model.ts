import { ClassTime } from "../classTime/ClassTime.model";

export interface Schedule {
  idSchedule?: number,
  fkIdRoom: number,
  shiftMorning: ClassTime[],
  shiftAfternoon: ClassTime[],
  shiftNight: ClassTime[],
  activeSchedule: boolean,
  deletedSchedule?: boolean, 
  updateSchedule?: number, 
  createSchedule?: number
}

