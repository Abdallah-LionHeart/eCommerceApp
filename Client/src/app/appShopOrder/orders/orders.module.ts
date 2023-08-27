import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderDetailedComponent } from '../order-detailed/order-detailed.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';



@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailedComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
