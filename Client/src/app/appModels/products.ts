import { Photo } from "./photo"

export interface Product {
 id: number
 name: string
 photoUrl: string
 specification: string
 generation: string
 price: number
 condition: string
 quantity: number
 storageSize: string
 ramSize: string
 touchScreen: boolean
 photos: Photo[]
 productType: string
 productBrand: string
}
