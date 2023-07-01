import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Basket } from '../appModels/basket';
import { BasketItem } from '../appModels/basketItem';
import { BasketTotal } from '../appModels/basketTotal';
import { DeliveryMethod } from '../appModels/deliveryMethod';
import { Product } from '../appModels/products';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotal | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) { }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
    // const basket = this.getCurrentBasketValue();
    // if (basket) {
    //   basket.shippingPrice = deliveryMethod.price;
    //   basket.deliveryMethodId = deliveryMethod.id;
    //   this.setBasket(basket);
    // }
  }


  getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product | BasketItem, quantity = 1) {
    if (this.isProduct(item))
      item = this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    this.setBasket(basket);
  }

  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(i => i.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: Product): BasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      photoUrl: item.photoUrl,
      quantity: 0,
      brand: item.productBrand,
      type: item.productType
    }

  }

  incrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket?.items.findIndex(x => x.id === item.id);
    if (foundItemIndex !== undefined) {
      basket!.items[foundItemIndex].quantity++;
      this.setBasket(basket!);
    }
  }
  decrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket?.items.findIndex(x => x.id === item.id);
    if (foundItemIndex !== undefined) {
      if (basket!.items[foundItemIndex].quantity > 1) {
        basket!.items[foundItemIndex].quantity--;
        this.setBasket(basket!);
      } else {
        this.removeItemFromBasket(item.id);
      }
    }
  }
  // private removeItemFromBasket(item: BasketItem) {
  //   const basket = this.getCurrentBasketValue();
  //   if (basket?.items.some(x => x.id === item.id)) {
  //     basket!.items = basket!.items.filter(i => i.id !== item.id);
  //     if (basket!.items.length > 0) {
  //       this.setBasket(basket!);
  //     } else {
  //       this.deleteBasket(basket!);
  //     }
  //   }
  // }

  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const item = basket.items.find(x => x.id === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        basket.items = basket.items.filter(i => i.id !== id);
      }
      if (basket.items.length > 0) this.setBasket(basket);
      else
        this.deleteBasket(basket);
    }
  }


  private deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      }
    })
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const subtotal = basket?.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = this.shipping + subtotal;
    this.basketTotalSource.next({ shipping: this.shipping, total, subtotal });
  }

  private isProduct(item: Product | BasketItem): item is Product {
    return (item as Product).productBrand !== undefined;
  }
}

