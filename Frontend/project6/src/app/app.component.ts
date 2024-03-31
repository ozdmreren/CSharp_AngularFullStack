import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    FooterComponent,
    NavbarComponent,
  ],
  template: `
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
      rel="stylesheet"
    />
    <div class="flex flex-col">
      <app-navbar />
      <main
        style="font-family: 'Poppins',sans,serif;"
        class="min-h-screen flex-grow
        px-10
        "
      >
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class AppComponent {
  title = 'project6';
  products: string = 'products';
}
