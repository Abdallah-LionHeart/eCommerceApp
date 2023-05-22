import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './appError/not-found/not-found.component';
import { ServerErrorComponent } from './appError/server-error/server-error.component';
import { TestErrorComponent } from './appError/test-error/test-error.component';
import { ErrorInterceptor } from './appInterceptors/error.interceptor';
import { LoadingInterceptor } from './appInterceptors/loading.interceptor';
import { SharedModule } from './appModule/shared.module';
import { NavbarComponent } from './appNavbar/navbar.component';
import { ProductDetailsComponent } from './appShop/product-details/product-details.component';
import { ProductItemComponent } from './appShop/product-item/product-item.component';
import { ShopComponent } from './appShop/shop/shop.component';
import { FooterComponent } from './appUi/footer/footer.component';
import { HeaderComponent } from './appUi/header/header.component';
import { NavBarComponent } from './appUiParts/nav-bar/nav-bar.component';
import { PagerComponent } from './appUiParts/pager/pager.component';
import { PagingHeaderComponent } from './appUiParts/paging-header/paging-header.component';
import { SectionHeaderComponent } from './appUiParts/section-header/section-header.component';
import { HomeComponent } from './appHome/home.component';




@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    NavbarComponent,
    ProductItemComponent,
    FooterComponent,
    HeaderComponent,
    PagingHeaderComponent,
    PagerComponent,
    ProductDetailsComponent,
    NavBarComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SectionHeaderComponent,
    HomeComponent,
    // CarouselModule,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
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
      }
    ),
    BreadcrumbModule,
    NgxSpinnerModule.forRoot(),
    CarouselModule,
    // NgxUsefulSwiperModule,

  ],
  exports: [
    HttpClientModule,
    PagingHeaderComponent,
    PagerComponent,
    SectionHeaderComponent,
    NgxSpinnerModule,
    CarouselModule,

  ],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
