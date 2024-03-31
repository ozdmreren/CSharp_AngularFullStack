import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../app/services/auth.service';
import { TokenType } from '../../types/User';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
@Component({
  standalone: true,
  imports: [],
  template: ``,
})
export class getCurrentUser {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}
  private token: TokenType;
  private currentUser: {
    username: string;
    email: string;
    password: string;
  };
  public handleToken() {
    if (this.cookieService.check('token')) {
      const cookie = JSON.parse(this.cookieService.get('token'));
      this.token = {
        tokenName: cookie,
      };
    } else {
      this.token = null;
    }
  }
  public handleSendToken() {
    if (this.token == null) {
      return;
    }
    this.authService.handleSendToken(this.token).subscribe({
      next: (observer) => {
        this.currentUser = {
          username: observer.username,
          email: observer.email,
          password: observer.password,
        };
        console.log(observer, 'ama sır vermez');
      },
      error: (err) => console.log(err),
      complete: () => console.log('completed'),
    });
  }
  public get current_user() {
    return this.currentUser;
  }
}
