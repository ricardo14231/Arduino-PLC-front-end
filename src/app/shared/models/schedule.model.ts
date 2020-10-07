export interface Schedule {
    fk_id_room: number;
    id_schedule: number;
    name_room: string;
    schedule_room: [
        hour: string, 
        mon: string, 
        tue: string, 
        wed: string, 
        thu: string, 
        fri: string, 
        sat: string 
    ]
    
}

