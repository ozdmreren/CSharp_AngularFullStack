import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AvatarComponent } from './avatar.component';
import { getCurrentUser } from '../../../actions/getCurrentUser.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, AvatarComponent],
  template: `
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
    />
    <div
      class="
    sticky
    top-0
    z-30
    bg-slate-200
    w-full
    shadow-sm
    "
    >
      <div class="py-4 border-b-[1px]">
        <div
          class="
        max-w-[1920px]
        xl:px-20
        md:px-4
        px-4
        "
        >
          <div class="flex items-center justify-between gap-3 md:gap-0">
            <div
              [style]="logoStyle"
              (click)="GoHomePage()"
              class="cursor-pointer transition-shadow rounded-md text-2xl hover:shadow-lg px-5 py-2"
            >
              Logo
            </div>
            <div class="w-full px-4 py-2 relative">
              <input
                type="text"
                class="px-4 py-2 rounded-md
                 w-full outline-none
                 text-slate-700
                 "
                placeholder="Arama Çubuğu"
              />
              <div
                class="absolute
                flex
                items-center
                p-1
                top-2.5 right-5
                cursor-pointer
                duration-300
                hover:bg-slate-400
                hover:text-slate-100
                rounded-md
              "
              >
                <span class="material-symbols-outlined"> search </span>
              </div>
            </div>
            <div class="flex items-center gap-5">
              <div class="relative flex">
                <span
                  routerLink="cart"
                  class="material-symbols-outlined cursor-pointer"
                >
                  shopping_cart
                </span>
                <div class="absolute -right-1 -top-3">{{ cartQty }}</div>
              </div>
              <app-avatar />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NavbarComponent implements OnInit {
  logoStyle =
    "font-family:'Redressed',cursive; font-weight:400; font-style:normal";
  cartQty: number = 0;
  public constructor(
    private router: Router,
    private cartService: CartService,
    private getCurrentUser: getCurrentUser
  ) {}
  ngOnInit(): void {
    this.cartQuantity();
  }
  public GoHomePage() {
    this.router.navigate(['']);
  }
  public cartQuantity() {
    this.cartQty = this.cartService.cartQuantity();
  }
}
