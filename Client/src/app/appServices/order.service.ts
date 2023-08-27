import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Order } from '../appModels/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersForUser() {
    return this.http.get<Order[]>(this.baseUrl + 'orders');
  }

  getOrderDetailed(id: number) {
    return this.http.get<Order>(this.baseUrl + 'orders/' + id);
  }
}
