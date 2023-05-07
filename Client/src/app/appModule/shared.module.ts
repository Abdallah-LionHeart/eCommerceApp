import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// !ngx-bootstrap
import { PaginationModule } from 'ngx-bootstrap/pagination';

// !Angular Material
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // !ngx-bootstrap
    PaginationModule.forRoot(),


    // !Angular Material
    MatIconModule,
    MatDividerModule,
  ],
  exports: [

    // !ngx-bootstrap
    PaginationModule,

    // !Angular Material
    MatIconModule,
    MatDividerModule,

  ]
})
export class SharedModule { }
