import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// !ngx-bootstrap
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

// !Angular Material
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PagerComponent } from '../appUiParts/pager/pager.component';
import { PagingHeaderComponent } from '../appUiParts/paging-header/paging-header.component';
// import { FileUploader } from 'ng2-file-upload';



@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,



    // !ngx-bootstrap
    PaginationModule.forRoot(),
    NgxGalleryModule,
    TabsModule,
    // FileUploader,


    // !Angular Material
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent,

    // !ngx-bootstrap
    PaginationModule,
    NgxGalleryModule,
    TabsModule,
    // FileUploader,


    // !Angular Material
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTabsModule,


  ],

})
export class SharedModule { }
