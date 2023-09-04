import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../appServices/account.service';


export const AdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

 const accountService = inject(AccountService);
 const router = inject(Router);

 return accountService.isAdmin$.pipe(
  map(admin => {
   if (admin) return true;
   else {
    router.navigateByUrl('/')
    return false;
   }
  })
 );
}

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AdminGuard(route, state);