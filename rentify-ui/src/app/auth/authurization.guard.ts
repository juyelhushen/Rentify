import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { Role } from '../models/model';

export const authorizationGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isLoggedIn()) {
    if (userService.isTokenValid()) {
      if (userService.userRoles === Role.LANDLORD) {
        return true;
      }
    }
  }
  return false;
};