import { AuthActionsType } from '../actions/auth-actions'
import { UserType } from '../../types/types'

let initialState = {
  user: {} as UserType,
  isAuth: false,
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case 'auth/SET_USER_AUTH':
      return {
        ...state,
        user: action.user,
        isAuth: action.isAuth,
      }

    default:
      return state
  }
}

export default authReducer
