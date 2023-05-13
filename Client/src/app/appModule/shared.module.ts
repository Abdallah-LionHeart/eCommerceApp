import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// !ngx-bootstrap
import { PaginationModule } from 'ngx-bootstrap/pagination';

// !Angular Material
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,


    // !ngx-bootstrap
    PaginationModule.forRoot(),


    // !Angular Material
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
  ],
  exports: [

    // !ngx-bootstrap
    PaginationModule,

    // !Angular Material
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,

  ]
})
export class SharedModule { }
