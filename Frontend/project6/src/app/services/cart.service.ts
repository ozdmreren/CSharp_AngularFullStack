import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private toastr: ToastrService) {
    this.Defaults();
    console.log(this.product_list);
  }

  private product_list: any[] | null = [];
  private product_list_qty: number = 0;

  private Defaults() {
    const eShopStrings = localStorage.getItem('EShopCart');
    const eShopItems = JSON.parse(eShopStrings);
    this.product_list = eShopItems;
  }

  public handleQuantityIncrease(product: any): any {
    if (product.quantity == 99)
      return this.toastr.error('You can not add more', 'EShopCart');
    if (product.quantity <= 99) {
      product.quantity = product.quantity + 1;
    }
  }

  public handleQuantityDecrease(product: any): any {
    if (product.quantity < 0) {
      throw new Error('Product count never asign negative number');
    }
    if (product.quantity == 1) {
      return this.toastr.error('Can not less than 1 ', 'EShopCart');
    }
    if (product.quantity > 1) {
      product.quantity = product.quantity - 1;
    }
  }

  public handleAddToBasket(product: any) {
    let updatedCart: any;
    if (this.product_list) {
      updatedCart = [...this.product_list, product];
      localStorage.setItem('EShopCart', JSON.stringify(updatedCart));
    } else {
      updatedCart = [product];
      localStorage.setItem('EShopCart', JSON.stringify(updatedCart));
    }
    location.reload();
    this.toastr.success('Ürün sepete eklendi');
  }

  public handleIncreaseBasketQty(product: any) {
    if (this.product_list) {
      const existingItem = this.product_list.findIndex(
        (proc) => proc.id == product.id
      );
      let updatedCart = [...this.product_list];
      updatedCart[existingItem].quantity =
        updatedCart[existingItem].quantity + 1;
      localStorage.setItem('EShopCart', JSON.stringify(updatedCart));
    }
  }
  public handleDecreaseBasketQty(product: any) {
    if (this.product_list) {
      const existingItem = this.product_list.findIndex(
        (proc) => proc.id == product.id
      );
      let updatedCart = [...this.product_list];
      updatedCart[existingItem].quantity =
        updatedCart[existingItem].quantity - 1;
      localStorage.setItem('EShopCart', JSON.stringify(updatedCart));
    }
  }
  public handleDeleteProduct(product: any) {
    const filteredProducts = [...this.product_list].filter(
      (proc) => proc.id != product.id
    );
    localStorage.setItem('EShopCart', JSON.stringify(filteredProducts));
  }

  public handleDeleteCart() {
    this.product_list = [];
    localStorage.setItem('EShopCart', JSON.stringify([]));
  }

  public cartProducts() {
    return this.product_list;
  }
  public cartQuantity() {
    this.product_list_qty = this.product_list.length;
    return this.product_list_qty;
  }
}
