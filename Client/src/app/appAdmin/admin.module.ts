import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../appModule/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { EditProductComponent } from './edit-product/edit-product.component';



@NgModule({
  declarations: [
    EditProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  exports: [
    AdminRoutingModule
  ]
})
export class AdminModule { }
