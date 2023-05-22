import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// !ngx-bootstrap
import { PaginationModule } from 'ngx-bootstrap/pagination';

// !Angular Material
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';




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
    MatTableModule,
    MatProgressSpinnerModule,
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
    MatTableModule,
    MatProgressSpinnerModule,

  ],

})
export class SharedModule { }
