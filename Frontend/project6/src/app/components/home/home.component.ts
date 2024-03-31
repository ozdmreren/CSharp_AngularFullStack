import { Component } from '@angular/core';
import { CategoryComponent } from './category.component';
import { BannerComponent } from './banner.component';
import { ProductsComponent } from './products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoryComponent, BannerComponent, ProductsComponent],
  template: `
    <div>
      <app-category />
      <app-banner />
      <app-products />
    </div>
  `,
})
export class HomeComponent {}
