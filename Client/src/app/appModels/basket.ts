import * as cuid from "cuid";
import { BasketItem } from "./basketItem";

export interface Basket {
 id: string;
 items: BasketItem[];
 clientSecret?: string;
 paymentIntentId?: string;
 deliveryMethodId?: number;
 shippingPrice: number;
}


export class Basket implements Basket {
 id = cuid();
 items: BasketItem[] = [];
 shippingPrice = 0;

}


