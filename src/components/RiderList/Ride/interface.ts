import { IRide } from '../../../store/types'

export interface IRideProps{
    rideData: IRide
}

export interface ITimeFormat{
    (time: string | null | undefined): string
}