import { Address } from "./address";
import { OrderItem } from "./orderItem";

export interface Order {
 id: number;
 buyerEmail: string;
 orderDate: Date;
 shipToAddress: Address;
 shippingPrice: number;
 deliveryMethod: string;
 orderItems: OrderItem[];
 subtotal: number;
 status: string;
 total: number;
}
