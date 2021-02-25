export type ProductType = {
    id: number,
    price: number,
    title: string,
    image: string,
    rating: number
}

export interface CartProductType extends ProductType {
    quantity: number
}