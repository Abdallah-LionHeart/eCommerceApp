import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environments';
import { ProductFormValues } from '../appModels/ProductCreate';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }


  createProduct(product: ProductFormValues) {
    return this.http.post(this.baseUrl + 'products', product)
  }

  updateProduct(product: ProductFormValues, id: number) {
    return this.http.put(this.baseUrl + 'products/' + id, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'products/' + id)
  }
}
