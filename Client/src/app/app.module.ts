import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './appAccount/account/account.component';
import { LoginComponent } from './appAccount/login/login.component';
import { RegisterComponent } from './appAccount/register/register.component';
import { AdminComponent } from './appAdmin/admin.component';
import { NotFoundComponent } from './appError/not-found/not-found.component';
import { ServerErrorComponent } from './appError/server-error/server-error.component';
import { TestErrorComponent } from './appError/test-error/test-error.component';
import { HomeComponent } from './appHome/home.component';
import { ErrorInterceptor } from './appInterceptors/error.interceptor';
import { JwtInterceptor } from './appInterceptors/jwt.interceptor';
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
    AdminComponent,





  ],
  imports: [
    // FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
    BreadcrumbModule,
    NgxSpinnerModule.forRoot(),
    FileUploadModule,
    FontAwesomeModule,
    // LoadingInterceptor,


  ],

  exports: [
    HttpClientModule,
    NgxSpinnerModule,

    // FormsModule,
    // LoadingInterceptor,



  ],

  schemas: [
    NO_ERRORS_SCHEMA
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
