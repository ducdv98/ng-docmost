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
import { pipe, switchMap, catchError, EMPTY, tap } from 'rxjs';
import { Router } from '@angular/router';

import { AuthApiService } from '../services/api/auth-api.service';
import { CurrentUser } from '../models/user.model';
import { LoginCredential } from '../models/auth.model';
import {
  withRequestStatus,
  setPending,
  setFulfilled,
  setError,
} from '@shared/state/request-status.feature';
export interface AuthState {
  currentUser: CurrentUser | null;
  initialized: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  initialized: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withRequestStatus(),
  withComputed(({ currentUser, initialized }) => ({
    authenticated: computed(() => !!currentUser()),
    selectUsername: computed(() => currentUser()?.user?.email ?? 'Guest'),
    selectInitialized: computed(() => initialized()),
  })),
  withMethods(
    (store, authApi = inject(AuthApiService), router = inject(Router)) => ({
      login(credentials: LoginCredential): void {
        if (store.isPending()) return;
        patchState(store, setPending());
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
          tap(() => patchState(store, setPending())),
          switchMap((credentials) =>
            authApi.login(credentials).pipe(
              tapResponse({
                next: () => {
                  // Just handle successful login, don't try to chain here
                  // Keep loading state active
                },
                error: (err: Error) => {
                  patchState(store, setError(err.message || 'Login failed'));
                },
              }),
              // After successful login, chain to get user data
              switchMap(() =>
                authApi.getCurrentUser().pipe(
                  tapResponse({
                    next: (user) => {
                      patchState(
                        store,
                        {
                          currentUser: user.data,
                          initialized: true,
                        },
                        setFulfilled(),
                      );
                      router.navigate(['/']);
                    },
                    error: (err: Error) => {
                      patchState(
                        store,
                        {
                          initialized: true,
                        },
                        setError(err.message),
                      );
                    },
                  }),
                ),
              ),
              catchError(() => {
                patchState(store, setFulfilled());
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      loadCurrentUserEffect: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap(() =>
            authApi.getCurrentUser().pipe(
              tapResponse({
                next: (user) => {
                  patchState(
                    store,
                    {
                      currentUser: user.data,
                      initialized: true,
                    },
                    setFulfilled(),
                  );
                  router.navigate(['/']);
                },
                error: (err: Error) => {
                  patchState(
                    store,
                    {
                      currentUser: null,
                      initialized: true,
                    },
                    setError(err.message),
                  );
                },
              }),
              catchError(() => {
                patchState(store, { initialized: true });
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      logoutEffect: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap(() =>
            authApi.logout().pipe(
              tapResponse({
                next: () => {
                  patchState(store, initialState, setFulfilled());
                  router.navigate(['/login']);
                },
                error: (err: Error) => {
                  patchState(
                    store,
                    {
                      currentUser: null,
                      initialized: true,
                    },
                    setError(err.message),
                  );
                },
              }),
              catchError(() => {
                patchState(
                  store,
                  {
                    currentUser: null,
                    initialized: true,
                  },
                  setError('Logout failed. Please try again.'),
                );
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
