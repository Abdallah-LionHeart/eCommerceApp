import { Component } from '@angular/core';
import { BasketItem } from '../appModels/basketItem';
import { BasketService } from '../appServices/basket.service';

type NewType = BasketItem;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {


  /**
   *
   */
  constructor(public basketService: BasketService) {

  }

  incrementItemQuantity(item: BasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  // decrementItemQuantity(item: BasketItem) {
  //   this.basketService.decrementItemQuantity(item);
  // }

  // decrementItemQuantity(id: number, quantity: number) {
  //   this.basketService.removeItemFromBasket(id, quantity);
  // }

  removeBasketItem(event: { id: number, quantity: number }) {
    this.basketService.removeItemFromBasket(event.id, event.quantity);
  }

}
