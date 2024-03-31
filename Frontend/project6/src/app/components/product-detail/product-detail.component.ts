import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { products } from '../../../utils/Products';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgOptimizedImage, NgClass, RouterLink],
  template: ` <div class="py-10 my-5">
    <div class="px-5 mx-auto">
      <div class="flex justify-center gap-10">
        <div class=" w-[300px] relative aspect-square">
          <img
            [ngSrc]="product.images[0].image"
            fill
            alt=""
            priority
            class="object-contain"
          />
        </div>
        <div class="w-1/3">
          <div>
            <div class="text-2xl font-semibold shadow-sm text-center pb-5">
              {{ product.name }}
            </div>
            <div class="text-justify mt-3 text-slate-600">
              {{ product.description }}
            </div>
            <div class="my-5">
              <div class="flex">
                <div class="flex flex-col text-sm gap-3">
                  @if (product.inStock) {
                  <div class="text-green-500">
                    In stock
                    <hr class="mt-2" />
                  </div>
                  }@else {
                  <div class="text-rose-500">Soldout</div>
                  }
                  <div class="text-slate-500">
                    CATEGORY : {{ product.category }}
                  </div>
                  <div class="text-slate-500">BRAND : {{ product.brand }}</div>
                  <div class="font-bold text-amber-500">
                    PRICE : {{ product.price }} ₺
                    <hr class="mt-2" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-5">
              <div [ngClass]="buttonStyle" (click)="handleQuantityDecrease()">
                -
              </div>
              <div>{{ product.quantity }}</div>
              <div [ngClass]="buttonStyle" (click)="handleQuantityIncrease()">
                +
              </div>
            </div>
            <div class="mt-4">
              @if (!inCart) {
              <button
                class="text-white bg-slate-700 text-sm px-4 py-3 rounded-sm transition-colors hover:bg-slate-600 shadow-md"
                (click)="handleAddToBasket()"
              >
                Ürünü Sepete Ekle
              </button>
              }@else{
              <div>
                <div class="text-teal-500 text-sm my-2">Ürün zaten sepette</div>
                <div
                  class="text-slate-500 cursor-pointer text-sm hover:underline underline-offset-2 "
                >
                  <a routerLink=""><- Alışverişe geri dön</a>
                </div>
              </div>

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class ProductDetailComponent implements OnInit {
  product;
  inCart = false;
  buttonStyle =
    'w-6 h-6 rounded-md border flex items-center justify-center cursor-pointer select-none';
  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((observer) => {
      this.product = products.find((proc) => proc.id == observer.get('id'));
    });
    this.product.quantity = 1;
    console.log(this.product);
    this.setInCart();
  }
  handleQuantityIncrease() {
    this.cartService.handleQuantityIncrease(this.product);
  }
  handleQuantityDecrease() {
    this.cartService.handleQuantityDecrease(this.product);
  }
  handleAddToBasket() {
    this.cartService.handleAddToBasket(this.product);
    this.setInCart();
  }
  setInCart() {
    if (this.cartService.cartProducts()) {
      const exstingItem = this.cartService
        .cartProducts()
        .findIndex((proc) => proc.id == this.product.id);
      if (exstingItem > -1) {
        this.inCart = true;
      } else {
        this.inCart = false;
      }
    }
  }
}
