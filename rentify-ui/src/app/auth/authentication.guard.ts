import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = () => {
  const tokenService = inject(UserService);
  const router = inject(Router);
  if (tokenService.isTokenNotValid()) {
    router.navigate(['/user/login']);
    return false;
  }
  return true;
};
