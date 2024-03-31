import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginType, TokenType } from '../../../../types/User';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { getCurrentUser } from '../../../actions/getCurrentUser.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="py-10 mt-6">
      <div class="px-10">
        <div class="flex items-center justify-center">
          <div>
            @if (getCurrentUserComponent.current_user) {
            <div class="">
              <div class="flex gap-3 text-lg">
                KULLANICI ADI:
                {{ getCurrentUserComponent.current_user.username }}:
                <div class="text-green-500">ONLINE</div>
              </div>
              <div class="gap-3 text-lg">
                EMAIL: {{ getCurrentUserComponent.current_user.email }}
              </div>
              {{ timeOut() }}
            </div>
            }@else{
            <form [formGroup]="frm" class="relative space-y-5 min-w-[500px]">
              <div class="pt-5 px-3 text-center text-xl text-slate-500">
                LOGIN
              </div>
              <div class="relative">
                <input
                  class="
                  peer
                  w-full
                  p-4
                  pt-6
                  border-2
                  rounded-md
                  outline-none
                  {{
                    !email.value && (email.touched || email.dirty)
                      ? 'border border-rose-500'
                      : ''
                  }}
                  "
                  type="email"
                  id="email"
                  placeholder=""
                  formControlName="email"
                  required
                />
                <label
                  class="absolute
                  top-5
                  left-4
                  duration-150
                  transform
                  peer-placeholder-shown:scale-100
                  peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75
                  peer-focus:-translate-y-5
                  peer-valid:-translate-y-5
                "
                  for="email"
                  >Email</label
                >
                <span class="absolute top-5 right-2 material-symbols-outlined">
                  mail
                </span>
              </div>

              <div class="relative">
                <input
                  autocomplete="off"
                  class="
                  peer
                  w-full
                  p-4
                  pt-6
                  border-2
                  rounded-md
                  outline-none
                  {{
                    !password.value && (password.touched || password.dirty)
                      ? 'border border-rose-500'
                      : ''
                  }}
                  "
                  type="password"
                  id="password"
                  placeholder=""
                  formControlName="password"
                  required
                />
                <label
                  class="absolute
                  top-5
                  left-4
                  duration-150
                  transform
                  peer-placeholder-shown:scale-100
                  peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75
                  peer-focus:-translate-y-5
                  peer-valid:-translate-y-5
                "
                  for="password"
                  >Password</label
                >
                <span class="absolute top-5 right-2 material-symbols-outlined">
                  lock
                </span>
              </div>
              <div class="flex items-center justify-center">
                <button
                  class="bg-slate-200 text-slate-800
                   w-full px-3 py-4 
                   rounded-md shadow-md
                   duration-200
                   transition-colors
                   hover:bg-slate-300
                   hover:text-black
                   "
                  (click)="onSubmit()"
                >
                  Login
                </button>
              </div>
            </form>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  frm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService,
    public getCurrentUserComponent: getCurrentUser
  ) {
    this.frm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log(this.frm.valid);
    if (this.frm.valid) {
      const user: LoginType = {
        email: this.email.value,
        password: this.password.value,
      };
      try {
        // token yerine signals kullanılabilir
        this.toastr.success('Giriş yapıldı');
        this.router.navigate(['/cart']);
        this.authService.handleLogin(user).subscribe({
          next: (observer) => console.log(observer),
          error: (err) => {
            this.cookieService.set('token', JSON.stringify(err.error.text));
            console.log(err);
          },
          complete: () => console.log('completed'),
        });
      } catch (err) {
        throw new Error(err);
      }
    } else {
      console.log('BAŞARISIZ');
    }
  }
  get email() {
    return this.frm.get('email');
  }
  get password() {
    return this.frm.get('password');
  }
  public timeOut() {
    setTimeout(() => {
      this.router.navigate(['']);
    }, 2500);
  }
}
