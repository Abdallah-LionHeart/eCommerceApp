import { Component, Input, OnInit } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/appModels/products';
import { BasketService } from 'src/app/appServices/basket.service';


// ! fontAwsome

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product?: Product;

  faPenToSquare = faPenToSquare;
  faCartPlus = faCartPlus;

  constructor(private basketService: BasketService) {
  }

  ngOnInit() {

  }



  addItemToBasket() {
    this.product && this.basketService.addItemToBasket(this.product);
  }


}
