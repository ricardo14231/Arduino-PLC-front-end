import { Timestamp } from 'rxjs';

export interface CrudRoom{
    id_room?: number,
    fk_id_pavilion?: number,
    fk_id_air?: number,
    fk_id_new_air: number,
    name_room: string,
    name_pavilion: string,
    name_air: string,
    active_room: boolean
}