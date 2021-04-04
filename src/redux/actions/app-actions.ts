import { InferActionsTypes } from '../redux-store'

export const appActions = {
  initializedSuccess: () => ({ type: 'app/INITIALIZED_SUCCESS' } as const),
}

export type ActionsTypes = InferActionsTypes<typeof appActions>
