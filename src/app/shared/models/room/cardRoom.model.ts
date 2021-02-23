export interface CardRoom{
    id_room?: number,
    fk_id_air?: number,
    name_room: string,
    state_air: number,
    current_temperature_air: number,
    state_cool_air: number,
    state_fan_air: number,
    temperature_min_air: number,
    temperature_max_air: number,
    url_device_air: string
}