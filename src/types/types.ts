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

export type UserType = {
    id: string | null,
    name: string | null,
    phoneNumber: string | null,
    photoURL: string | null,
    email: string | null,
    emailVerified: boolean | null
}