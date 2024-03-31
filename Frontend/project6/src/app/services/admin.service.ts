import { Injectable } from '@angular/core';
import { IProduct } from '../../../types/IProduct';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpService: HttpClient) {}
  public handleCreateProduct(product: any): Observable<any> {
    return this.httpService.post<any>(
      'https://localhost:7096/admin/product/post',
      product
    );
  }
  public handleGetProducts() {
    return this.httpService.get('https://localhost:7096/admin/product/get');
  }
  public handleDeleteProduct(productId: any): Observable<any> {
    return this.httpService.delete(
      `https://localhost:7096/admin/product/delete/${productId}`
    );
  }
  public handleUpdateProduct(product: any) {
    return this.httpService.put(
      'https://localhost:7096/admin/product/put',
      product
    );
  }
}
