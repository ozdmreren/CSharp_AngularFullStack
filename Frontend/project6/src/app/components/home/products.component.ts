import { Component } from '@angular/core';
import { products } from '../../../utils/Products';
import { ProductCartComponent } from './product-cart/product-cart.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCartComponent],
  template: `
    <div class="px-4">
      <div
        class="
        grid
        grid-cols-4
      md:gap-10
      xl:gap-20
      gap:4
      md:px-6
      xl:px-10
      px-2
      "
      >
        @for (product of products; track $index) {
        <app-product-cart [product]="product" />
        }
      </div>
    </div>
  `,
})
export class ProductsComponent {
  products = products;
  asdsad = 'wqdasda';
}
// ! Product Cart'ı yapıyordum
