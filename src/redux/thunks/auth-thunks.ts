import {BaseThunkType} from '../redux-store'
import {authActions, AuthActionsType} from '../actions/auth-actions'
import {auth} from '../../firebase'

export const startAuthStateListening = (): ThunkType => async (dispatch: any) => {
    auth.onAuthStateChanged(authUser => {       //event listener
        console.log('Authorized user is', authUser)

        if(authUser) {
            dispatch(authActions.setUserAuth({
                id: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                name: authUser.displayName,
                phoneNumber: authUser.phoneNumber,
                photoURL: authUser.photoURL,
            }, true))
        } else {
            dispatch(authActions.setUserAuth({
                id: null,
                email: null,
                emailVerified: null,
                name: null,
                phoneNumber: null,
                photoURL: null,
            }, false))
        }
    })
}

type ThunkType = BaseThunkType<AuthActionsType>