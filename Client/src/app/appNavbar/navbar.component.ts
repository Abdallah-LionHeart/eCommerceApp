import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { BasketItem } from '../appModels/basketItem';
import { Product } from '../appModels/products';
import { User } from '../appModels/user';
import { AccountService } from '../appServices/account.service';
import { BasketService } from '../appServices/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user!: User;
  product!: Product;
  @ViewChild('sidebar') sidebar!: ElementRef;
  showFiller = false;

  myNavCart = faCartArrowDown;
  /**
   *
   */
  constructor(public basketService: BasketService, public accountService: AccountService, private router: Router) {


  }

  isShowDivIf = true;
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }

  getBasketCount(items: BasketItem[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
