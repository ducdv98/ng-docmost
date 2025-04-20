import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from '../state/auth.store';
import { WorkspaceStore } from '../state/worskspace.store';

export const anonymousGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const authStore = inject(AuthStore);
  const workspaceStore = inject(WorkspaceStore);
  

  if (!workspaceStore.workspaceAvailable() && !authStore.authenticated()) {
    router.navigate(['setup-workspace']);
    return false;
  }
  if (authStore.authenticated()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
