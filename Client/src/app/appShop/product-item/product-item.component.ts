import { Component, Input } from '@angular/core';
import { Product } from 'src/app/appModels/products';


// ! fontAwsome
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product?: Product;
  // @Input() types!: Type;

  addProductCart = faCartPlus;

}
