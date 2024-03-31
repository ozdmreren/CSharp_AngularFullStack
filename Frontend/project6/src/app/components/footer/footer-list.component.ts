import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer-list',
  standalone: true,
  imports: [],
  template: `
    <div class="flex-1 w-full">
      <div class="my-2 p-3 ">
        <div>
          @for (item of items; track $index) {
          <div
            class="font-bold text-xl flex items-center justify-center text-slate-300 mb-5 pb-3 border-b"
          >
            {{ item.head }}
          </div>
          <div>
            @for (text of item.texts; track $index) {
            <li class="text-slate-400 text-sm">{{ text.text }}adksjadlks</li>
            }
          </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class FooterListComponent {
  @Input() items: any[];
}
