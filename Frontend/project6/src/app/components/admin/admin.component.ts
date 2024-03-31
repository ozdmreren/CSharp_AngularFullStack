import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  template: `
    <div class="relative -translate-x-10 -left-10 py-10">
      <div class="px-10 flex">
        <div class="w-1/5 text-lg flex flex-col min-h-screen bg-slate-200">
          @for (item of adminPanel; track $index) {
          <a
            class="px-3 py-4 text-center border-b-[1.2px] border-slate-800 "
            [routerLink]="item.url"
            ><div>{{ item.link }}</div></a
          >
          }
        </div>
        <div class="w-full">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
})
export class AdminComponent {
  inputStyle = 'w-full py-4 outline-none px-3 text-base text-slate-500';
  checkboxStyle = 'py-4 outline-none px-3 text-base text-slate-500';
  adminPanel = [
    {
      url: '',
      link: 'Özet',
    },
    {
      url: 'create',
      link: 'Ürün Oluştur',
    },
    {
      url: 'manage',
      link: 'Yönet',
    },
  ];
  categories = [
    {
      category: 'Computer',
      iconClass: 'material-symbols-outlined',
      iconName: 'computer',
    },
    {
      category: 'Keyboard',
      iconClass: 'material-symbols-outlined',
      iconName: 'keyboard',
    },
    {
      category: 'Mouse',
      iconClass: 'material-symbols-outlined',
      iconName: 'mouse',
    },
    {
      category: 'Phone',
      iconClass: 'material-symbols-outlined',
      iconName: 'smartphone',
    },
    {
      category: 'Watch',
      iconClass: 'material-symbols-outlined',
      iconName: 'watch',
    },
    {
      category: 'Headphone',
      iconClass: 'material-symbols-outlined',
      iconName: 'headphones',
    },
    {
      category: 'Smart Toy',
      iconClass: 'material-symbols-outlined',
      iconName: 'smart_toy',
    },
    {
      category: 'Game Pad',
      iconClass: 'material-symbols-outlined',
      iconName: 'gamepad',
    },
  ];
}
