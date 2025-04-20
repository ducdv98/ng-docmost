import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthStore } from 'src/app/core/state/auth.store';
import { LoginCredential } from 'src/app/core/models/auth.model';
import { FormControlErrorDirective } from 'src/app/shared/directives';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormControlErrorDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  readonly authStore = inject(AuthStore);

  loginForm = this.fb.group({
    email: ['test@example.com', [Validators.required, Validators.email]],
    password: ['12345678', [Validators.required]],
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.getRawValue() as LoginCredential;
      this.authStore.login(credentials);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
