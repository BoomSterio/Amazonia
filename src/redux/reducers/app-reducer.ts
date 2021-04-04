import { ActionsTypes } from '../actions/app-actions'

let initialState = {
  initialized: false,
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'app/INITIALIZED_SUCCESS': {
      return {
        ...state,
        initialized: true,
      }
    }

    default:
      return state
  }
}

export default appReducer
