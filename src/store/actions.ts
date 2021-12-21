import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { IRide, IState, ISelectedRide } from './types'
import { getApiRequest } from '../api/api'

export const SET_RIDES = "SET_RIDES";
export const SET_SELECTED_RIDE = "SET_SELECTED_RIDE";
export const SET_RIDES_VIEW_PORT = "SET_RIDES_VIEW_PORT";


export type ActionTypes =
    | { type: typeof SET_RIDES, payload: IRide[] }
    | { type: typeof SET_SELECTED_RIDE, payload: ISelectedRide }
    | { type: typeof SET_RIDES_VIEW_PORT, payload: boolean }


//async action
export const getRides = (): ThunkAction<void, IState, unknown, Action<string>> => async (dispatch) => {
    const ridesResp = await getApiRequest();
    dispatch({type: SET_RIDES, payload: ridesResp})
}