import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Photo } from 'src/app/appModels/photo';
import { Product } from 'src/app/appModels/products';
import { ShopService } from 'src/app/appServices/shop.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @Input() product!: Product;
  uploader!: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  // productPhotoUrl = environment.productPhotoUrl;


  constructor(private shopService: ShopService) {
    this.shopService.currentProduct$.pipe(take(1)).subscribe({
      next: product => {
        if (product) this.product = product!
      }
    })
  }

  ngOnInit() {
    this.initializeUploader();

  }


  setMainPhoto(photo: Photo) {
    this.shopService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.product) {
          this.product.photoUrl = photo.url;
        }
        this.product.photos.forEach(p => {
          if (p.isMain) p.isMain = false;
          if (p.id === photo.id) p.isMain = true;
        })
      }
      // this.shopService.setCurrentProduct(this.product);
      // this.product.mainPhotoUrl = photo.photoUrl;
    })
  }

  deletePhoto(photoId: number) {
    this.shopService.deletePhoto(photoId).subscribe({
      next: () => {
        if (this.product) {
          this.product.photos = this.product.photos.filter(x => x.id !== photoId);
        }
      }
    })
  }

  // setMainPhoto(photo: Photo) {
  //   this.shopService.setMainPhoto(photo.id).subscribe(() => {
  //     this.product.photos.forEach(p => {
  //       if (p.isMain) p.isMain = false;
  //       if (p.id === photo.id) p.isMain = true;
  //     })
  //     // this.shopService.setCurrentProduct(this.product);
  //     // this.product.mainPhotoUrl = photo.photoUrl;
  //   })
  // }



  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'products/add-photo/' + this.product.id,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 //10MB
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.product.photos.push(photo);
        // if (photo.isMain) {
        // this.shopService.setCurrentProduct(photo);
        // this.product.mainPhotoUrl = photo.photoUrl;
      }
    }
  }
}



