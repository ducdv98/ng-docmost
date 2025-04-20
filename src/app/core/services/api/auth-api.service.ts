import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

import { LoginCredential } from '../../models/auth.model';
import { ApiResponse } from '../../models/api-response.model';
import { CurrentUser } from '../../models/user.model';
import { Observable } from 'rxjs';
import { SetupWorkspaceRequest } from '../../models/request/setup-workspace-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly apiUrl = environment.apiUrl;
  private readonly authUrl = `${this.apiUrl}/auth`;
  private readonly userUrl = `${this.apiUrl}/users`;
  private http = inject(HttpClient);

  login(credentials: LoginCredential): Observable<ApiResponse<{}>> {
    return this.http.post<ApiResponse<CurrentUser>>(
      `${this.authUrl}/login`,
      credentials,
    );
  }

  getCurrentUser(): Observable<ApiResponse<CurrentUser>> {
    return this.http.post<ApiResponse<CurrentUser>>(`${this.userUrl}/me`, {});
  }

  logout() {
    return this.http.post(`${this.authUrl}/logout`, {});
  }

  setupWorkspace(request: SetupWorkspaceRequest): Observable<ApiResponse<CurrentUser>> {
    return this.http.post<ApiResponse<CurrentUser>>(`${this.authUrl}/setup`, request);
  }
}
