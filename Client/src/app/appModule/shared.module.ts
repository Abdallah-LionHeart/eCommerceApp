import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// !Angular Material
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // !Angular Material
    MatIconModule,
    MatDividerModule,
  ],
  exports: [

    // !Angular Material
    MatIconModule,
    MatDividerModule,

  ]
})
export class SharedModule { }
