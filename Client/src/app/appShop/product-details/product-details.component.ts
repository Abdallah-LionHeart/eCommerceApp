import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs';
import { Photo } from 'src/app/appModels/photo';
import { Product } from 'src/app/appModels/products';
import { BasketService } from 'src/app/appServices/basket.service';
import { ShopService } from 'src/app/appServices/shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('productTabs', { static: true }) productTabs!: TabsetComponent;
  product!: Product;
  photos!: Photo;
  quantity = 1;
  quantityInBasket = 0;
  /**
   *
   */
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService, private basketService: BasketService) {

    this.bcService.set('@productDetails', ' ');
  }
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id)
      this.shopService.getProduct(+id).subscribe({
        next: product => {
          this.product
          this.product = product;
          this.bcService.set('@productDetails', product.name);
          this.basketService.basketSource$.pipe(take(1)).subscribe({
            next: basket => {
              const item = basket?.items.find(x => x.id == +id);
              if (item) {
                this.quantity = item.quantity;
                this.quantityInBasket = item.quantity;
              }
            }
          })
        }
      })
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    if (this.quantity > 1)
      this.quantity--;
  }
  updateBasket() {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        const itemToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemToAdd;
        this.basketService.addItemToBasket(this.product, itemToAdd);
      }
      else {
        const itemToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemToRemove;
        this.basketService.removeItemFromBasket(this.product.id, itemToRemove);
      }
    }
  }

  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to Basket' : 'Update Basket';
  }



  selectTab(heading: string) {
    if (this.productTabs) {
      this.productTabs.tabs.find(x => x.heading == heading)!.active = true
    }
  }
}
