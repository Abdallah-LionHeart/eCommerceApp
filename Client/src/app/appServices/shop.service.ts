import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Brand } from '../appModels/brand';
import { Pagination } from '../appModels/pagination';
import { Product } from '../appModels/products';
import { ShopParams } from '../appModels/shopParams';
import { Type } from '../appModels/type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  currentProductSource = new BehaviorSubject<Product | null>(null);
  currentProduct$ = this.currentProductSource.asObservable();
  products!: Product[];

  constructor(private http: HttpClient) { }


  getProducts(shopParams: ShopParams) {
    // if (this.products.length > 0) return of(this.products);
    let params = new HttpParams();
    if (shopParams.brandId > 0) params = params.append('brandId', shopParams.brandId);
    if (shopParams.typeId) params = params.append('typeId', shopParams.typeId);
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);
    if (shopParams.search) params = params.append('search', shopParams.search);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', { params });
  }

  // return this.http.get<IPagination>(this.API_URL + 'products', { observe: 'response', params })
  // .pipe(
  //   map(
  //     response => {
  //       return response.body;
  //     }
  //   )
  // )


  getProduct(id: number) {
    const product = this.products.find(x => x.id === id);
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  updateProduct(product: Product) {
    return this.http.put(this.baseUrl + 'products', product).pipe(
      map(() => {
        const index = this.products.indexOf(product);
        this.products[index] = { ...this.products[index], ...product }
      })
    )
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }
  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'products/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'products/delete-photo/' + photoId);
  }

  // getHttpOptions() {
  //   const productString = localStorage.getItem('product');
  //   if (!productString) return;
  //   const product = JSON.parse(productString);
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + product.token
  //     })
  //   }
  // }
}
