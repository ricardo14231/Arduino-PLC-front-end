import { Timestamp } from 'rxjs'

export interface Schedule {
   /*  fk_id_room: number;
    id_schedule: number;
    name_room: string;
    schedule_room: [{
        hour: string, 
        mon: string, 
        tue: string, 
        wed: string, 
        thu: string, 
        fri: string, 
        sat: string 
    }], */

    id_schedule?: number,
    fk_id_room: number,
    shift_morning: {
        hour: string[], 
        mon: string, 
        tue: string, 
        wed: string, 
        thu: string, 
        fri: string, 
        sat: string 
    },
    shift_afternoon: {
        hour: string, 
        mon: string, 
        tue: string, 
        wed: string, 
        thu: string, 
        fri: string, 
        sat: string 
    },
    shift_night: {
        hour: string, 
        mon: string, 
        tue: string, 
        wed: string, 
        thu: string, 
        fri: string, 
        sat: string 
    },
    active_schedule: boolean,
    deleted_schedule?: boolean, 
    update_schedule?: number, 
    create_schedule?: number
}

