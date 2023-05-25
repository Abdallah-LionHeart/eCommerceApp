import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from 'src/app/appModels/brand';
import { Product } from 'src/app/appModels/products';
import { ShopParams } from 'src/app/appModels/shopParams';
import { Type } from 'src/app/appModels/type';
import { ShopService } from 'src/app/appServices/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm!: ElementRef;
  products: Product[] = []
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price low to high', value: 'priceAsc' },
    { name: 'Price high to low', value: 'priceDsc' }
  ]
  totalCount = 0;

  /**
   *
   */
  constructor(private shopService: ShopService) {

  }


  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();

  }


  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => {
        this.products = response.data;
        console.log(this.products);
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;

      },
      error: error => console.log(error)
    })
  }




  // getProducts() {
  //   this.shopService.getProducts().subscribe({
  //     next: response => {
  //       console.log(response?.data)
  //     }
  //   })
  // }


  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = [{ id: 0, name: 'All' }, ...response],
      error: error => console.log(error)
    })
  }
  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = [{ id: 0, name: 'All' }, ...response],
      error: error => console.log(error)
    })
  }
  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(event: any) {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onRest() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
