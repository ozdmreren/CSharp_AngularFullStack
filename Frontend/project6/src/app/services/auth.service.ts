import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginType, SigninType, TokenType } from '../../../types/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpService: HttpClient) {}

  public handleRegister(user: SigninType): Observable<any> {
    return this.httpService.post(
      'https://localhost:7148/api/User/register',
      user
    );
  }

  public handleLogin(user: LoginType): Observable<any> {
    return this.httpService.post('https://localhost:7148/api/User/login', user);
  }

  public handleSendToken(token: TokenType): Observable<any> {
    return this.httpService.post(
      'https://localhost:7148/api/User/token',
      token
    );
  }
}
