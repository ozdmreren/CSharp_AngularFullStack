import { Component } from '@angular/core';
import { FooterListComponent } from './footer-list.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FooterListComponent],
  template: `
    <div class="bg-slate-700">
      <div class="py-10 mt-6">
        <div class="px-20">
          <div class="flex flex-wrap justify-evenly">
            <app-footer-list [items]="footer_list_items" />
            <app-footer-list [items]="footer_list_items" />
            <app-footer-list [items]="footer_list_items" />
            <app-footer-list [items]="footer_list_items" />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FooterComponent {
  footer_list_items = [
    {
      head: 'First Title',
      texts: [
        {
          text: 'Today asdsad',
        },
        {
          text: 'asdaksjdlk',
        },
        {
          text: 'lajskdljsald',
        },
        {
          text: 'aslkdhsakjhda',
        },
      ],
    },
  ];
}
