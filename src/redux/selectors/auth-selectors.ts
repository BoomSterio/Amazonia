import {AppStateType} from '../redux-store'

export const getAuthUser = (state: AppStateType) => {
    return state.auth.user
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}