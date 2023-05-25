import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Product } from 'src/app/appModels/products';
import { ShopService } from 'src/app/appServices/shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';





@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  // @ViewChild('editForm') editForm!: NgForm;
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    $event.returnValue = true;
  }
  product!: Product;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  /**
   *
   */
  constructor(private shopService: ShopService, private bcService: BreadcrumbService, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.shopService.currentProductSource.pipe(take(1)).subscribe({
      next: product => this.product = product!
    })


  }
  ngOnInit() {
    this.loadProduct();
    this.loadProducts();


    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  getImages() {
    if (!this.product) return [];
    const imageUrls = [];
    for (const photo of this.product.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imageUrls;
  }


  loadProducts() {
    if (!this.product) return;
    this.shopService.getProduct(this.product.id).subscribe({
      next: product => this.product = product,
      error: err => console.log(err)
    })
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id)
      this.shopService.getProduct(+id).subscribe({
        next: product => {
          this.product = product;
          this.bcService.set('@productEdit', product.name);
          this.galleryImages = this.getImages();
        },
        error: error => console.log(error)
      })
  }

  updateProduct() {
    if (!this.product) return;
    this.shopService.updateProduct(this.editForm?.value).subscribe({
      next: () => {
        this.toastr.success('Product updated successfully');
        this.editForm?.reset(this.product);
      },
      error: error => console.log(error)
    })
  }

}
