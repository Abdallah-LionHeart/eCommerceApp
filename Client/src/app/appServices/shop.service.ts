import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../appModels/brand';
import { Pagination } from '../appModels/pagination';
import { Product } from '../appModels/products';
import { Type } from '../appModels/type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }


  getProducts(brandId?: number, typeId?: number) {
    let params = new HttpParams();
    if (brandId) params = params.append('brandId', brandId);
    if (typeId) params = params.append('typeId', typeId);
    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', { params });
  }

  // getProduct(id: number) {
  //   return this.http.get(this.baseUrl + 'product' + id);
  // }
  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }
  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }
}
