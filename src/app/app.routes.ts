import { Routes } from '@angular/router';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { anonymousGuardGuard } from './core/guards/anonymous-guard.guard';
import { localOnlyGuardGuard } from './core/guards/local-only-guard.guard';
export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuardGuard],
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'settings',
    canActivate: [authGuardGuard],
    loadChildren: () =>
      import('./features/settings/settings.routes').then(
        (m) => m.settingsRoutes,
      ),
  },
  {
    path: 'sign-in',
    canActivate: [anonymousGuardGuard],
    loadComponent: () =>
      import('./features/auth/sign-in/sign-in.component').then(
        (m) => m.SignInComponent,
      ),
  },
  {
    path: 'setup-workspace',
    canActivate: [anonymousGuardGuard, localOnlyGuardGuard],
    loadComponent: () =>
      import('./features/auth/setup-workspace/setup-workspace.component').then(
        (m) => m.SetupWorkspaceComponent,
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];
