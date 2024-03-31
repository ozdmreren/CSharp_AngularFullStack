import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenType } from '../../types/User';
import { AuthService } from '../app/services/auth.service';

export async function getCurrentUser() {
  const session = JSON.parse(sessionStorage.getItem('token'));
  const token: TokenType = {
    tokenName: session,
  };
}
