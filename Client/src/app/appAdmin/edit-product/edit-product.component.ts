import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductFormValues } from 'src/app/appModels/ProductCreate';
import { Brand } from 'src/app/appModels/brand';
import { Type } from 'src/app/appModels/type';
import { AdminService } from 'src/app/appServices/admin.service';
import { ShopService } from 'src/app/appServices/shop.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: ProductFormValues;
  brands?: Brand[];
  types?: Type[];



  constructor(private adminService: AdminService, private shopService: ShopService, private router: Router, private route: ActivatedRoute) {
    this.product = new ProductFormValues();
  }
  ngOnInit(): void {
    const brands = this.getBrands();
    const types = this.getTypes();

    forkJoin([types, brands]).subscribe({
      next: (result: any) => {
        this.types = result[0];
        this.brands = result[1];
      },
      error: (error: Error) => {
        console.log(error);
      },
      complete: () => {
        if (this.route.snapshot.url[0].path === 'edit') {
          this.loadProduct();
        }
      }
    });
  }



  updatePrice(event: any) {
    this.product.price = event;
  }

  getBrands() {
    return this.shopService.getBrands();
  }

  getTypes() {
    return this.shopService.getTypes();
  }

  loadProduct() {
    const productIdParam = this.route.snapshot.paramMap.get('id');

    if (productIdParam !== null) {
      const productId = +productIdParam;
      const product = this.shopService.getProduct(productId);

      product.subscribe({
        next: (response) => {
          const productBrandId = response.productBrand ? this.brands?.find(x => x.name === response.productBrand)?.id || 0 : 0;
          const productTypeId = response.productType ? this.types?.find(x => x.name === response.productType)?.id || 0 : 0;
          this.product = { ...response, productBrandId, productTypeId };
        }
      });
    }
  }



  onSubmit(product: ProductFormValues) {
    const productIdParam = this.route.snapshot.paramMap.get('id');

    if (productIdParam !== null) {
      const productId = +productIdParam;
      if (this.route.snapshot.url[0].path === 'edit') {
        const updatedProduct = { ...this.product, ...product, price: +product.price };
        this.adminService.updateProduct(updatedProduct, productId).subscribe({
          next: () => {
            this.router.navigate(['/admin'])
          }
        });
      } else {
        const newProduct = { ...product, price: +product.price };
        this.adminService.createProduct(newProduct).subscribe({
          next: () => {
            this.router.navigate(['/admin'])
          }
        })
      }
    }

  }
}

// loadProducts() {
//   const productIdParam = this.route.snapshot.paramMap.get('id');

//   if (productIdParam !== null) {
//     const productId = +productIdParam;
//     const product = this.shopService.getProduct(productId);

//     product.subscribe({
//       next: (response) => {
//         const productBrandId = this.brands && this.brands.find(x => x.name === response.productBrand)?.id;
//         const productTypeId = this.types && this.types.find(x => x.name === response.productType)?.id;
//         this.product = {
//           ...response, productBrandId, productTypeId
//         };
//       }
//     });
//   } else {
//     // Handle the case when 'id' is null, e.g., show an error message or redirect.
//   }
// }