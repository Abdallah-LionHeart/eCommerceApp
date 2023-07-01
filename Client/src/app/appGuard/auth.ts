import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, map } from "rxjs";
import { AccountService } from "../appServices/account.service";

// export const AuthGuard = () => {
//  const accountService = inject(AccountService);
//  const toastr = inject(ToastrService);
//  const router = inject(Router);

//  return accountService.currentUser$.pipe(
//   map(user => {
//    if (user) return true;
//    else {
//     // router.navigateByUrl('/account/login');
//     toastr.error('You shall not pass!');
//     return false;
//    }
//   })
//  )
// };

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {

 const accountService = inject(AccountService);
 const toastr = inject(ToastrService);
 const router = inject(Router);

 return accountService.currentUser$.pipe(
  map(auth => {
   if (auth) return true;
   else {
    router.navigate(['/account/login']);
    // router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    toastr.error('You shall not pass!');
    return false;
   }
  })
 );
}

export const canActivateChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthGuard(route, state);

