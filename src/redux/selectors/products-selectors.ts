import { AppStateType } from '../redux-store'
import { FullProductType } from '../../types/types'

export const getAllProducts = (state: AppStateType) => {
  return state.products.products
}

export const getProductById = (id: number) => (state: AppStateType) => {
  return state.products.products.find(p => p.id === id)
}
