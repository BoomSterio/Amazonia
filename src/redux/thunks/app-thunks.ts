import { startAuthStateListening } from './auth-thunks'

export const initializeApp = () => (dispatch: any) => {
  dispatch(startAuthStateListening())
  /*Promise.all([])
        .then(() => {
            dispatch(appActions.initializedSuccess())
        })*/
}
