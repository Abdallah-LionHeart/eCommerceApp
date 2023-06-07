import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { PhotoEditorComponent } from '../appPhoto/photo-editor/photo-editor.component';
import { OrderTotalsComponent } from '../appShopOrder/order-totals/order-totals.component';
import { PagerComponent } from '../appUiParts/pager/pager.component';
import { PagingHeaderComponent } from '../appUiParts/paging-header/paging-header.component';

// !ngx-bootstrap
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';

// !Angular Material
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';


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
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-center',
        timeOut: 4000,
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
    BsDropdownModule.forRoot(),


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
    MatButtonModule,
    MatGridListModule,
    MatCheckboxModule,
  ],

  exports: [
    PagingHeaderComponent,
    PagerComponent,
    PhotoEditorComponent,
    FileUploadModule,
    OrderTotalsComponent,
    ReactiveFormsModule,



    // !ngx-bootstrap
    PaginationModule,
    NgxGalleryModule,
    TabsModule,
    BsDropdownModule,


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
    MatButtonModule,
    MatGridListModule,
    MatCheckboxModule,



  ],

})
export class SharedModule { }
