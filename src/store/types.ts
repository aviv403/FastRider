
export interface IRide {
    id: number,
    name: string,
    remaining_tickets: number,
    return_time: string,
    zone: {
        color: string,
        id: number,
        name: string
    }
}

export interface ISelectedRide {
    access_code?: string,
    id?: number,
    return_time?: string,
    ride: IRide
} 

export interface IState{
    rides: IRide[] ,
    selectedRide?: ISelectedRide | null,
    inViewPort: boolean
}