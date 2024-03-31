import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormatPricePipe } from '../../pipes/format-price.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, FormatPricePipe, NgClass],
  template: `
    <div class="py-10">
      <div class="px-20">
        <div
          class="flex items-center justify-center mb-10 pb-5 text-2xl font-bold text-slate-400"
        >
          ÜRÜNLER
        </div>
        <div class="grid grid-cols-5 text-center text-slate-700 gap-3">
          <div class="border-b-[1.2px] ">Ürün Resmi</div>
          <div class="border-b-[1.2px] ">Ürün Adı</div>
          <div class="border-b-[1.2px] ">Ürün Fiyatı</div>
          <div class="border-b-[1.2px] ">Ürün Miktarı</div>
          <div></div>
        </div>
        <div class="mt-5">
          @for (product of cartService.cartProducts(); track $index) {
          <div class="grid grid-cols-5 text-center text-slate-700 mt-5">
            <div class="relative aspect-auto flex items-center justify-center">
              <!-- {{ product.images[0].image }} -->
              <img
                [ngSrc]="product.images[0].image"
                alt=""
                width="40"
                height="40"
              />
            </div>
            <div class="text-justify flex items-center justify-center">
              {{ truncateText(product.name) }}
            </div>
            <div class="text-amber-500 flex items-center justify-center">
              {{ product.price }}
              ₺
            </div>
            <div class="flex items-center justify-center">
              <div class="flex items-center gap-2">
                <div
                  [ngClass]="buttonStyle"
                  (click)="handleDecreaseBasketQty(product)"
                >
                  -
                </div>
                <div>{{ product.quantity }}</div>
                <div
                  [ngClass]="buttonStyle"
                  (click)="handleIncreaseBasketQty(product)"
                >
                  +
                </div>
              </div>
            </div>
            <button
              (click)="handleDeleteProduct(product)"
              class="max-w-[70%] w-full px-3 py-2 text-white bg-gray-600 rounded-sm cursor-pointer shadow-lg transition border hover:border-rose-500"
            >
              Sil
            </button>
          </div>
          <hr class="my-3" />
          }
        </div>
        <div class="flex items-center justify-between px-10 py-6 mt-5">
          <div
            class="text-center text-base text-slate-500
            cursor-pointer
            rounded-md
            px-4 py-2
            transition-all
            duration-500
          hover:scale-100
          hover:bg-slate-200
          "
          >
            <span (click)="handleDeleteCart()">Ürünleri sil</span>
          </div>
          <div>
            <div class="flex items-center gap-2 text-slate-500 text-base">
              Toplam Tutar:
              <div class=" text-base text-teal-500">
                {{ totalPrice | formatPrice }} ₺
              </div>
            </div>
            <div class="absolute mt-3 px-2">
              <a
                class="text-slate-600
                p-2
                rounded-md
                transition-all
                duration-700
                hover:bg-slate-200
                hover:underline
              hover:underline-offset-4
              "
                routerLink=""
                ><- Alışverişe devam</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  buttonStyle =
    'w-6 h-6 rounded-md border flex items-center justify-center cursor-pointer select-none';
  constructor(public cartService: CartService, private toastr: ToastrService) {}
  handleDeleteProduct(product: any) {
    this.cartService.handleDeleteProduct(product);
    location.reload();
  }
  handleDeleteCart() {
    this.cartService.handleDeleteCart();
    location.reload();
  }
  handleTotalPrice() {
    this.totalPrice = this.cartService
      .cartProducts()
      .reduce((acc, item) => acc + item.quantity * item.price, 0);
  }
  handleIncreaseBasketQty(product: any) {
    if (product.quantity < 99) {
      this.cartService.handleIncreaseBasketQty(product);
    } else {
      this.toastr.error('Şirketin mi var olm 99 tane yeter');
      return;
    }
  }
  handleDecreaseBasketQty(product: any) {
    if (product.quantity > 1) {
      this.cartService.handleDecreaseBasketQty(product);
    } else {
      this.toastr.error('Ürün miktarı nasıl eksiye düşsün bir söyle ?');
      return;
    }
  }
  ngOnInit(): void {
    this.handleTotalPrice();
  }
  truncateText(text: string) {
    if (text.length < 20) {
      return text;
    } else {
      return text.substring(0, 20) + '...';
    }
  }
}
