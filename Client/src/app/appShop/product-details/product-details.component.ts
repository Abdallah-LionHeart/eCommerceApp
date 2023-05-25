import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Product } from 'src/app/appModels/products';
import { ShopService } from 'src/app/appServices/shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('productTabs', { static: true }) productTabs!: TabsetComponent;
  product?: Product;
  /**
   *
   */
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService) {

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
          this.product = product;
          this.bcService.set('@productDetails', product.name);
        },
        error: error => console.log(error)
      })
  }



  selectTab(heading: string) {
    if (this.productTabs) {
      this.productTabs.tabs.find(x => x.heading == heading)!.active = true
    }
  }
}
