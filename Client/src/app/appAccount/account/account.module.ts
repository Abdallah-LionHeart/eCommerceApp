import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/appModule/shared.module';
import { AccountRoutingModule } from './account-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
    // AccountComponent,
  ]
})
export class AccountModule { }
