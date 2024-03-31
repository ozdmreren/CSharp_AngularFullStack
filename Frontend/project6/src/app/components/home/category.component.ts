import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      class="
      flex
      items-center
      justify-center
    bg-slate
    w-full
    my-4
    py-5
    border-b-[1px]
    border-b-green-100
    shadow-sm
    "
    >
      <div
        class="flex flex-wrap 
        md:gap-2 xl:gap-16 gap-4
        md:px-6 xl:px-12 px-3"
      >
        @for (categ of categories; track $index) {
        <div
          class="
         flex
         flex-1
         overflow-x-hidden
         items-center
         justify-center
         gap-2 
         p-3 mx-2
         border 
         rounded-sm
         border-slate-300
         cursor-pointer
         max-w-[135px]
         w-full
         duration-300
         hover:scale-110
         hover:rounded-md
         hover:font-bold
         "
        >
          <span [ngClass]="categ.iconClass">{{ categ.iconName }}</span>
          <div>{{ categ.category }}</div>
        </div>
        }
      </div>
    </div>
  `,
})
export class CategoryComponent {
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
