import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { StepperComponent } from '../appComponent/stepper/stepper.component';
import { TextInputComponent } from '../appComponent/text-input/text-input.component';
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
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// !Angular Material
import { CdkStepperModule } from '@angular/cdk/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from "ng2-currency-mask";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BasketSummaryComponent } from '../appComponent/basket-summary/basket-summary.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};
@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    PhotoEditorComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,






  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FileUploadModule,
    ReactiveFormsModule,
    CdkStepperModule,
    CurrencyMaskModule,
    FormsModule,
    // OrderModule,
    CarouselModule.forRoot(),
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
    TooltipModule.forRoot(),


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
    MatStepperModule,
    MatTooltipModule,
  ],

  exports: [
    PagingHeaderComponent,
    PagerComponent,
    PhotoEditorComponent,
    FileUploadModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    StepperComponent,
    CdkStepperModule,
    TextInputComponent,
    BasketSummaryComponent,
    RouterModule,
    CarouselModule,
    CurrencyMaskModule,
    FormsModule,





    // !ngx-bootstrap
    PaginationModule,
    NgxGalleryModule,
    TabsModule,
    BsDropdownModule,
    TooltipModule,


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
    MatStepperModule,
    MatTooltipModule,



  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],

})
export class SharedModule { }
