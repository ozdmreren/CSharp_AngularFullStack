import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div
      class="
    flex
    items-center
    justify-center
    px-10
    py-12
    my-6
    bg-slate-100
    border-[1.2px]
    rounded-sm
    "
    >
      <div class="relative w-full shadow-lg bg-black aspect-auto">
        <div class=" w-full h-[150px]  relative">
          <img [ngSrc]="banner_url" priority="" fill />
        </div>
      </div>
    </div>
  `,
})
export class BannerComponent {
  banner_url = '../../../assets/images/hepsi.jpeg';
}
