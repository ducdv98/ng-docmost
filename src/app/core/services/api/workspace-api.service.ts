import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Workspace } from '../../models/workspace.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { SetupWorkspaceRequest } from '../../models/request/setup-workspace-request.model';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceApiService {
  private readonly apiUrl = environment.apiUrl;
  private readonly workspaceUrl = `${this.apiUrl}/workspace`;
  private http = inject(HttpClient);

  getWorkspacePublicData(): Observable<ApiResponse<Workspace>> {
    return this.http.post<ApiResponse<Workspace>>(
      `${this.workspaceUrl}/public`,
      {},
    );
  }

  createWorkspace(
    request: SetupWorkspaceRequest,
  ): Observable<ApiResponse<Workspace>> {
    return this.http.post<ApiResponse<Workspace>>(
      `${this.workspaceUrl}/create`,
      request,
    );
  }
}
