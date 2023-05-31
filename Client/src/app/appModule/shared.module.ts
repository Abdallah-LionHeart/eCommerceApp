import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// !ngx-bootstrap
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';

// !Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';
import { PhotoEditorComponent } from '../appPhoto/photo-editor/photo-editor.component';
import { OrderTotalsComponent } from '../appShopOrder/order-totals/order-totals.component';
import { PagerComponent } from '../appUiParts/pager/pager.component';
import { PagingHeaderComponent } from '../appUiParts/paging-header/paging-header.component';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    PhotoEditorComponent,
    OrderTotalsComponent,


  ],

  imports: [
    CommonModule,
    RouterModule,
    FileUploadModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-middle-center',
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        preventDuplicates: true,
        enableHtml: true,
        closeButton: true,
        autoDismiss: true,
        resetTimeoutOnDuplicate: true,
      }),




    // !ngx-bootstrap
    PaginationModule.forRoot(),
    NgxGalleryModule,
    TabsModule,


    // !Angular Material

    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule
  ],

  exports: [
    PagingHeaderComponent,
    PagerComponent,
    PhotoEditorComponent,
    FileUploadModule,
    OrderTotalsComponent,



    // !ngx-bootstrap
    PaginationModule,
    NgxGalleryModule,
    TabsModule,


    // !Angular Material
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule



  ],

})
export class SharedModule { }
