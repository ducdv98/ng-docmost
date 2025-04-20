import { computed, effect, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
  withHooks,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

import { AuthApiService } from '../services/api/auth-api.service';
import { CurrentUser } from '../models/user.model';
import { LoginCredential } from '../models/auth.model';

export interface AuthState {
  currentUser: CurrentUser | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
  initialized: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ currentUser, initialized, loading, error }) => ({
    authenticated: computed(() => !!currentUser()),
    selectUsername: computed(() => currentUser()?.user?.email ?? 'Guest'),
    selectInitialized: computed(() => initialized()),
    selectLoading: computed(() => loading()),
    selectError: computed(() => error()),
  })),
  withMethods(
    (store, authApi = inject(AuthApiService), router = inject(Router)) => ({
      login(credentials: LoginCredential): void {
        if (store.loading()) return;
        patchState(store, { loading: true, error: null });
        this.loginEffect(credentials);
      },

      logout(): void {
        this.logoutEffect();
      },

      attemptInitialLogin(): void {
        if (store.initialized()) return;
        this.loadCurrentUserEffect();
      },

      loginEffect: rxMethod<LoginCredential>(
        pipe(
          switchMap((credentials) =>
            authApi.login(credentials).pipe(
              tapResponse({
                next: () => {
                  // Just handle successful login, don't try to chain here
                  // Keep loading state active
                },
                error: (err: Error) => {
                  patchState(store, {
                    error: err.message || 'Login failed',
                    loading: false,
                    currentUser: null,
                  });
                },
              }),
              // After successful login, chain to get user data
              switchMap(() =>
                authApi.getCurrentUser().pipe(
                  tapResponse({
                    next: (user) => {
                      patchState(store, {
                        currentUser: user.data,
                        loading: false,
                        error: null,
                        initialized: true,
                      });
                      router.navigate(['/']);
                    },
                    error: (err: Error) => {
                      patchState(store, {
                        error: 'Failed to load user data after login.',
                        loading: false,
                        initialized: true,
                      });
                    },
                  }),
                ),
              ),
              catchError(() => {
                patchState(store, { loading: false });
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      loadCurrentUserEffect: rxMethod<void>(
        pipe(
          switchMap(() =>
            authApi.getCurrentUser().pipe(
              tapResponse({
                next: (user) => {
                  patchState(store, {
                    currentUser: user.data,
                    loading: false,
                    error: null,
                    initialized: true,
                  });
                  router.navigate(['/']);
                },
                error: (err: Error) => {
                  patchState(store, {
                    error: store.error() || 'No active session.',
                    currentUser: null,
                    loading: false,
                    initialized: true,
                  });
                },
              }),
              catchError(() => {
                patchState(store, { loading: false, initialized: true });
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      logoutEffect: rxMethod<void>(
        pipe(
          switchMap(() =>
            authApi.logout().pipe(
              tapResponse({
                next: () => {
                  patchState(store, initialState);
                  router.navigate(['/login']);
                },
                error: (err: Error) => {
                  patchState(store, {
                    currentUser: null,
                    error: 'Logout failed. Please try again.',
                    initialized: true,
                  });
                },
              }),
              catchError(() => {
                patchState(store, {
                  currentUser: null,
                  initialized: true,
                });
                router.navigate(['/login']);
                return EMPTY;
              }),
            ),
          ),
        ),
      ),
    }),
  ),
  withHooks({
    onInit(store) {
      store.attemptInitialLogin();
    },
    onDestroy() {},
  }),
);
