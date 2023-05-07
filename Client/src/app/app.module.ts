import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './appModule/shared.module';
import { NavbarComponent } from './appNavbar/navbar.component';
import { ProductItemComponent } from './appShop/product-item/product-item.component';
import { ShopComponent } from './appShop/shop/shop.component';
import { FooterComponent } from './appUi/footer/footer.component';
import { HeaderComponent } from './appUi/header/header.component';
import { HomeComponent } from './appUi/home/home.component';
import { PagerComponent } from './appUiParts/pager/pager.component';
import { PagingHeaderComponent } from './appUiParts/paging-header/paging-header.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  exports: [
    HttpClientModule,
    PagingHeaderComponent,
    PagerComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
