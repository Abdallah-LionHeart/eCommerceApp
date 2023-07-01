import { Address } from "./address";

export interface OrderToCreate {
 basketId: string;
 deliveryMethodId: number;
 shipToAddress: Address;
}