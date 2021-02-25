import {InferActionsTypes} from '../redux-store'
import {CartProductType} from '../../types/types'

export const checkoutActions = {
    addToCart: (item: CartProductType) => ({type: 'cart/ADD_TO_CART', item} as const),
    deleteFromCart: (id: number) => ({type: 'cart/DELETE_FROM_CART', id} as const),
    changeProductQuantity: (id: number, quantity: number) => ({type: 'cart/CHANGE_PRODUCT_QUANTITY', id, quantity} as const)
}

export type CheckoutActionsType = InferActionsTypes<typeof checkoutActions>