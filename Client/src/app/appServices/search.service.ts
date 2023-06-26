import { Injectable } from '@angular/core';
import { ShopParams } from '../appModels/shopParams';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  shopParams = new ShopParams()
  private searchParamsSubject = new BehaviorSubject<ShopParams>({ search: '', pageNumber: 1 });

  constructor() { }
}
