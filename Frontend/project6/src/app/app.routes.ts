import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {
  canActivatedGuard,
  canActivedChildGuard,
  canDeactiveGuard,
} from './guards/guard';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { CreateComponent } from './components/admin/create.component';
import { ManageComponent } from './components/admin/manage.component';
import { RegisterComponent } from './components/auth/register.component';
import { LoginComponent } from './components/auth/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'create', component: CreateComponent },
      { path: 'manage', component: ManageComponent },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
