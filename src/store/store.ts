import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { ActionTypes, SET_RIDES, SET_RIDES_VIEW_PORT, SET_SELECTED_RIDE } from './actions'
import { IState } from './types'

const initialState: IState = {
    rides: [],
    selectedRide: null,
    inViewPort: false
}

//redux implements - reducer
const fastRiderReducer = (state: IState = initialState , action: ActionTypes): IState => {
    switch (action.type) {
        case SET_RIDES:
            return {...state, rides: action.payload}
        case SET_SELECTED_RIDE:
            return {...state, selectedRide: action.payload}
        case SET_RIDES_VIEW_PORT:
            return {...state, inViewPort: action.payload}
        default:
            return state;
    }
}

//make a store
const store = createStore(fastRiderReducer, applyMiddleware(thunk))

export default store;
