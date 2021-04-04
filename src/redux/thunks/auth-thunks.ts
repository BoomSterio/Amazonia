import { BaseThunkType } from '../redux-store'
import { authActions, AuthActionsType } from '../actions/auth-actions'
import { auth } from '../../api/firebase'
import { appActions } from '../actions/app-actions'

export const startAuthStateListening = (): ThunkType => async (dispatch: any) => {
  auth.onAuthStateChanged(authUser => {
    //event listener
    console.log('Authorized user is', authUser)

    if (authUser) {
      dispatch(
        authActions.setUserAuth(
          {
            id: authUser.uid,
            email: authUser.email,
            emailVerified: authUser.emailVerified,
            name: authUser.displayName,
            phoneNumber: authUser.phoneNumber,
            photoURL: authUser.photoURL,
          },
          true
        )
      )
      dispatch(appActions.initializedSuccess())
    } else {
      dispatch(
        authActions.setUserAuth(
          {
            id: '',
            email: null,
            emailVerified: null,
            name: null,
            phoneNumber: null,
            photoURL: null,
          },
          false
        )
      )
      dispatch(appActions.initializedSuccess())
    }
  })
}

export type ThunkType = BaseThunkType<AuthActionsType>
