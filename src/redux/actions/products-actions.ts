import { InferActionsTypes } from '../redux-store'
import { FullProductType } from '../../types/types'

export const productsActions = {
  setProducts: (products: FullProductType[]) => ({ type: 'products/SET_PRODUCTS', products } as const),
  addProducts: (newProducts: FullProductType[]) => ({ type: 'products/ADD_PRODUCTS', newProducts } as const),
}

export type ActionsTypes = InferActionsTypes<typeof productsActions>
