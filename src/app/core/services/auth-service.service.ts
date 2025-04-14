import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private isAuthenticated = signal(false);
}
