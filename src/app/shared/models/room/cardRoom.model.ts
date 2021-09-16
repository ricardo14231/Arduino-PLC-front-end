export interface CardRoom{
  idRoom?: number,
  fkIdAir?: number,
  nameRoom: string,
  turnOnAir: number,
  currentTemperatureAir: number,
  stateCoolAir: number,
  stateFanAir: number,
  temperatureMinAir: number,
  temperatureMaxAir: number,
  urlDeviceAir: string
}