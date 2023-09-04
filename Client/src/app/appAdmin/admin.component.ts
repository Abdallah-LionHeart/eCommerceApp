import { Component, OnInit } from '@angular/core';
import { Product } from '../appModels/products';
import { ShopParams } from '../appModels/shopParams';
import { AdminService } from '../appServices/admin.service';
import { ShopService } from '../appServices/shop.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  // @Input() product?: Product;
  products!: Product[];
  totalCount!: number;
  shopParams!: ShopParams;


  constructor(private adminService: AdminService, private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();

  }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe({
      next: response => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      error: error =>
        console.error(error)
    })
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts(true);
    }
  }

  deleteProduct(id: number) {
    this.adminService.deleteProduct(id).subscribe({
      next: () => {
        this.products.splice(this.products.findIndex(p => p.id === id), 1);
        this.totalCount--;
      }
    });
  }
}
