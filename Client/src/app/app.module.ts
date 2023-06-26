import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from 'ng2-file-upload';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './appAccount/account/account.component';
import { LoginComponent } from './appAccount/login/login.component';
import { RegisterComponent } from './appAccount/register/register.component';
import { TextInputComponent } from './appComponent/text-input/text-input.component';
import { NotFoundComponent } from './appError/not-found/not-found.component';
import { ServerErrorComponent } from './appError/server-error/server-error.component';
import { TestErrorComponent } from './appError/test-error/test-error.component';
import { HomeComponent } from './appHome/home.component';
import { ErrorInterceptor } from './appInterceptors/error.interceptor';
import { LoadingInterceptor } from './appInterceptors/loading.interceptor';
import { SharedModule } from './appModule/shared.module';
import { NavbarComponent } from './appNavbar/navbar.component';
import { FooterComponent } from './appUiParts/footer/footer.component';
import { SectionHeaderComponent } from './appUiParts/section-header/section-header.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SectionHeaderComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    TextInputComponent,



  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
    BreadcrumbModule,
    NgxSpinnerModule.forRoot(),
    CarouselModule.forRoot(),
    FileUploadModule,
    FontAwesomeModule,
    // LoadingInterceptor,


  ],

  exports: [
    HttpClientModule,
    NgxSpinnerModule,
    CarouselModule,
    FormsModule,
    TextInputComponent,
    // LoadingInterceptor,



  ],

  schemas: [
    NO_ERRORS_SCHEMA
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
