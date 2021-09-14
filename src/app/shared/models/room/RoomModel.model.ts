export interface RoomModel{
    idRoom?: number,
    fkIdPavilion?: number,
    fkIdAir?: number,
    fkIdNewAir: number,
    nameRoom: string,
    namePavilion: string,
    nameAir: string,
    activeRoom: boolean
}