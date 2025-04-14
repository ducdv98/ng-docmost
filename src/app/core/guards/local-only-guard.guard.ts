import { CanActivateFn } from '@angular/router';

export const localOnlyGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
