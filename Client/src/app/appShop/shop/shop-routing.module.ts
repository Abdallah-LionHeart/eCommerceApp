import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: ':id', component: ProductDetailsComponent, data: { breadcrumb: { alias: 'productDetails' } } },
  { path: 'edit/:id', component: ProductEditComponent, data: { breadcrumb: { alias: 'productEdit' } } },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class ShopRoutingModule { }
