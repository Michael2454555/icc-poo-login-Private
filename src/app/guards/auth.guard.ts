import { ActivatedRouteSnapshot, CanActivateFn, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthP66Service } from '../services/auth-p66.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
                                          route:ActivatedRouteSnapshot,  
                                          state:RouterStateSnapshot):boolean | UrlTree => {
  const auth=inject(AuthP66Service);
  const router=inject(Router);
  if(auth.estaAutenticado()){
    return true;
  }else{
    router.navigateByUrl(`/login`);
    return false;
  }
  
};
