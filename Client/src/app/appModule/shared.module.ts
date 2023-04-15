import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// !Angular Material
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // !Angular Material
    MatIconModule
  ],
  exports: [

    // !Angular Material
    MatIconModule,

  ]
})
export class SharedModule { }
