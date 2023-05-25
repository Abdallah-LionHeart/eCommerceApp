import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
import { HomeComponent } from './appHome/home.component';
import { ErrorInterceptor } from './appInterceptors/error.interceptor';
import { LoadingInterceptor } from './appInterceptors/loading.interceptor';
import { SharedModule } from './appModule/shared.module';
import { NavbarComponent } from './appNavbar/navbar.component';
import { PhotoEditorComponent } from './appPhoto/photo-editor/photo-editor.component';
import { FooterComponent } from './appUi/footer/footer.component';
import { HeaderComponent } from './appUi/header/header.component';
import { NavBarComponent } from './appUiParts/nav-bar/nav-bar.component';
import { SectionHeaderComponent } from './appUiParts/section-header/section-header.component';
import { FileUploader } from 'ng2-file-upload';
// import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';




@NgModule({
  declarations: [
    AppComponent,

    // ShopComponent,
    NavbarComponent,
    // ProductItemComponent,
    FooterComponent,
    HeaderComponent,
    SectionHeaderComponent,
    // ProductDetailsComponent,
    NavBarComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,

    HomeComponent,
    PhotoEditorComponent,
    // ProductEditComponent,
    // CarouselModule,


  ],
  imports: [
    FormsModule,
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
    FileUploader,
    // NgxUsefulSwiperModule,

  ],
  exports: [
    HttpClientModule,
    NgxSpinnerModule,
    CarouselModule,
    FormsModule,
    PhotoEditorComponent,


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
