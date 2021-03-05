export type ProductType = {
    id: number,
    price: number,
    title: string,
    image: string,
    rating: number,
    inStock: number
}

export interface CartProductType extends ProductType {
    quantity: number
}

export type FullProductType = {
    id: number,
    price: number,
    title: string,
    images: string[],
    description: string,
    specs: {name: string, info: string}[],
    inStock: number
    rating: number
}

export type UserType = {
    id: string,
    name: string | null,
    phoneNumber: string | null,
    photoURL: string | null,
    email: string | null,
    emailVerified: boolean | null
}

export type DeliveryType = {
    fullName: string,
    phone: string,
    country: string,
    city: string,
    addressLine: string,
    index: number,
    email: string
    details: string | null,
    method: DeliveryMethodType,
    isValid: boolean
}

export type DeliveryMethodType = 'EMS Economy' | 'UPS Express' | 'FedEx' | 'DHL International'

export type DeliveryStatusType = 'In Processing' | 'Delivering' | 'Completed' | 'Cancelled'
