import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './appModule/shared.module';
import { NavbarComponent } from './appNavbar/navbar.component';
import { ProductDetailsComponent } from './appShop/product-details/product-details.component';
import { ProductItemComponent } from './appShop/product-item/product-item.component';
import { ShopComponent } from './appShop/shop/shop.component';
import { FooterComponent } from './appUi/footer/footer.component';
import { HeaderComponent } from './appUi/header/header.component';
import { HomeComponent } from './appUi/home/home.component';
import { NavBarComponent } from './appUiParts/nav-bar/nav-bar.component';
import { PagerComponent } from './appUiParts/pager/pager.component';
import { PagingHeaderComponent } from './appUiParts/paging-header/paging-header.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';


@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    NavbarComponent,
    ProductItemComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PagingHeaderComponent,
    PagerComponent,
    ProductDetailsComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
    // NgxUsefulSwiperModule,

  ],
  exports: [
    HttpClientModule,
    PagingHeaderComponent,
    PagerComponent,
    HomeComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
