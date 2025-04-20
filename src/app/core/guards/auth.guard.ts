import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from '../state/auth.store';
import { WorkspaceStore } from '../state/worskspace.store';
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const router = inject(Router);
  const authStore = inject(AuthStore);
  const workspaceStore = inject(WorkspaceStore);
  
  if (authStore.authenticated()) {
    return true;
  } else if (!workspaceStore.workspaceAvailable()) {
    router.navigate(['setup-workspace'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
