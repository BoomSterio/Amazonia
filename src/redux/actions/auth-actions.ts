import {InferActionsTypes} from '../redux-store'
import {UserType} from '../../types/types'

export const authActions = {
    setUserAuth: (user: UserType, isAuth: boolean) => ({type: 'auth/SET_USER_AUTH', user, isAuth} as const)
}

export type AuthActionsType = InferActionsTypes<typeof authActions>