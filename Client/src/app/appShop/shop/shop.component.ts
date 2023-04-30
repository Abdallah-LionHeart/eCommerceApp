import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/appModels/brand';
import { Product } from 'src/app/appModels/products';
import { Type } from 'src/app/appModels/type';
import { ShopService } from 'src/app/appServices/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products!: Product[]
  brands!: Brand[];
  types!: Type[];
  brandIdSelected = 0;
  typeIdSelected = 0;
  sortSelected = 'name';
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price low to high', value: 'priceAsc' },
    { name: 'Price high to low', value: 'priceDsc' }
  ]

  /**
   *
   */
  constructor(private shopservice: ShopService) {

  }


  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();

  }

  getProducts() {
    this.shopservice.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected).subscribe({
      next: response => this.products = response.data,
      error: error => console.log(error)
    })
  }
  getBrands() {
    this.shopservice.getBrands().subscribe({
      next: response => this.brands = [{ id: 0, name: 'All' }, ...response],
      error: error => console.log(error)
    })
  }
  getTypes() {
    this.shopservice.getTypes().subscribe({
      next: response => this.types = [{ id: 0, name: 'All', processorType: 'All', memorySize: 'All' }, ...response],
      error: error => console.log(error)
    })
  }
  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.sortSelected = event.target.value;
    this.getProducts();
  }



}
