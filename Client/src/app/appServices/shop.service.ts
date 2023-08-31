import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
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
  // products!: Product[];
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  pagination?: Pagination<Product[]>;
  shopParams = new ShopParams();
  productCache = new Map<string, Pagination<Product[]>>();


  constructor(private http: HttpClient) { }


  getProducts(useCache = true): Observable<Pagination<Product[]>> {
    // if (this.products.length > 0) return of(this.products);
    if (!useCache) this.productCache = new Map();
    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));
        if (this.pagination)
          return of(this.pagination);
      }
    }
    let params = new HttpParams();
    if (this.shopParams.brandId > 0) params = params.append('brandId', this.shopParams.brandId);
    if (this.shopParams.typeId) params = params.append('typeId', this.shopParams.typeId);
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber);
    params = params.append('pageSize', this.shopParams.pageSize);
    if (this.shopParams.search) params = params.append('search', this.shopParams.search);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', { params }).pipe(
      map(response => {
        // this.products = [...this.products, ...response.data];
        this.productCache.set(Object.values(this.shopParams).join('-'), response);
        this.pagination = response;
        return response;
      })
    )
  }

  // return this.http.get<IPagination>(this.API_URL + 'products', { observe: 'response', params })
  // .pipe(
  //   map(
  //     response => {
  //       return response.body;
  //     }
  //   )
  // )

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }


  getProduct(id: number) {
    // const product = this.products.find(x => x.id === id);
    // const product = [...this.productCache.values()].filter((p) => p?.data[0]?.id == id)[0].data as Product[];
    const product = [...this.productCache.values()].reduce((acc, paginatedResult) => {
      return { ...acc, ...paginatedResult.data.find(x => x.id === id) }
    }, {} as Product)

    if (Object.keys(product).length !== 0) return of(product);
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }
  loadProduct(id: number) {
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
    if (this.brands.length > 0) return of(this.brands);
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands').pipe(
      map(brands => this.brands = brands)
    );
  }
  getTypes() {
    if (this.types.length > 0) return of(this.types);
    return this.http.get<Type[]>(this.baseUrl + 'products/types').pipe(
      map(types => this.types = types)
    );
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
