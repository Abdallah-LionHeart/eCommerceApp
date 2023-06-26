import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { BasketItem } from '../appModels/basketItem';
import { Product } from '../appModels/products';
import { ShopParams } from '../appModels/shopParams';
import { User } from '../appModels/user';
import { AccountService } from '../appServices/account.service';
import { BasketService } from '../appServices/basket.service';
import { ShopService } from '../appServices/shop.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('search') searchTerm!: ElementRef
  user!: User;
  product!: Product;
  shopParams!: ShopParams;
  products: Product[] = []
  totalCount = 0;
  showFiller = false;

  myNavCart = faCartArrowDown;
  /**
   *
   */
  constructor(public basketService: BasketService, public accountService: AccountService, private router: Router, private shopService: ShopService) {


  }
  ngAfterViewInit() {

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
  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;
        // console.log(this.products);
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;

      },
      error: error => console.log(error)
    })
  }

}
