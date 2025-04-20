import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withHooks,
  withComputed,
  getState,
} from '@ngrx/signals';
import { Workspace } from '../models/workspace.model';
import { pipe, switchMap, tap } from 'rxjs';
import { WorkspaceApiService } from '../services/api/workspace-api.service';
import { computed, effect, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { SetupWorkspaceRequest } from '../models/request/setup-workspace-request.model';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/api/auth-api.service';
import { AuthStore } from './auth.store';
export interface WorkspaceState {
  workspace: Workspace | null;
  loading: boolean;
  error: string | null;
}

export const WorkspaceStore = signalStore(
  { providedIn: 'root' },
  withState<WorkspaceState>({
    workspace: null,
    loading: false,
    error: null,
  }),
  withComputed(({ workspace }) => ({
    workspaceAvailable: computed(() => workspace() !== null),
  })),
  withMethods(
    (
      store,
      workspaceApi = inject(WorkspaceApiService),
      router = inject(Router),
      authApi = inject(AuthApiService),
      authStore = inject(AuthStore),
    ) => ({
      loadPublicWorkspaceData(): void {
        this._loadPublicDataEffect();
      },

      setupWorkspace(request: SetupWorkspaceRequest): void {
        this._setupWorkspaceEffect(request);
      },

      _loadPublicDataEffect: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() =>
            workspaceApi.getWorkspacePublicData().pipe(
              tapResponse({
                next: ({ data }) => patchState(store, { workspace: data }),
                error: (error: any) =>
                  patchState(store, { error: error.message }),
                finalize: () => patchState(store, { loading: false }),
              }),
            ),
          ),
        ),
      ),
      _setupWorkspaceEffect: rxMethod<SetupWorkspaceRequest>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((request) =>
            authApi.setupWorkspace(request).pipe(
              tapResponse({
                next: ({ data }) => {
                  patchState(store, { workspace: data.workspace });
                  authStore.loadCurrentUserEffect();
                },
                error: (error: any) =>
                  patchState(store, { error: error.message }),
                finalize: () => patchState(store, { loading: false }),
              }),
            ),
          ),
        ),
      ),
    }),
  ),
  withHooks({
    onInit(store) {
      store.loadPublicWorkspaceData();
    },
    onDestroy() {},
  }),
);
