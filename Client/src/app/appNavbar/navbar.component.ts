import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Basket } from '../appModels/basket';
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
export class NavbarComponent implements AfterViewInit, OnInit {
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('search') searchTerm!: ElementRef
  user!: User;
  product!: Product;
  shopParams!: ShopParams;
  products: Product[] = []
  totalCount = 0;
  showFiller = false;
  myNavCart = faCartArrowDown;
  basket$!: Observable<Basket>;
  currentUser$!: Observable<User>;
  isAdmin$!: Observable<boolean>;




  constructor(public basketService: BasketService, public accountService: AccountService, private router: Router, private shopService: ShopService) {


  }
  ngOnInit(): void {
    // this.basket$ = this.basketService.basketSource$;
    // this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;
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
    this.shopService.getProducts().subscribe({
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
