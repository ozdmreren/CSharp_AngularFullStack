import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { getCurrentUser } from '../../../actions/getCurrentUser.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  template: `
    <div class="cursor-pointer relative" (click)="setOpenMenu()">
      @if (getCurrentUser.current_user) {
      <div
        class="
        text-sm 
       text-slate-500 px-3 py-1 
        text-center
        rounded-md
        hover:text-slate-800
        hover:bg-gray-500
        duration-300
        select-none
        "
      >
        {{ getCurrentUser.current_user.username }}
      </div>
      }@else {
      <div>
        <span class="select-none material-symbols-outlined">
          account_circle
        </span>
      </div>
      } @if (openMenu) { @if (getCurrentUser.current_user) {
      <div
        class="absolute
       bg-slate-100 
       -translate-x-5
       space-y-4 -left-5
       top-11
       rounded-md
       text-slate-500
       px-10 py-2
       text-center
       font-light
       shadow-sm
       shadow-emerald-200
       "
      >
        <div>
          <div
            class="select-none hover:underline"
            (click)="handleAvatarMenu('admin')"
          >
            Admin
          </div>
          <div
            class="select-none hover:underline"
            (click)="handleAvatarMenu('logout')"
          >
            Logout
          </div>
        </div>
      </div>
      }@else {
      <div
        class="absolute
       bg-slate-100 
       -translate-x-5
       space-y-4 -left-10 
       top-11
       rounded-md
       text-slate-500
       px-10 py-2
       text-center
       font-light
       shadow-sm
       shadow-emerald-200"
      >
        <div>
          <div
            (click)="handleAvatarMenu('register')"
            class="select-none hover:underline"
          >
            Register
          </div>
          <div
            (click)="handleAvatarMenu('login')"
            class="select-none hover:underline"
          >
            Login
          </div>
        </div>
      </div>
      } }
    </div>
  `,
})
export class AvatarComponent implements OnInit {
  constructor(
    public getCurrentUser: getCurrentUser,
    private router: Router,
    private cookie: CookieService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCurrentUser.handleToken();
    this.getCurrentUser.handleSendToken();
  }
  currentUser() {
    console.log(this.getCurrentUser.current_user);
  }
  setOpenMenu() {
    this.openMenu = !this.openMenu;
  }
  public handleAvatarMenu(menuName: string) {
    switch (menuName) {
      case 'register':
        {
          this.router.navigate(['register']);
        }
        break;
      case 'login':
        {
          this.router.navigate(['login']);
        }
        break;
      case 'admin':
        {
          this.router.navigate(['admin']);
        }
        break;
      case 'logout':
        {
          this.cookie.delete('token');
          location.reload();
          this.router.navigate(['login']);
        }
        break;
      default:
        console.log('Ne oluyo ? ');
    }
  }
  private showMessage(message: string) {
    this.toastr.show(message);
  }

  openMenu: boolean = false;
}
