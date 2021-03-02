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
    method: 'EMS Economy' | 'UPS Express' | 'FedEx' | 'DHL International'
}

export type DeliveryStatusType = 'In Processing' | 'Delivering' | 'Completed'
