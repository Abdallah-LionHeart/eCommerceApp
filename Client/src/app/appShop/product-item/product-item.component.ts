import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/appModels/products';


// ! fontAwsome
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ShopService } from 'src/app/appServices/shop.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  addProductCart = faCartPlus;
  @Input() product!: Product;
  // products$: Observable<Product[]> | undefined


  constructor(private shopService: ShopService) {


  }
  ngOnInit() {
    // this.products$ = this.shopService.getProducts();
  }
  // @Input() types!: Type;


}
