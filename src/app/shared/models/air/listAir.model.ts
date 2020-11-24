import { Timestamp } from 'rxjs';

export interface Air{
    id_air?: number, 
    name_air: string, 
    current_temperature_air: number, 
    state_cool_air: boolean, 
    state_fan_air: boolean, 
    turn_on_air: boolean, 
    allocated_air: boolean, 
    temperature_min_air: number, 
    temperature_max_air: number, 
    url_device_air: string, 
    active_air: boolean
}