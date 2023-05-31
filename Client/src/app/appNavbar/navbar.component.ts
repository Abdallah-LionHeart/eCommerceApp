import { Component } from '@angular/core';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { BasketService } from '../appServices/basket.service';
import { BasketItem } from '../appModels/basketItem';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  myNavCart = faCartArrowDown;
  /**
   *
   */
  constructor(public basketService: BasketService) {


  }

  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }

  getBasketCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

}
