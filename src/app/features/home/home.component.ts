import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthStore } from 'src/app/core/state/auth.store';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly authStore = inject(AuthStore);

  // No need for ngOnInit typically, signals handle updates.

  logout(): void {
    this.authStore.logout();
  }
}
