import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/appModule/shared.module';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    // AppRoutingModule,
  ]
})
export class ShopModule { }
