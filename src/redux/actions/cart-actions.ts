import {InferActionsTypes} from '../redux-store'
import {CartProductType} from '../../types/types'

export const cartActions = {
    addToCart: (item: CartProductType) => ({type: 'cart/ADD_TO_CART', item} as const),
    deleteFromCart: () => ({type: 'cart/DELETE_FROM_CART'} as const)
}

export type CartActionsType = InferActionsTypes<typeof cartActions>