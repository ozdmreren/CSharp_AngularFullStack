import { NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div
      (click)="onClick()"
      class="col-span-1 flex-1 px-5 py-3  rounded-md shadow-xl cursor-pointer transition hover:scale-105"
    >
      <div class="flex flex-col">
        <div
          class="aspect-square flex items-center justify-center relative z-30 mb-4"
        >
          <img
            [ngSrc]="product.images[0].image"
            alt=""
            priority
            width="200"
            height="1"
          />
        </div>
        <div class="text-center space-y-3">
          <div class="text-sm text-slate-600">
            {{ truncateText(product.name) }}
          </div>
          <div>{{ product.brand }}</div>
          <div class="font-semibold text-lg">{{ product.price }} ₺</div>
        </div>
      </div>
    </div>
  `,
})
export class ProductCartComponent implements OnInit {
  constructor(private activatedRoute: Router) {}
  @Input() product: any;
  ngOnInit(): void {
    console.log(this.product.images[0].image);
  }
  truncateText(text: string) {
    if (text.length < 20) {
      return text;
    } else {
      return text.substring(0, 20) + '...';
    }
  }
  onClick() {
    // this.activatedRoute.navigate([`products/${this.product.id}`, 'sa'])
    this.activatedRoute.navigate([`products/${this.product.id}`]);
  }
}
